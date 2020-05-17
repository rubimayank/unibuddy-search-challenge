import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import SearchIndex from 'search-index';
import {
  FiSearch,
} from 'react-icons/fi';

import Search from './Search';
import PrimaryButton from './PrimaryButton';
import BookCard from './BookCard';

const SearchBoxWrapper = styled.div`
  display: flex;
  margin: 16px;
  justify-content: center;
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button {
    margin: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const SearchResults = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  > div {
    display: flex;
    @media screen and (min-width: 600px) {
      flex-basis: 50%;
    }
    @media screen and (min-width: 1000px) {
      flex-basis: 33%;
    }
  }
`;

function BookSearch({ books }) {
  const [selectedBooks, setBookSelection] = useState([]);

  // list of suggestions to render
  const [suggestions, setSuggestions] = useState([]);

  // selected item from the suggestions
  const [searchSelection, setSearchSelection] = useState(null);

  // searchTerm will represent the value user wants to search
  const [searchTerm, setSearchTerm] = useState('');

  // create an index of data and keep it (this demo specific)
  const index = useMemo(() => new SearchIndex({
    initialData: books,
    idField: 'id',
    searchFeild: 'summary',
  }), [books]);

  useEffect(() => console.log(books), [books]);

  // search a term in suggestions and also set for controlled Search component
  const onTermChange = (term) => {
    setSearchTerm(term);
    setSuggestions(index.search(term));
    setSearchSelection(null);
  };

  // a placeholder function instead of navigation to a search page
  const onSearch = () => {
    setBookSelection(Array.from(new Set([
      ...selectedBooks,
      searchSelection.id,
    ])))
    setSearchTerm('');
    setSuggestions([]);
    setSearchSelection(null);
  };

  const onRemove = (id) => {
    setBookSelection(selectedBooks.filter(i => i !== id));
  };

  // when a suggestion is selected
  const onSuggestionSelect = (suggestion) => {
    setSuggestions([]);
    setSearchTerm(suggestion.title);
    setSearchSelection(suggestion);
  };

  return (
    <>
      <SearchBoxWrapper>
        <Search
          placeholder='Search books'
          value={searchTerm}
          onChange={onTermChange}
          suggestions={suggestions}
          onSelect={onSuggestionSelect}
          renderSuggestion={(result) => result.title}
          noSuggestion='No books found'
          searchSelection={searchSelection}
        />
        <PrimaryButton title='Search' onClick={onSearch}>
          <FiSearch />
        </PrimaryButton>
      </SearchBoxWrapper>
      <SearchResults>
        {selectedBooks.map(id => (
          <div>
            <BookCard
              key={id}
              book={books[id]}
              onRemove={() => onRemove(id)}
            />
          </div>
        ))}
      </SearchResults>
    </>
  );
}

export default BookSearch;
