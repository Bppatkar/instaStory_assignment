import React, { useState, useEffect } from "react";

import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

const SinglePost = ({ post }) => {
  if (!post || !post.user) {
    return null;
  }

  const { user, imageUrl, likes, caption } = post;

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm my-4">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <img
            src={user.picture.thumbnail}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover mr-3 border border-gray-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/36x36/cccccc/333333?text=User";
            }}
          />
          <div>
            <p className="font-semibold text-sm text-gray-800">
              {user.login.username}
            </p>

            <p className="text-xs text-gray-500">{`${user.location.city}, ${user.location.country}`}</p>
          </div>
        </div>

        <BsThreeDots
          size={20}
          className="text-gray-600 cursor-pointer hover:opacity-70 transition-opacity"
        />
      </div>

      <div className="w-full bg-gray-200 aspect-square flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt="Dummy Post"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x600/E0E0E0/333333?text=Image+Error";
          }}
        />
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="flex space-x-4">
          <FaRegHeart
            size={24}
            className="text-gray-600 cursor-pointer hover:text-red-500 transition-colors"
          />

          <FaRegComment
            size={24}
            className="text-gray-600 cursor-pointer hover:text-blue-500 transition-colors"
          />

          <FiSend
            size={24}
            className="text-gray-600 cursor-pointer hover:text-green-500 transition-colors"
          />
        </div>

        <FaRegBookmark
          size={24}
          className="text-gray-600 cursor-pointer hover:text-yellow-500 transition-colors"
        />
      </div>

      <div className="px-3 pb-3 text-sm">
        <p className="font-semibold text-gray-800">{likes} likes</p>
        <p className="text-gray-700 mt-1">
          <span className="font-semibold">{user.login.username}</span> {caption}
        </p>
        <p className="text-gray-500 text-xs mt-1">View all comments</p>
      </div>
    </div>
  );
};

function DummyInstagramPost() {
  const [posts, setPosts] = useState([]);
  const numberOfPosts = 3;

  useEffect(() => {
    const fetchDummyPosts = async () => {
      try {
        const response = await fetch(
          `https://randomuser.me/api/?results=${numberOfPosts}`
        );
        const data = await response.json();
        const users = data.results;

        const generatedPosts = users.map((user, index) => ({
          id: `dummy-post-${index}`,
          user: user,
          imageUrl: `https://picsum.photos/600/600?random=${index + 1}`,
          likes: Math.floor(Math.random() * 5000) + 100,
          caption: `This is a beautiful moment captured by ${user.login.username}! #travel #photography #adventure`,
        }));
        setPosts(generatedPosts);
      } catch (error) {
        console.error("Error fetching dummy posts:", error);
      }
    };
    fetchDummyPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-sm my-4 p-4 text-center text-gray-500">
        Loading dummy posts...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
}

export default DummyInstagramPost;
