# Inplicit MVP — Hackathon Playbook

> **Ziel:** Unified Context Layer + Interview Agent + Synthesis Engine in ~8h
> **Stack:** Python · LangGraph · OpenRouter · Langfuse · Streamlit

---

## Stack-Entscheidungen (Begründung)

| Frage | Entscheidung | Warum |
|---|---|---|
| Sprache | **Python** | Schnellste AI-Iteration, alle Libs nativ |
| Model | **claude-3-5-haiku** (via OpenRouter) | Schnell, günstig, top Qualität für Konversation |
| Model-Router | **OpenRouter** | 1 API Key, Modell mit 1 Zeile tauschen |
| Agent-Framework | **LangGraph** | Stateful conversation graphs, kein Overhead |
| Observability | **Langfuse** (Cloud Free Tier) | Drop-in Callback, zeigt Latenz sofort |
| UI | **Streamlit** | 30min bis Demo-ready |
| Context Store | **SQLite + sqlite-utils** | Kein DB-Setup, funktioniert sofort |

---

## 0. Setup (30 min)

### GitHub Repo anlegen

```bash
gh repo create inplicit-mvp --private --clone
cd inplicit-mvp
```

### Projektstruktur

```
inplicit-mvp/
├── .env
├── requirements.txt
├── context_layer/
│   ├── __init__.py
│   ├── seed_data.py      # Mock-Orgdaten einspielen
│   └── retriever.py      # Context für Interview Agent holen
├── interview_agent/
│   ├── __init__.py
│   ├── graph.py          # LangGraph State Machine
│   └── prompts.py        # System Prompts
├── synthesis_engine/
│   ├── __init__.py
│   └── synthesizer.py    # Transkripte → Themen → Knowledge Map
├── app.py                # Streamlit UI
└── config.py             # LLM + Langfuse Initialisierung
```

```bash
mkdir -p context_layer interview_agent synthesis_engine
touch context_layer/{__init__,seed_data,retriever}.py
touch interview_agent/{__init__,graph,prompts}.py
touch synthesis_engine/{__init__,synthesizer}.py
touch app.py config.py .env requirements.txt
```

### requirements.txt

```
langchain>=0.2.0
langgraph>=0.1.0
langchain-openai>=0.1.0
langfuse>=2.0.0
streamlit>=1.35.0
python-dotenv>=1.0.0
sqlite-utils>=3.36
openai>=1.30.0
```

```bash
pip install -r requirements.txt
```

### .env

```bash
# OpenRouter
OPENROUTER_API_KEY=sk-or-...        # https://openrouter.ai/keys
DEFAULT_MODEL=anthropic/claude-3-5-haiku  # hier tauschen!

# Langfuse (https://cloud.langfuse.com → neues Projekt → API Keys)
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_HOST=https://cloud.langfuse.com
```

---

## 1. config.py — LLM + Langfuse (zentral, 1x definiert)

```python
# config.py
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langfuse.callback import CallbackHandler

load_dotenv()

# ─── LLM via OpenRouter ───────────────────────────────────────────
# Modell tauschen = 1 Zeile in .env ändern. Das ist alles.
# Verfügbare Modelle: https://openrouter.ai/models
#
# Schnell & günstig:   anthropic/claude-3-5-haiku
# Beste Qualität:      anthropic/claude-3-5-sonnet
# Open Source EU:      mistralai/mistral-small
# Kostenlos testen:    meta-llama/llama-3.1-8b-instruct:free

def get_llm(temperature: float = 0.7, streaming: bool = True) -> ChatOpenAI:
    return ChatOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.environ["OPENROUTER_API_KEY"],
        model=os.environ.get("DEFAULT_MODEL", "anthropic/claude-3-5-haiku"),
        temperature=temperature,
        streaming=streaming,
        default_headers={
            "HTTP-Referer": "https://inplicit.ai",
            "X-Title": "Inplicit MVP",
        },
    )

# ─── Langfuse Callback ────────────────────────────────────────────
# Diesen handler einfach als callbacks=[langfuse_handler] übergeben
# → Latenz, Kosten, Traces erscheinen automatisch im Dashboard

langfuse_handler = CallbackHandler(
    public_key=os.environ["LANGFUSE_PUBLIC_KEY"],
    secret_key=os.environ["LANGFUSE_SECRET_KEY"],
    host=os.environ.get("LANGFUSE_HOST", "https://cloud.langfuse.com"),
)
```

---

## 2. Unified Context Layer (45 min)

### context_layer/seed_data.py — Mock-Orgdaten

