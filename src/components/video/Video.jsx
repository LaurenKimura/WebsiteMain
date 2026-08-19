import "./video.css";
import { useState } from "react";

const VIDEOS = [
  { id: 1, src: "/video1.mp4", title: "I love touching grass!" },
  { id: 2, src: "/video2.mp4", title: "In my freetime, I play basketball" },
  { id: 3, src: "/video3.mp4", title: "or hangout with my friends ❤️" },
  { id: 4, src: "/video4.mp4", title: "I love to learn new things" },
  { id: 5, src: "/video5.mp4", title: "For example: Juggling" },
  { id: 6, src: "/video6.mp4", title: " or solving a rubix cube" },
  { id: 7, src: "/video7.mp4", title: "and even skateboarding!" },
];

export default function Video() {
  const [activeIndex, setActiveIndex] = useState(0);

  const count = VIDEOS.length;
  const angleStep = 360 / count;
  // Radius calculation formula: (Card Width / 2) / tan(PI / count)
  // Ensures cards evenly align around the ring without overlapping
  const radius = Math.round(280 / 2 / Math.tan(Math.PI / count));

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % count);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + count) % count);

  return (
    <div className="videoCarousel">
      <div className="stage">
        <div
          className="ring"
          style={{
            transform: `translateZ(-${radius}px) rotateY(${-activeIndex * angleStep}deg)`,
          }}
        >
          {VIDEOS.map((video, index) => {
            const cardAngle = index * angleStep;
            const isActive = index === activeIndex;

            return (
              <div
                key={video.id}
                className="card"
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  opacity: isActive ? 1 : 0.45,
                  filter: isActive ? "none" : "grayscale(40%) brightness(0.7)",
                }}
              >
                <video
                  src={video.src}
                  autoPlay={isActive}
                  loop
                  muted={!isActive}
                  playsInline
                  controls={isActive}
                  className="video"
                />
                <div className="label">{video.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="controls">
        <button onClick={handlePrev} className="button">
          &#8592; Previous
        </button>
        <span className="indicator">
          {activeIndex + 1} / {count}
        </span>
        <button onClick={handleNext} className="button">
          Next &#8594;
        </button>
      </div>
    </div>
  );
}
