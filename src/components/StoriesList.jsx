import React from 'react';

function StoriesList({ stories, onStoryClick }) {
  return (
    <div className="w-full max-w-md overflow-x-auto whitespace-nowrap py-4 px-2 no-scrollbar">
      <div className="inline-flex space-x-4">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer flex-shrink-0"
            onClick={() => onStoryClick(index)}
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500 p-[2px] flex items-center justify-center">
              <img
                src={story.imageUrl}
                alt={`Story by User ${index + 1}`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-gray-700 mt-1 truncate w-16 text-center">{`User ${index + 1}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoriesList;