```python
# context_layer/seed_data.py
import sqlite_utils

def seed(db_path: str = "inplicit.db"):
    db = sqlite_utils.Database(db_path)

    # Mitarbeiter
    db["employees"].insert_all([
        {"id": "E001", "name": "Anna Becker",   "role": "Senior Engineer",     "department": "Engineering",  "team": "Platform", "manager_id": "E005"},
        {"id": "E002", "name": "Jonas Müller",  "role": "Product Manager",     "department": "Product",      "team": "Core",     "manager_id": "E005"},
        {"id": "E003", "name": "Sara Nguyen",   "role": "UX Designer",         "department": "Design",       "team": "Core",     "manager_id": "E005"},
        {"id": "E004", "name": "Tobias Weiß",   "role": "Staff Engineer",      "department": "Engineering",  "team": "Platform", "manager_id": "E005"},
        {"id": "E005", "name": "Maria Schmidt", "role": "Engineering Director", "department": "Engineering",  "team": "Leadership","manager_id": None},
    ], replace=True)

    # Prozess-Ownership (simuliert Celonis-Daten)
    db["process_owners"].insert_all([
        {"employee_id": "E001", "process": "CI/CD Pipeline", "pain_index": 0.72},
        {"employee_id": "E001", "process": "Code Review",    "pain_index": 0.45},
        {"employee_id": "E002", "process": "Sprint Planning", "pain_index": 0.61},
        {"employee_id": "E004", "process": "Architecture Review", "pain_index": 0.38},
        {"employee_id": "E003", "process": "Design Handoff", "pain_index": 0.80},
    ], replace=True)

    # Gespeicherte Transkripte (für Synthesis Engine)
    db["transcripts"].insert_all([], ignore=True)

    print(f"✅ Seed complete → {db_path}")

if __name__ == "__main__":
    seed()
```

```bash
python context_layer/seed_data.py
```

### context_layer/retriever.py — Context Pack für Agent

```python
# context_layer/retriever.py
import sqlite_utils
from dataclasses import dataclass
from typing import Optional

@dataclass
class ContextPack:
    employee_id: str
    role: str
    department: str
    team: str
    processes: list[dict]

    def to_prompt_text(self) -> str:
        """Wird direkt in den System-Prompt injiziert."""
        process_lines = "\n".join(
            f"  - {p['process']} (Friction-Score: {p['pain_index']:.0%})"
            for p in self.processes
        )
        return f"""
INTERVIEWPARTNER-KONTEXT (nicht dem User nennen):
- Rolle: {self.role}
- Abteilung: {self.department}, Team: {self.team}
- Verantwortet folgende Prozesse:
{process_lines}

Stelle gezielte Folgefragen zu diesen Prozessen, besonders bei hohem Friction-Score.
""".strip()


def get_context_pack(employee_id: str, db_path: str = "inplicit.db") -> Optional[ContextPack]:
    db = sqlite_utils.Database(db_path)
    rows = list(db.execute(
        """
        SELECT e.id, e.role, e.department, e.team,
               p.process, p.pain_index
        FROM employees e
        LEFT JOIN process_owners p ON p.employee_id = e.id
        WHERE e.id = ?
        """,
        [employee_id]
    ).fetchall())

    if not rows:
        return None

    r = rows[0]
    return ContextPack(
        employee_id=r[0],
        role=r[1],
        department=r[2],
        team=r[3],
        processes=[{"process": row[4], "pain_index": row[5]} for row in rows if row[4]],
    )


def save_transcript(employee_id: str, transcript: list[dict], db_path: str = "inplicit.db"):
    db = sqlite_utils.Database(db_path)
    import json, uuid, datetime
    db["transcripts"].insert({
        "id": str(uuid.uuid4()),
        "employee_id": employee_id,
        "transcript_json": json.dumps(transcript, ensure_ascii=False),
        "created_at": datetime.datetime.utcnow().isoformat(),
    })
```

---

## 3. Interview Agent mit LangGraph (90 min)

### interview_agent/prompts.py

