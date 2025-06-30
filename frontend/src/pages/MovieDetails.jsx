import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dummyShowsData, dummyDateTimeData } from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import { StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const getShow = () => {
      // Convert id to string for comparison since URL params are always strings
      const foundShow = dummyShowsData.find(show => String(show._id) === id);
      if (!foundShow) {
        console.error('Show not found for id:', id);
        return;
      }
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData // Store the full dateTime data
      });
    };
    getShow();
  }, [id]);

  if (!show?.movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading movie details...</p>
      </div>
    );
  }

  return (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img 
          src={show.movie.poster_path} 
          alt={show.movie.title || 'Movie poster'} 
          className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' 
        />
        <div className='relative flex flex-col gap-3'>
          <BlurCircle top="-100px" left="-100px" />
          <p className='text-primary'>{show.movie.original_language?.toUpperCase() || 'English'}</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className="w-5 h-5 text-primary fill-primary"/>
            {show.movie.vote_average?.toFixed(1) || 'N/A'} User Rating
          </div>

          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview || 'No overview available'}</p>

          <p>
            {show.movie.runtime ? timeFormat(show.movie.runtime) : 'Duration N/A'} • {show.movie.genres?.map(genre => genre.name).join(', ') || 'Genre N/A'} • {show.movie.release_date ? show.movie.release_date.split('-')[0] : 'Year N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;