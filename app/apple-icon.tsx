import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon. Generated rather than committed as a binary so the
 * wordmark stays in sync with app/icon.svg.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            fontSize: 104,
            fontWeight: 600,
            color: "#EDEDED",
            letterSpacing: "-0.05em",
          }}
        >
          m
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              backgroundColor: "#E8FF59",
              marginLeft: 8,
              marginBottom: 18,
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
