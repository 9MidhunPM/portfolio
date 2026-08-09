import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full items-center justify-center bg-black text-8xl text-lime-200">
        m.
      </div>
    ),
    size
  );
}
