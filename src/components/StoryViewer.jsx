import React, { useEffect, useState, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';

function StoryViewer({ story, onClose, onNext, onPrevious, isLastStory, isFirstStory }) {
  const [progress, setProgress] = useState(0);
  const [mediaOpacity, setMediaOpacity] = useState(0);
  const timerRef = useRef(null);
  const videoRef = useRef(null);
  const storyDuration = 5000;

  const mediaType = story.story.type;
  const mediaUrl = story.story.imageUrl || story.story.videoUrl;

  const startTimer = () => {
    setProgress(0);
    setMediaOpacity(0);
    clearInterval(timerRef.current);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setTimeout(() => {
      setMediaOpacity(1);

      if (mediaType === 'video' && videoRef.current) {
        videoRef.current.play().catch(error => console.error("Video autoplay failed:", error));
      }

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
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [story.id, onNext]);

  const handleTap = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }

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

        <div className="absolute top-4 left-4 flex items-center z-10">
          <img
            src={story.profileUrl}
            alt={story.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-white"
          />
          <span className="ml-2 text-white font-semibold text-sm">{story.name}</span>
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

        {mediaType === 'video' ? (
          <video
            ref={videoRef}
            src={mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-3xl transition-opacity duration-300 ease-in-out"
            style={{ opacity: mediaOpacity }}
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Current Story"
            className="w-full h-full object-cover rounded-3xl transition-opacity duration-300 ease-in-out"
            style={{ opacity: mediaOpacity }}
          />
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 p-2 rounded-full text-white hover:bg-opacity-40 transition-all duration-200 z-10"
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default StoryViewer;

