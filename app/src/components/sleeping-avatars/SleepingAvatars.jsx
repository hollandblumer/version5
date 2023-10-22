import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

function SleepingAvatars({ containerWidth, containerHeight }) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    const engine = Matter.Engine.create({
      enableSleeping: true,
    });

    engineRef.current = engine;

    const world = engine.world;

    const container = containerRef.current;

    // Create Matter.js renderer
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        showAngleIndicator: false,
      },
    });

    renderRef.current = render;

    // Create Matter.js circles for each circle
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * (containerWidth / 6);
      const y = 100;

      const circleRadius = containerWidth / 15;

      const circle = Matter.Bodies.circle(x, y, circleRadius, {
        render: {
          fillStyle: "#ff0000",
        },
      });

      Matter.World.add(world, circle);
    }

    // Start the engine and render
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(renderRef.current);
      Matter.Engine.clear(engineRef.current);
    };
  }, [containerWidth, containerHeight]);

  // Function to update the engine and render in response to external events
  const updateEngine = () => {
    const engine = engineRef.current;
    if (engine) {
      Matter.Engine.update(engine, Date.now() - engine.timing.timestamp);
      requestAnimationFrame(updateEngine);
    }
  };

  // Start the update loop when the component mounts
  useEffect(() => {
    updateEngine();
  }, []);

  return (
    <div ref={containerRef} className="physics-container">
      <style>
        {`
        .physics-container {
          position: absolute;
          width: ${containerWidth}px;
          height: ${containerHeight}px;
          z-index: 2;
        }
      `}
      </style>
    </div>
  );
}

export default SleepingAvatars;
