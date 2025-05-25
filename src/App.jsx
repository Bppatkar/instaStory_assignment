import React, { useState, useEffect } from 'react';
import StoriesList from './components/StoriesList';
import StoryViewer from './components/StoryViewer';

function App() {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/stories.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Could not fetch stories:", error);
      }
    };

    fetchStories();
  }, []);

  const openStoryViewer = (index) => {
    setCurrentStoryIndex(index);
    setIsViewerOpen(true);
  };

  const closeStoryViewer = () => {
    setCurrentStoryIndex(null);
    setIsViewerOpen(false);
  };

  const goToNextStory = () => {
    if (currentStoryIndex !== null && currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      closeStoryViewer();
    }
  };

  const goToPreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-4 font-sans antialiased">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Instagram Stories</h1>

      <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden pb-4">
        <StoriesList stories={stories} onStoryClick={openStoryViewer} />

        <div className="p-4 text-center text-gray-600">
          <p>Tap a story to view!</p>
          <p className="text-sm mt-2">(Simulated mobile screen. Resize your browser window to see effect.)</p>
        </div>
      </div>

      {isViewerOpen && stories.length > 0 && currentStoryIndex !== null && (
        <StoryViewer
          story={stories[currentStoryIndex]}
          onClose={closeStoryViewer}
          onNext={goToNextStory}
          onPrevious={goToPreviousStory}
          isLastStory={currentStoryIndex === stories.length - 1}
          isFirstStory={currentStoryIndex === 0}
        />
      )}
    </div>
  );
}

export default App;
