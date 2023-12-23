// ListPost.js
import React, { useState, useEffect } from 'react';

const sortPosts = (posts, sortOption) => {
  return [...posts].sort((a, b) => {
    if (sortOption === 'newest') {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });
};

const Listpost = ({ posts }) => {
  const perPageOptions = [10, 20, 50];

  const getInitialPerPage = () => {
    const storedPerPage = localStorage.getItem('perPage');
    return Number(storedPerPage) || perPageOptions[0];
  };

  const getInitialSortOption = () => {
    const storedSortOption = localStorage.getItem('sortOption');
    return storedSortOption || 'newest';
  };

  const getInitialCurrentPage = () => {
    const storedCurrentPage = localStorage.getItem('currentPage');
    return Number(storedCurrentPage) || 1;
  };

  const [visiblePosts, setVisiblePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(getInitialCurrentPage);
  const [perPage, setPerPage] = useState(getInitialPerPage);
  const [sortOption, setSortOption] = useState(getInitialSortOption);

  useEffect(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const sortedPosts = sortPosts(posts, sortOption);
    const visibleData = sortedPosts.slice(startIndex, endIndex);
    setVisiblePosts(visibleData);
  }, [posts, currentPage, perPage, sortOption]);

  useEffect(() => {
    // Simpan data konfigurasi ke localStorage
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  useEffect(() => {
    // Simpan data konfigurasi ke localStorage
    localStorage.setItem('perPage', perPage);
  }, [perPage]);

  useEffect(() => {
    // Simpan data konfigurasi ke localStorage
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePerPageChange = (e) => {
    const newPerPage = Number(e.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset current page to 1 when changing per page
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const totalPosts = posts.length;
  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(startIndex + perPage - 1, totalPosts);

  // ...

  const totalPages = Math.ceil(totalPosts / perPage);
  const currentPageIndex = Math.ceil(currentPage / 3);
  const startPage = (currentPageIndex - 1) * 3 + 1;
  const pageNumbers = Array.from({ length: 3 }, (_, i) => startPage + i).filter((page) => page <= totalPages);

  return (
    <div style={{ margin: '20px' }}>
      {/* Tampilkan informasi post yang sedang ditampilkan */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          Showing {startIndex} to {endIndex} of {totalPosts}
        </div>
        <div style={{ textAlign: 'right' }}>
          <span>Show per page: </span>
          <select value={perPage} onChange={handlePerPageChange}>
            {perPageOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span> | Sort By: </span>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Tampilkan post */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            style={{
              marginBottom: '20px',
              border: '1px solid #ddd', // Border styling
              padding: '10px', // Padding for each post
              borderRadius: '8px', // Border radius
            }}
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              loading="lazy"
            />
            <h3
              style={{
                marginTop: '10px',
                maxHeight: '3em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3, // Maksimal 3 baris
              }}
            >
              {post.title}
            </h3>
            <p>{post.description}</p>
          </div>
        ))}
      </div>

      {/* Tampilkan tombol pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            style={{
              marginLeft: '5px',
              marginRight: '5px',
              fontWeight: pageNumber === currentPage ? 'bold' : 'normal',
            }}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Listpost;
