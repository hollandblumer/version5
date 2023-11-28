import React, { useEffect } from "react";
import * as PIXI from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import hsl from "hsl-to-hex";
import debounce from "debounce";
import { createNoise2D } from "simplex-noise";
import backgroundImage from "../assets/images/natural-backdrop.png";

function OrbEffect() {
  useEffect(() => {
    const initializePixi = () => {
      // Place your Pixi.js code here
      const app = new PIXI.Application({
        view: document.querySelector(".orb-canvas"),
        resizeTo: window,
        transparent: true,
      });

      // Create a PIXI.Sprite for the background image
      const backgroundTexture = PIXI.Texture.from(backgroundImage);
      const backgroundSprite = new PIXI.Sprite(backgroundTexture);
      backgroundSprite.width = app.renderer.width; // Adjust width to fit the canvas
      backgroundSprite.height = app.renderer.height; // Adjust height to fit the canvas
      app.stage.addChild(backgroundSprite);

      // Return a random number within a range
      function random(min, max) {
        return Math.random() * (max - min) + min;
      }

      // Map a number from one range to another
      function map(n, start1, end1, start2, end2) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
      }

      // Orb class
      class Orb {
        constructor(fill = 0xf4f3ec) {
          // Bounds = the area an orb is "allowed" to move within
          this.bounds = this.setBounds();
          // Initialize the orb's { x, y } values to a random point within its bounds
          this.x = random(this.bounds.x.min, this.bounds.x.max);
          this.y = random(this.bounds.y.min, this.bounds.y.max);

          // How large the orb is vs. its original radius (this will modulate over time)
          this.scale = 1;

          // What color is the orb?
          // this.fill = 0xe1dada;
          // this.fill = 0xdbd0d8;
          this.fill = 0xe1dada;
          // The original radius of the orb, set relative to window height
          this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

          // Starting points in "time" for the noise/self-similar random values
          this.xOff = random(0, 1000);
          this.yOff = random(0, 1000);

          // How quickly the noise/self-similar random values step through time
          this.inc = 0.0009;

          // PIXI.Graphics is used to draw 2D primitives (in this case a circle) to the canvas
          this.graphics = new PIXI.Graphics();
          this.graphics.alpha = 0.825;

          // 250ms after the last window resize event, recalculate orb positions
          window.addEventListener(
            "resize",
            debounce(() => {
              this.bounds = this.setBounds();
            }, 250)
          );
        }

        setBounds() {
          // How far from the { x, y } origin can each orb move
          const maxDist =
            window.innerWidth < 1000
              ? window.innerWidth / 1
              : window.innerWidth / 2;
          // The { x, y } origin for each orb (the bottom right of the screen)
          const originX = window.innerWidth / 1.25;
          const originY =
            window.innerWidth < 1000
              ? window.innerHeight
              : window.innerHeight / 1;

          // Allow each orb to move x distance away from its { x, y } origin
          return {
            x: {
              min: originX - maxDist,
              max: originX + maxDist,
            },
            y: {
              min: originY - maxDist,
              max: originY + maxDist,
            },
          };
        }

        update() {
          // Self-similar "pseudo-random" or noise values at a given point in "time"
          const xNoise = simplex(this.xOff, this.xOff);
          const yNoise = simplex(this.yOff, this.yOff);
          const scaleNoise = simplex(this.xOff, this.yOff);

          // Map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
          this.x = map(xNoise, -1, 1, this.bounds.x.min, this.bounds.x.max);
          this.y = map(yNoise, -1, 1, this.bounds.y.min, this.bounds.y.max);
          // Map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size and 100% of its original size
          this.scale = map(scaleNoise, -1, 1, 0.5, 1);

          // Step through "time"
          this.xOff += this.inc;
          this.yOff += this.inc;
        }

        render() {
          // Update the PIXI.Graphics position and scale values
          this.graphics.x = this.x;
          this.graphics.y = this.y;
          this.graphics.scale.set(this.scale);

          // Clear anything currently drawn to graphics
          this.graphics.clear();

          // Tell graphics to fill any shapes drawn after this with the orb's fill color
          this.graphics.beginFill(this.fill);
          // Draw a circle at { 0, 0 } with its size set by this.radius
          this.graphics.drawCircle(0, 0, this.radius);
          // Let graphics know we won't be filling in any more shapes
          this.graphics.endFill();
        }
      }

      const simplex = createNoise2D();

      // Create orbs
      const orbs = [];

      for (let i = 0; i < 10; i++) {
        // Each orb will be black, just for now
        const orb = new Orb(0x000000);
        app.stage.addChild(orb.graphics);

        orbs.push(orb);
      }

      // Animate!
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        app.ticker.add(() => {
          // Update and render each orb, each frame. app.ticker attempts to run at 60fps
          orbs.forEach((orb) => {
            orb.update();
            orb.render();
          });
        });
      } else {
        // Perform one update and render per orb, do not animate
        orbs.forEach((orb) => {
          orb.update();
          orb.render();
        });
      }

      app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

      class ColorPalette {
        constructor() {
          this.setColors();
          this.setCustomProperties();
        }

        setColors() {
          // Define fixed hues for yellow and orange
          this.hue = 45; // Yellow
          this.complimentaryHue1 = 15; // Orange

          // Define fixed saturation and lightness
          this.saturation = 95;
          this.lightness = 50;

          // Define base and complimentary colors
          this.baseColor = hsl(this.hue, this.saturation, this.lightness);
          this.complimentaryColor1 = hsl(
            this.complimentaryHue1,
            this.saturation,
            this.lightness
          );

          // Store the color choices in an array
          this.colorChoices = [this.baseColor, this.complimentaryColor1];
        }

        randomColor() {
          // Pick a random color from the fixed set of colors
          return this.colorChoices[
            ~~random(0, this.colorChoices.length)
          ].replace("#", "0x");
        }

        setCustomProperties() {
          // Set CSS custom properties so that the colors defined here can be used throughout the UI
          document.documentElement.style.setProperty("--hue", this.hue);
          document.documentElement.style.setProperty(
            "--hue-complimentary1",
            this.complimentaryHue1
          );
        }
      }

      const colorPalette = new ColorPalette();

      const orb = new Orb(colorPalette.randomColor());
      function handleResize() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        backgroundSprite.width = app.renderer.width;
        backgroundSprite.height = app.renderer.height;
      }

      // Attach the resize event listener
      window.addEventListener("resize", handleResize);

      // Return a cleanup function
      return () => {
        // Cleanup code, if needed
        window.removeEventListener("resize", handleResize); // Remove the resize event listener here
      };
    };

    // Wrap Pixi.js initialization inside DOMContentLoaded event
    document.addEventListener("DOMContentLoaded", initializePixi);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("DOMContentLoaded", initializePixi);
    };
  }, []); // Empty dependency array ensures this effect runs once on component mount

  return (
    <div>
      <canvas className="orb-canvas"></canvas>
    </div>
  );
}

export default OrbEffect;
