import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "linear-gradient(135deg, #4d7cff 0%, #9b5cff 100%)",
          color: "#fff",
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "sans-serif",
          letterSpacing: -1,
        }}
      >
        MA
      </div>
    ),
    size
  );
}
