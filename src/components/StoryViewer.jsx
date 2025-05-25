import React, { useEffect, useState, useRef } from 'react';

function StoryViewer({ story, onClose, onNext, onPrevious, isLastStory, isFirstStory }) {
  const [progress, setProgress] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0);
  const timerRef = useRef(null);
  const storyDuration = 5000;

  const startTimer = () => {
    setProgress(0);
    setImageOpacity(0);
    clearInterval(timerRef.current);

    setTimeout(() => {
      setImageOpacity(1);
      timerRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (100 / (storyDuration / 100));
          if (newProgress >= 100) {
            clearInterval(timerRef.current);
            onNext();
            return 100;
          }
          return newProgress;
        });
      }, 100);
    }, 100);
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(timerRef.current);
    };
  }, [story.id, onNext]);

  const handleTap = (e) => {
    clearInterval(timerRef.current);

    const { clientX } = e;
    const { innerWidth } = window;

    if (clientX < innerWidth / 2) {
      onPrevious();
    } else {
      onNext();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div
        className="relative w-[95%] h-[90%] bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-center items-center"
        onClick={handleTap}
      >
        <div className="absolute top-2 left-2 right-2 flex space-x-0.5 z-10">
          <div className="flex-grow h-1 bg-white bg-opacity-50 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-100 linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-white text-3xl font-bold opacity-70 hover:opacity-100 transition-opacity duration-200 z-20"
        >
          &times;
        </button>

        <img
          src={story.imageUrl}
          alt="Current Story"
          className="w-full h-full object-cover rounded-3xl transition-opacity duration-300 ease-in-out"
          style={{ opacity: imageOpacity }}
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x600/E0E0E0/333333?text=Image+Error"; }}
        />

        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full"></div>
          <div className="w-1/2 h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default StoryViewer;

