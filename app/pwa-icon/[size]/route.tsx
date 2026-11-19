import { ImageResponse } from "next/og";

const SIZES = [96, 192, 512];

/** App icon for the manifest, notifications and iOS home screen, drawn on the fly. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const requested = Number((await params).size);
  const size = SIZES.includes(requested) ? requested : 192;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          color: "white",
          fontSize: size * 0.5,
          fontWeight: 700,
          letterSpacing: -size * 0.02,
        }}
      >
        AA
      </div>
    ),
    {
      width: size,
      height: size,
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    }
  );
}
