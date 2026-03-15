import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#050505",
          borderRadius: "18px",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid #5F7EFF",
            borderRadius: "16px",
            height: "44px",
            width: "28px",
          }}
        />
        <div
          style={{
            background: "#5F7EFF",
            borderRadius: "12px",
            height: "30px",
            left: "18px",
            position: "absolute",
            top: "17px",
            width: "18px",
          }}
        />
      </div>
    ),
    size,
  );
}
