import { useSpring, animated } from "react-spring";

function BouncingBalls({ brand }) {
  const [props, set] = useSpring(() => ({
    xy: [Math.random() * 200, Math.random() * 200], // starting position
    config: { tension: 170, friction: 26 }, // spring config
    onFrame: ({ xy }) => {
      // This will run on every frame of the animation
      // Check boundaries and reverse direction if needed
      if (xy[0] <= 0 || xy[0] >= 300) {
        // assuming container width is 300
        set({ xy: [xy[0], -xy[1]] });
      }
      if (xy[1] <= 0 || xy[1] >= 300) {
        // assuming container height is 300
        set({ xy: [-xy[0], xy[1]] });
      }
    },
  }));

  return (
    <animated.div
      style={{
        transform: props.xy.interpolate(
          (x, y) => `translate3d(${x}px, ${y}px, 0)`
        ),
        // ... your avatar styles
      }}
    >
      {/* Avatar content */}
    </animated.div>
  );
}

export default BouncingBalls;
