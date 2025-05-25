import React, { useContext } from 'react';
import { ThemeContext } from '../App';

function StoriesList({ stories, onStoryClick }) {
  const { theme } = useContext(ThemeContext);

  const activeTextColor = theme === 'light' ? 'text-gray-700' : 'text-gray-300';
  const viewedTextColor = theme === 'light' ? 'text-gray-500' : 'text-gray-500';

  return (
    <div className="w-full max-w-md overflow-x-auto whitespace-nowrap py-4 px-2 no-scrollbar">
      <div className="inline-flex space-x-4">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer flex-shrink-0"
            onClick={() => onStoryClick(stories.findIndex(s => s.id === story.id))}
          >
            <div className={`relative w-16 h-16 rounded-full overflow-hidden p-[2px] flex items-center justify-center shadow-sm
                         ${story.isViewed ? 'border-2 border-gray-300' : 'border-[3px] border-pink-500'}`}>
              <img
                src={story.profileUrl}
                alt={`Story by ${story.name}`}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x64/cccccc/333333?text=User"; }}
              />
            </div>
            <span className={`text-sm mt-1 truncate w-16 text-center ${story.isViewed ? viewedTextColor : activeTextColor}`}>
              {story.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoriesList;

