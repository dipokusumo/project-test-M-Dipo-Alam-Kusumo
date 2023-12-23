// Banner.js
import React from 'react';
import bannerImage from './banner.JPG'; // Ganti dengan path gambar yang sesuai

const Banner = () => {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '400px', // Sesuaikan tinggi banner sesuai kebutuhan
        width: '100%',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          background: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%), url(${bannerImage}) center/cover no-repeat`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          width: '100%',
          height: '500px', // Sesuaikan tinggi miring sesuai kebutuhan
          background: 'linear-gradient(to top right, transparent -1000000%, #fff 100%, #fff)',
          transformOrigin: 'bottom left',
          transform: 'skewY(-5deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '1',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', margin: '0' }}>Welcome</h1>
      </div>
    </div>
  );
};

export default Banner;
