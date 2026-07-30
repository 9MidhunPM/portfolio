import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data";

/**
 * Shared Open Graph card renderer.
 *
 * Satori (the engine behind ImageResponse) cannot parse .woff2, so the
 * fonts here are vendored .ttf copies rather than the next/font pipeline
 * used by the site itself. They are read off disk with fs — the
 * `fetch(new URL(..., import.meta.url))` pattern throws during prerender
 * on the Node runtime. `outputFileTracingIncludes` in next.config.mjs
 * keeps the .ttf files in the standalone bundle.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const COLORS = {
  background: "#0A0A0A",
  foreground: "#EDEDED",
  muted: "#8A8A8A",
  border: "#262626",
  accent: "#E8FF59",
} as const;

const FONT_DIR = path.join(process.cwd(), "lib", "og", "fonts");

function loadFont(file: string): Buffer {
  return fs.readFileSync(path.join(FONT_DIR, file));
}

interface OgCardOptions {
  /** Small mono line above the title — section or date. */
  eyebrow: string;
  /** The headline. Rendered in Instrument Serif. */
  title: string;
  /** Optional mono line under the title — tech stack, reading time. */
  meta?: string;
}

export async function renderOgImage({ eyebrow, title, meta }: OgCardOptions) {
  const serif = loadFont("InstrumentSerif-Regular.ttf");
  const sans = loadFont("Geist-Medium.ttf");
  const mono = loadFont("GeistMono-Regular.ttf");

  // Long titles need to step down a size to stay on the card.
  const titleSize = title.length > 70 ? 62 : title.length > 40 ? 76 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: COLORS.background,
          padding: "72px 80px",
        }}
      >
        {/* Top: accent rule + eyebrow */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 56,
              height: 4,
              backgroundColor: COLORS.accent,
              marginBottom: 40,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: 24,
              color: COLORS.muted,
              letterSpacing: "0.02em",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: titleSize,
            lineHeight: 1.1,
            color: COLORS.foreground,
            letterSpacing: "-0.02em",
            // Satori has no `text-wrap: balance`; cap the box instead.
            maxWidth: 960,
          }}
        >
          {title}
        </div>

        {/* Bottom: meta + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Geist",
              fontSize: 26,
              color: COLORS.foreground,
            }}
          >
            {SITE.name}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {meta ? (
              <div
                style={{
                  display: "flex",
                  fontFamily: "Geist Mono",
                  fontSize: 20,
                  color: COLORS.muted,
                  marginRight: 12,
                }}
              >
                {meta} ·
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                fontFamily: "Geist Mono",
                fontSize: 20,
                color: COLORS.muted,
              }}
            >
              {new URL(SITE.url).hostname}
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: COLORS.accent,
                marginLeft: 10,
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Geist", data: sans, style: "normal", weight: 500 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  );
}