```python
# interview_agent/prompts.py

SYSTEM_PROMPT = """Du bist ein empathischer Interview-Agent für Inplicit.
Du führst ein vertrauliches Interview mit einem Mitarbeitenden über ihre Arbeitserfahrung.

WICHTIGE REGELN:
- Stelle immer nur EINE Frage auf einmal
- Höre aktiv zu und baue Folgefragen auf den Antworten auf
- Keine Namen nennen, keine Identifikation
- Nach 6-8 Fragen das Interview freundlich abschließen
- Antworte immer auf Deutsch

THEMENGEBIETE (nacheinander abdecken):
1. Aktuelle Hauptaufgaben und Verantwortlichkeiten
2. Größte Reibungspunkte und Blockaden im Alltag
3. Prozesse die gut/schlecht funktionieren
4. Was sie sich anders wünschen würden
5. Was ihre Energie kostet vs. gibt

{context_pack}

Starte mit einer offenen, einladenden Frage."""

SYNTHESIS_PROMPT = """Du analysierst {n} anonymisierte Interview-Transkripte.

TRANSKRIPTE:
{transcripts}

Erstelle eine strukturierte Analyse mit:

1. TOP-THEMEN (min. 3 Quellen erforderlich):
   - Thema, Häufigkeit, Tendenz (positiv/negativ/gemischt)

2. KRITISCHE REIBUNGSPUNKTE:
   - Wo berichten mehrere Personen unabhängig voneinander Probleme

3. STÄRKEN DER ORGANISATION:
   - Was gut funktioniert

4. OFFENE FRAGEN:
   - Was aus den Interviews unklar bleibt

5. EMPFEHLUNGEN (Top 3):
   - Konkrete, priorisierte Maßnahmen

Gib KEINE Rückschlüsse auf einzelne Personen.
Format: strukturiertes Markdown."""
```

### interview_agent/graph.py — LangGraph State Machine

```python
# interview_agent/graph.py
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

from config import get_llm, langfuse_handler
from interview_agent.prompts import SYSTEM_PROMPT
from context_layer.retriever import get_context_pack, ContextPack, save_transcript

# ─── State Definition ─────────────────────────────────────────────

class InterviewState(TypedDict):
    messages: Annotated[list, add_messages]
    employee_id: str
    context_pack: ContextPack | None
    turn_count: int
    is_finished: bool
    session_id: str

# ─── Nodes ───────────────────────────────────────────────────────

def load_context(state: InterviewState) -> InterviewState:
    """Lädt den Organisations-Context für diesen Mitarbeitenden."""
    ctx = get_context_pack(state["employee_id"])
    context_text = ctx.to_prompt_text() if ctx else ""
    system_prompt = SYSTEM_PROMPT.format(context_pack=context_text)

    return {
        **state,
        "context_pack": ctx,
        "messages": [SystemMessage(content=system_prompt)],
        "turn_count": 0,
        "is_finished": False,
    }


def agent_respond(state: InterviewState) -> InterviewState:
    """Generiert die nächste Agenten-Antwort."""
    llm = get_llm(temperature=0.7)

    response = llm.invoke(
        state["messages"],
        config={"callbacks": [langfuse_handler],
                "run_name": f"interview-turn-{state['turn_count']}",
                "tags": [state["employee_id"], "interview"]},
    )

    # Interview beenden nach 7 Turns oder auf Wunsch des Users
    is_finished = (
        state["turn_count"] >= 7
        or any(kw in response.content.lower()
               for kw in ["danke für das gespräch", "interview abgeschlossen", "auf wiedersehen"])
    )

    return {
        **state,
        "messages": state["messages"] + [AIMessage(content=response.content)],
        "turn_count": state["turn_count"] + 1,
        "is_finished": is_finished,
    }


def save_session(state: InterviewState) -> InterviewState:
    """Speichert das Transkript in die DB."""
    messages = [
        {"role": "assistant" if isinstance(m, AIMessage) else "user",
         "content": m.content}
        for m in state["messages"]
        if isinstance(m, (AIMessage, HumanMessage))
    ]
    save_transcript(state["employee_id"], messages)
    return state

# ─── Routing ─────────────────────────────────────────────────────

def should_continue(state: InterviewState) -> str:
    return "end" if state["is_finished"] else "continue"

# ─── Graph bauen ──────────────────────────────────────────────────

def build_interview_graph():
    graph = StateGraph(InterviewState)

    graph.add_node("load_context",  load_context)
    graph.add_node("agent_respond", agent_respond)
    graph.add_node("save_session",  save_session)

    graph.add_edge(START, "load_context")
    graph.add_edge("load_context", "agent_respond")
    graph.add_conditional_edges(
        "agent_respond",
        should_continue,
        {"continue": "agent_respond", "end": "save_session"},
    )
    graph.add_edge("save_session", END)

    return graph.compile()


# Singleton — einmal kompilieren, mehrfach nutzen
interview_graph = build_interview_graph()


def run_turn(employee_id: str, user_message: str, state: dict | None = None) -> tuple[str, dict]:
    """
    Für die Streamlit-UI: nimmt User-Eingabe, gibt (Antwort, neuer State) zurück.
    """
    import uuid

    if state is None:
        # Erstes Turn: State initialisieren + Context laden
        current_state = {
            "employee_id": employee_id,
            "messages": [],
            "context_pack": None,
            "turn_count": 0,
            "is_finished": False,
            "session_id": str(uuid.uuid4()),
        }
        # Context laden ohne User-Message → Eröffnungsfrage generieren
        current_state = load_context(current_state)
        current_state = agent_respond(current_state)
    else:
        # Folge-Turns: User-Message hinzufügen, dann Agent antworten
        current_state = {
            **state,
            "messages": state["messages"] + [HumanMessage(content=user_message)],
        }
        current_state = agent_respond(current_state)

    if current_state["is_finished"]:
        save_session(current_state)

    last_message = current_state["messages"][-1].content
    return last_message, current_state
```

