import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from '../actions/movieActions';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
// import './MovieScreen.scss';

const MovieSearchScreen = () => {
  const [title, setTitle] = useState('');

  const movieData = useSelector((state) => state.movieData);
  const { loading, success, movies, keywords } = movieData;
  console.log(movies);
  const dispatch = useDispatch();

  const titleHandler = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getMovie(title));
    setTitle('');
  };

  return (
    <div className='container'>
      <h1>Movie Search Screen</h1>
      <form className='form-search' onSubmit={submitHandler}>
        <label htmlFor='name'>Search for Movie By Title</label>
        <div className='input-group'>
          <input id='name' value={title} onChange={titleHandler} />
          <button type='submit'>Submit</button>
        </div>
      </form>
      {loading && <h2>LOADING...</h2>}
      {movies && movies.total_results === 0 && (
        <h2>No Results Found for {keywords.replace('+', ' ')}</h2>
      )}
      {movies && movies.total_results !== 0 && (
        <>
          <h2>Search Results for {keywords.replace('+', ' ')}</h2>
          <MovieGrid movies={movies.results} />
        </>
      )}
      {/* {movies && movies.total_pages > 0 && <Pagination />} */}
    </div>
  );
};

export default MovieSearchScreen;
