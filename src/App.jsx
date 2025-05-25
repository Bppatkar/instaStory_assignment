import React, { useState, useEffect, useReducer, createContext } from 'react';
import StoriesList from './components/StoriesList';
import StoryViewer from './components/StoryViewer';
import DummyInstagramPost from './components/DummyInstagramPost';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';

export const ThemeContext = createContext(null);

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORIES':
      return action.payload.map(story => ({ ...story, isViewed: false }));

    case 'MARK_STORY_VIEWED':
      const viewedStoryId = action.payload;
      return state.map(story =>
        story.id === viewedStoryId ? { ...story, isViewed: true } : story
      );
    default:
      return state;
  }
};

function App() {
  const [stories, dispatch] = useReducer(storiesReducer, []);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

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
      dispatch({ type: 'MARK_STORY_VIEWED', payload: stories[originalIndex].id });
      setCurrentStoryIndex(originalIndex);
      setIsViewerOpen(true);
    }
  };

  const closeStoryViewer = () => {
    setCurrentStoryIndex(null);
    setIsViewerOpen(false);
  };

  const goToNextStory = () => {
    if (currentStoryIndex !== null && currentStoryIndex < stories.length - 1) {
      const nextIndex = currentStoryIndex + 1;
      dispatch({ type: 'MARK_STORY_VIEWED', payload: stories[nextIndex].id });
      setCurrentStoryIndex(nextIndex);
    } else {
      closeStoryViewer();
    }
  };

  const goToPreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const unviewedStories = stories.filter(story => !story.isViewed);
  const viewedStories = stories.filter(story => story.isViewed);
  const displayedStories = [...unviewedStories, ...viewedStories];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start py-4 font-sans antialiased relative">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={`w-full max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col
                       ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-100'}`}>
          <Header />

          <div className="flex-grow overflow-y-auto no-scrollbar pb-12">
            <StoriesList stories={displayedStories} onStoryClick={openStoryViewer} />
            <DummyInstagramPost />
            <DummyInstagramPost />
            <DummyInstagramPost />
            <div className="p-4 text-center text-gray-400 text-sm">
              End of dummy feed.
            </div>
          </div>
        </div>

        <BottomNavBar />
      </ThemeContext.Provider>

      {isViewerOpen && stories.length > 0 && currentStoryIndex !== null && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="relative w-full max-w-sm h-full">
            <StoryViewer
              story={stories[currentStoryIndex]}
              onClose={closeStoryViewer}
              onNext={goToNextStory}
              onPrevious={goToPreviousStory}
              isLastStory={currentStoryIndex === stories.length - 1}
              isFirstStory={currentStoryIndex === 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