---

## 4. Synthesis Engine (45 min)

```python
# synthesis_engine/synthesizer.py
import json
import sqlite_utils
from config import get_llm, langfuse_handler
from interview_agent.prompts import SYNTHESIS_PROMPT

def load_transcripts(db_path: str = "inplicit.db") -> list[str]:
    db = sqlite_utils.Database(db_path)
    rows = list(db["transcripts"].rows)
    transcripts = []
    for row in rows:
        turns = json.loads(row["transcript_json"])
        # Nur User-Turns für Synthesis (keine Agent-Fragen)
        user_text = " | ".join(t["content"] for t in turns if t["role"] == "user")
        if user_text.strip():
            transcripts.append(f"[Interview {row['id'][:8]}]: {user_text}")
    return transcripts


def synthesize(db_path: str = "inplicit.db") -> str:
    transcripts = load_transcripts(db_path)

    if len(transcripts) < 2:
        return "⚠️ Mindestens 2 abgeschlossene Interviews für Synthesis erforderlich."

    llm = get_llm(temperature=0.0)  # Deterministisch für Audit-Fähigkeit

    prompt = SYNTHESIS_PROMPT.format(
        n=len(transcripts),
        transcripts="\n\n".join(transcripts),
    )

    response = llm.invoke(
        prompt,
        config={
            "callbacks": [langfuse_handler],
            "run_name": "synthesis-engine",
            "tags": ["synthesis"],
        },
    )

    return response.content
```

---

## 5. Streamlit UI — app.py (60 min)

```python
# app.py
import streamlit as st
from interview_agent.graph import run_turn
from synthesis_engine.synthesizer import synthesize
from context_layer.retriever import get_context_pack

st.set_page_config(page_title="Inplicit MVP", page_icon="🔍", layout="wide")

# ─── Sidebar ─────────────────────────────────────────────────────
with st.sidebar:
    st.title("🔍 Inplicit")
    st.caption("Organizational Intelligence")
    st.divider()

    mode = st.radio("Modus", ["Interview", "Knowledge Map"])

    if mode == "Interview":
        employee_id = st.selectbox(
            "Mitarbeitende/r",
            ["E001", "E002", "E003", "E004"],
            format_func=lambda x: {
                "E001": "E001 — Senior Engineer",
                "E002": "E002 — Product Manager",
                "E003": "E003 — UX Designer",
                "E004": "E004 — Staff Engineer",
            }[x]
        )

        if st.button("🔄 Neues Interview starten"):
            st.session_state.clear()
            st.rerun()

# ─── Interview Mode ───────────────────────────────────────────────
if mode == "Interview":
    st.header("Interview Agent")

    ctx = get_context_pack(employee_id)
    if ctx:
        with st.expander("📋 Kontext (intern — nur für Demo)", expanded=False):
            st.json({
                "role": ctx.role,
                "department": ctx.department,
                "processes": ctx.processes,
            })

    # Chat-History initialisieren
    if "messages" not in st.session_state:
        st.session_state.messages = []
        st.session_state.agent_state = None
        st.session_state.finished = False

        # Erstes Turn → Eröffnungsfrage
        with st.spinner("Agent startet Interview…"):
            opening, new_state = run_turn(employee_id, "", state=None)
            st.session_state.messages.append({"role": "assistant", "content": opening})
            st.session_state.agent_state = new_state
            st.session_state.finished = new_state.get("is_finished", False)

    # Chat anzeigen
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    if st.session_state.finished:
        st.success("✅ Interview abgeschlossen und gespeichert.")
    else:
        if user_input := st.chat_input("Ihre Antwort…"):
            st.session_state.messages.append({"role": "user", "content": user_input})
            with st.chat_message("user"):
                st.markdown(user_input)

            with st.chat_message("assistant"):
                with st.spinner(""):
                    reply, new_state = run_turn(
                        employee_id,
                        user_input,
                        state=st.session_state.agent_state,
                    )
                    st.markdown(reply)
                    st.session_state.messages.append({"role": "assistant", "content": reply})
                    st.session_state.agent_state = new_state
                    st.session_state.finished = new_state.get("is_finished", False)

# ─── Knowledge Map Mode ───────────────────────────────────────────
else:
    st.header("Knowledge Map — Synthesis Engine")

    col1, col2 = st.columns([1, 3])
    with col1:
        if st.button("🧠 Synthesis starten", type="primary"):
            with st.spinner("Analysiere Transkripte…"):
                result = synthesize()
                st.session_state.synthesis_result = result

    if "synthesis_result" in st.session_state:
        with col2:
            st.markdown(st.session_state.synthesis_result)
```

