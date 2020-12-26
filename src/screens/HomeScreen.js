import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPerson } from '../actions/actorActions';
import CardGrid from '../components/CardGrid';
import Pagination from '../components/Pagination';

const HomeScreen = () => {
  const [name, setName] = useState('');
  const [searchName, setSearchName] = useState('');
  const actorData = useSelector((state) => state.actorData);
  const { loading, success, person } = actorData;
  // console.log(person);
  const dispatch = useDispatch();

  const nameHandler = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getPerson(name));
    setSearchName(name);
    setName('');
  };

  return (
    <div className='container'>
      <h1>Home Screen</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor='name'>Search by Name</label>
        <input id='name' value={name} onChange={nameHandler} />
        <button type='submit'>Submit</button>
      </form>
      {loading && <h2>LOADING...</h2>}
      {person && person.total_results === 0 && (
        <h2>No Results Found for {searchName}</h2>
      )}
      {person && person.total_results !== 0 && (
        <>
          <h2>Search Results for {searchName}</h2>
          <CardGrid persons={person.results} />
        </>
      )}
      {person && person.total_pages > 0 && <Pagination />}
    </div>
  );
};

export default HomeScreen;
