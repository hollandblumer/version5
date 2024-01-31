function generateSVG(
  startColor,
  endColor,
  gradientId,
  width = "640px",
  height = "100px"
) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 640 100"
      preserveAspectRatio="none"
      class="wave animation-patch wave--horizontal"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: startColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: endColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M640 60C516 60 476-0 316 0 156 0 116 60 0 60V100h640V60z"
      ></path>
    </svg>
  );
}

function WaveBar() {
  return (
    <section>
      <div className="announcement-bar">
        <div class="announcement-bar__message "> </div>
      </div>
      <div class="scrolling-banner__waves">
        <div class="marquee absolute left-0 w-full -mb-px bottom-full is-reverse is-loaded">
          <div class="marquee__wrap">
            <span
              className="marquee__scroll"
              style={{
                animationDuration: "16s",
                paddingRight: "0em",
                background: "#f7f6f0",
              }}
            >
              <span class="marquee__content">
                <div class="scrolling-banner__wave-group">
                  {/* First SVG with Original Colors */}
                  {generateSVG(
                    "#b07849",
                    "#E1D6CD",
                    "waveGradient1",
                    "640px",
                    "100px"
                  )}

                  {/* Second SVG with Reversed Colors */}
                  {generateSVG(
                    "#E1D6CD",
                    "#b07849",
                    "waveGradient2",
                    "640px",
                    "100px"
                  )}

                  {/* Third SVG with Original Colors */}
                  {generateSVG(
                    "#b07849",
                    "#E1D6CD",
                    "waveGradient3",
                    "640px",
                    "100px"
                  )}

                  {/* Fourth SVG with Reversed Colors */}
                  {generateSVG(
                    "#E1D6CD",
                    "#b07849",
                    "waveGradient4",
                    "640px",
                    "100px"
                  )}
                </div>
              </span>
            </span>
            <span
              className="marquee__scroll"
              style={{
                animationDuration: "16s",
                paddingRight: "0em",
                background: "#f7f6f0",
              }}
            >
              <span class="marquee__content">
                <div class="scrolling-banner__wave-group">
                  {/* Fifth SVG with Original Colors */}
                  {generateSVG(
                    "#b07849",
                    "#E1D6CD",
                    "waveGradient5",
                    "640px",
                    "100px"
                  )}

                  {/* Sixth SVG with Reversed Colors */}
                  {generateSVG(
                    "#E1D6CD",
                    "#b07849",
                    "waveGradient6",
                    "640px",
                    "100px"
                  )}

                  {/* Seventh SVG with Original Colors */}
                  {generateSVG(
                    "#b07849",
                    "#E1D6CD",
                    "waveGradient7",
                    "640px",
                    "100px"
                  )}

                  {/* Eighth SVG with Reversed Colors */}
                  {generateSVG(
                    "#E1D6CD",
                    "#b07849",
                    "waveGradient8",
                    "640px",
                    "100px"
                  )}

                  {/* Ninth SVG with Original Colors */}
                  {generateSVG(
                    "#b07849",
                    "#E1D6CD",
                    "waveGradient9",
                    "640px",
                    "100px"
                  )}

                  {/* Tenth SVG with Original Colors */}
                  {generateSVG(
                    "#E1D6CD",
                    "#b07849",
                    "waveGradient10",
                    "640px",
                    "100px"
                  )}
                </div>
              </span>
            </span>
          </div>{" "}
          <span
            aria-hidden="true"
            className="marquee__ref"
            style={{ paddingRight: "0em", background: "#f7f6f0" }}
          >
            <span class="marquee__content">
              <div class="scrolling-banner__wave-group">
                {/* 11th SVG with Original Colors */}
                {generateSVG(
                  "#b07849",
                  "#E1D6CD",
                  "waveGradient11",
                  "640px",
                  "100px"
                )}

                {/* 12th SVG with Original Colors */}
                {generateSVG(
                  "#E1D6CD",
                  "#b07849",
                  "waveGradient12",
                  "640px",
                  "100px"
                )}

                {/* 13th SVG with Original Colors */}
                {generateSVG(
                  "#b07849",
                  "#E1D6CD",
                  "waveGradient13",
                  "640px",
                  "100px"
                )}

                {/* 14th SVG with Original Colors */}
                {generateSVG(
                  "#E1D6CD",
                  "#b07849",
                  "waveGradient14",
                  "640px",
                  "100px"
                )}

                {/* 15th SVG with Original Colors */}
                {generateSVG(
                  "#b07849",
                  "#E1D6CD",
                  "waveGradient15",
                  "640px",
                  "100px"
                )}

                {/* 16th SVG with Original Colors */}
                {generateSVG(
                  "#E1D6CD",
                  "#b07849",
                  "waveGradient16",
                  "640px",
                  "100px"
                )}
              </div>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

export default WaveBar;