---

## 6. Starten

```bash
# Seed-Daten
python context_layer/seed_data.py

# App starten
streamlit run app.py
```

---

## 7. Modell tauschen mit OpenRouter

**In .env eine Zeile ändern — das ist alles:**

```bash
# Schnell + günstig (Hackathon-Default)
DEFAULT_MODEL=anthropic/claude-3-5-haiku

# Beste Qualität
DEFAULT_MODEL=anthropic/claude-3-5-sonnet

# EU-native (Mistral, kein US-Provider)
DEFAULT_MODEL=mistralai/mistral-small-3.1-24b-instruct

# Kostenlos zum Testen
DEFAULT_MODEL=meta-llama/llama-3.1-8b-instruct:free

# Für Synthesis (deterministisch, günstig)
DEFAULT_MODEL=google/gemini-flash-1.5
```

Vollständige Liste: [openrouter.ai/models](https://openrouter.ai/models)

---

## 8. Langfuse — Latenz live sehen

Nach dem ersten Interview-Turn:

1. [cloud.langfuse.com](https://cloud.langfuse.com) → dein Projekt öffnen
2. **Traces** → jeden LLM-Call mit Latenz, Token-Count, Kosten
3. **Sessions** → ganzer Interview-Flow als Trace-Baum
4. **Dashboard** → P50/P95 Latenz automatisch aggregiert

Was du siehst:
- `interview-turn-0`, `interview-turn-1`, … → Latenz pro Turn
- `synthesis-engine` → Latenz der Knowledge Map Generation
- Kosten pro Interview (wichtig für den Investor-Pitch)

---

## 9. Hackathon-Zeitplan

| Zeit | Was | Output |
|---|---|---|
| 08:00–08:30 | Repo, .env, pip install, seed_data | Laufende Umgebung |
| 08:30–09:15 | config.py + context_layer | Context Pack funktioniert |
| 09:15–10:45 | interview_agent/graph.py | Agent führt Gespräch |
| 10:45–11:30 | synthesis_engine | Knowledge Map aus 2+ Interviews |
| 11:30–12:30 | app.py Streamlit | Demo-fähige UI |
| 12:30–13:00 | Langfuse prüfen, Modell tauschen | Latenz-Dashboard live |
| 13:00–14:00 | Buffer / Bugs / Polishing | — |
| 14:00+ | Demo-Vorbereitung | Pitch-Ready |

---

## 10. Demo-Strategie

**Was du zeigst (in dieser Reihenfolge):**

1. Zeige die Sidebar: "Wir haben Orgdaten aus SAP/Slack — der Agent kennt den Kontext dieser Person."
2. Führe ein 3-Turn-Interview live durch → der Agent fragt gezielt zu den Prozessen
3. Klicke auf Knowledge Map → "Das ist was der Kunde bekommt — keine Namen, nur aggregierte Insights"
4. Zeige Langfuse Dashboard → "Wir messen Latenz auf Turn-Ebene — hier sehen wir 340ms P50"
5. Ändere in .env `anthropic/claude-3-5-haiku` zu `mistralai/mistral-small-3.1-24b-instruct` → App neu starten → "Modell getauscht. Kein Code geändert."

**Key Message:** "Wir anonymisieren nicht hinterher — wir bauen es so, dass Identifikation strukturell nicht möglich ist."

---

## Troubleshooting

```bash
# OpenRouter gibt 401 → API Key falsch
echo $OPENROUTER_API_KEY

# LangGraph Import-Fehler → Version
pip install "langgraph>=0.1.0" --upgrade

# Streamlit cached State → Browser Hard Refresh (Cmd+Shift+R)

# Langfuse zeigt nichts → Handler wurde nicht übergeben
# Checken: config={"callbacks": [langfuse_handler]} in jedem llm.invoke()
```

---

*Inplicit MVP Hackathon Guide · April 2026*
