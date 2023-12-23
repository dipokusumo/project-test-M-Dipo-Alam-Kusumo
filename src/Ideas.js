// Ideas.js
import React from 'react';
import ListPost from './Listpost';
import post from './post.png';

const Ideas = () => {
  const dummyPosts = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: `Post ${index + 1}`,
    imageUrl: post, // Ganti dengan path gambar yang sesuai
    description: `Description ${index + 1}`,
  }));

  return (
    <div>
      <ListPost posts={dummyPosts} />
    </div>
  );
};

export default Ideas;

