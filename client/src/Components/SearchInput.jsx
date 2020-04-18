import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_RECIPE } from '../queries/Recipes';

const SearchInput = ({ setResult }) => {
  const { Search } = Input;

  const [searchTerm, { loading }] = useLazyQuery(SEARCH_RECIPE, {
    onCompleted({ searchRecipes }) {
      setResult(searchRecipes);
    },
  });

  let timeOut;
  const handleSearch = (e, searchTerm) => {
    e.persist();
    timeOut = setTimeout(async () => {
      await searchTerm({
        variables: { searchTerm: e.target.value },
      });
    }, 1000);
  };

  useEffect(() => {
    if (timeOut) clearTimeout(timeOut);
  }, [timeOut]);

  return (
    <Search
      placeholder="search"
      loading={loading}
      onChange={e => handleSearch(e, searchTerm)}
    />
  );
};

export default SearchInput;
