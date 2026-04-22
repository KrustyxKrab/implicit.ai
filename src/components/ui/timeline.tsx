import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-family)",
      }}
    >
      <div
        ref={ref}
        style={{
          position: "relative",
          maxWidth: "72rem",
          margin: "0 auto",
          paddingBottom: "80px",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: isMobile ? "40px" : "120px",
              gap: isMobile ? "0" : "40px",
            }}
          >
            {/* Sticky label + dot */}
            <div
              style={{
                position: "sticky",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                zIndex: 40,
                alignItems: "center",
                top: "120px",
                alignSelf: "flex-start",
                maxWidth: isMobile ? "auto" : "280px",
                width: isMobile ? "auto" : "100%",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  height: "40px",
                  width: "40px",
                  position: "absolute",
                  left: "12px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    height: "14px",
                    width: "14px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent-light)",
                    border: "1.5px solid var(--color-accent-muted)",
                  }}
                />
              </div>
              {!isMobile && (
                <h3
                  style={{
                    paddingLeft: "80px",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--color-text-tertiary)",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </h3>
              )}
            </div>

            {/* Content */}
            <div
              style={{
                position: "relative",
                paddingLeft: isMobile ? "72px" : "16px",
                paddingRight: "8px",
                width: "100%",
              }}
            >
              {isMobile && (
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "12px",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  {item.title}
                </h3>
              )}
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical track */}
        <div
          style={{
            position: "absolute",
            left: "32px",
            top: 0,
            overflow: "hidden",
            width: "2px",
            height: `${height}px`,
            background:
              "linear-gradient(to bottom, transparent 0%, var(--color-border) 8%, var(--color-border) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              width: "2px",
              background:
                "linear-gradient(to top, var(--color-accent) 0%, var(--color-accent-muted) 20%, transparent 100%)",
              borderRadius: "9999px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
