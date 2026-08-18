import "./video.css";
import { useState } from "react";

const VIDEOS = [
  { id: 1, src: "/video1.mp4", title: "I love nature" },
  { id: 2, src: "/video2.mp4", title: "I've been playing basketball since 1st grade" },
  { id: 3, src: "/video3.mp4", title: "I love to hangout with my friends!" },
  { id: 4, src: "/video4.mp4", title: "One of my hobbies is guitar" },
  { id: 5, src: "/video5.mp4", title: "If I was not a CS Engineer, I'd be in circus" },
  { id: 6, src: "/video6.mp4", title: "I love photography and videography" },
  { id: 7, src: "/video7.mp4", title: "I also try to skateboard" },
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
