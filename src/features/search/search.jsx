import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, validateSearchQuery } from './searchQuery';

const Search = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const error = useSelector((state) => state.search.error);
  
  const handleChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleBlur = () => {
    dispatch(validateSearchQuery());
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Search..."
        className='w-full rounded-lg border shadow'
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Search;
