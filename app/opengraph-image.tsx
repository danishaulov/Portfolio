import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt =
  "Daniel Shaulov — Accounting student and aspiring Assistant Controller";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#dee8f7",
        padding: "62px 76px",
        color: "#182c46",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span style={{ fontWeight: 700 }}>ds.</span>
        <span>Accounting & Financial Analysis</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 100, fontWeight: 700, letterSpacing: "-5px" }}>
          Daniel Shaulov.
        </div>
        <div style={{ fontSize: 34, marginTop: 16 }}>
          Accounting student. Technical by nature.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #aabbd4",
          paddingTop: 26,
          fontSize: 21,
        }}
      >
        <span>Open University of Israel</span>
        <span>Aspiring Assistant Controller</span>
      </div>
    </div>,
    size,
  );
}
