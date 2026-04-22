import React, { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile ? "56rem" : "72rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: isMobile ? "8px" : "80px",
      }}
    >
      <div
        style={{
          paddingTop: isMobile ? "40px" : "120px",
          paddingBottom: isMobile ? "40px" : "120px",
          width: "100%",
          position: "relative",
          perspective: "1000px",
        }}
      >
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} translate={translate} scale={scale} isMobile={isMobile}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
};

const ScrollHeader = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => (
  <motion.div
    style={{
      translateY: translate,
      maxWidth: "56rem",
      margin: "0 auto",
      textAlign: "center",
    }}
  >
    {titleComponent}
  </motion.div>
);

const ScrollCard = ({
  rotate,
  scale,
  isMobile,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  isMobile: boolean;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      marginTop: "-48px",
      maxWidth: "64rem",
      marginLeft: "auto",
      marginRight: "auto",
      height: isMobile ? "26rem" : "36rem",
      width: "100%",
      border: "1px solid var(--color-border)",
      padding: isMobile ? "6px" : "16px",
      backgroundColor: "var(--color-surface)",
      borderRadius: "20px",
      boxShadow:
        "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000026, 0 84px 50px #0000000a",
    }}
  >
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius: "12px",
        backgroundColor: "var(--color-bg)",
      }}
    >
      {children}
    </div>
  </motion.div>
);
