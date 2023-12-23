import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Component = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/ideas', {
          params: {
            'page[number]': 1,
            'page[size]': 10,
            append: ['small_image', 'medium_image'],
            sort: '-published_at',
          },
        });
        console.log(response.data); // Log the response data
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error); // Set the error state
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              {/* Render your data here */}
              <p>{item.title}</p>
              <img src={item.small_image} alt={item.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Component;
