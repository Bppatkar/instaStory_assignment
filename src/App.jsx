import React, { useState, useEffect, useReducer } from 'react';
import StoriesList from './components/StoriesList';
import StoryViewer from './components/StoryViewer';
import DummyInstagramPost from './components/DummyInstagramPost';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORIES':
      return action.payload.map(story => ({ ...story, isViewed: false }));

    case 'MARK_STORY_VIEWED':
      const viewedStoryId = action.payload;
      const updatedStories = state.map(story =>
        story.id === viewedStoryId ? { ...story, isViewed: true } : story
      );
      const unviewed = updatedStories.filter(story => !story.isViewed);
      const viewed = updatedStories.filter(story => story.isViewed);

      return [...unviewed, ...viewed];

    default:
      return state;
  }
};

function App() {
  const [stories, dispatch] = useReducer(storiesReducer, []);
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
        dispatch({ type: 'SET_STORIES', payload: data });
      } catch (error) {
        console.error("Could not fetch stories:", error);
      }
    };

    fetchStories();
  }, []);

  const openStoryViewer = (originalIndex) => {
    if (stories[originalIndex]) {
      const storyToViewId = stories[originalIndex].id;
      dispatch({ type: 'MARK_STORY_VIEWED', payload: storyToViewId });
      const reorderedStories = stories.map(story =>
        story.id === storyToViewId ? { ...story, isViewed: true } : story
      );
      const unviewed = reorderedStories.filter(story => !story.isViewed);
      const viewed = reorderedStories.filter(story => story.isViewed);
      const newIndex = [...unviewed, ...viewed].findIndex(story => story.id === storyToViewId);

      setCurrentStoryIndex(newIndex !== -1 ? newIndex : 0);
      setIsViewerOpen(true);
    }
  };

  const closeStoryViewer = () => {
    setCurrentStoryIndex(null);
    setIsViewerOpen(false);
  };

  const goToNextStory = () => {
    if (currentStoryIndex !== null && currentStoryIndex < stories.length - 1) {
      const nextStory = stories[currentStoryIndex + 1];
      dispatch({ type: 'MARK_STORY_VIEWED', payload: nextStory.id });
      const reorderedStories = stories.map(story =>
        story.id === nextStory.id ? { ...story, isViewed: true } : story
      );
      const unviewed = reorderedStories.filter(story => !story.isViewed);
      const viewed = reorderedStories.filter(story => story.isViewed);
      const newNextIndex = [...unviewed, ...viewed].findIndex(story => story.id === nextStory.id);

      setCurrentStoryIndex(newNextIndex !== -1 ? newNextIndex : currentStoryIndex);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-4 font-sans antialiased">
      <Header />

      <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden pb-4 mt-4">
        <StoriesList stories={stories} onStoryClick={openStoryViewer} />
        <DummyInstagramPost />
      </div>

      <BottomNavBar />

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

