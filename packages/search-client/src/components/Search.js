import React, { useState, useReducer, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  FiSearch,
} from 'react-icons/fi';

import Input from './Input';

const Wrapper = styled.div`
  position: relative;
`;

const SuggestionsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  max-height: 344px;
  overflow-y: scroll;
  border: solid 1px #c3c4c7;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const SuggestionsList = styled.ul`
  list-style: none;
`;

const Suggestion = styled.li`
  background: #fff;
  border-bottom: solid 1px #c3c4c7;
  padding: 12px;
  &:last-child {
    border: 0;
  }
  ${props => props.focused && `
    background: #fffedc;
  `}
`;

/*
 * @TODO -> changing position of cursor with mouse and creates a bug as
 * of now where after keypress cursor moves to the end of the input.
 * this can be fixed ->
 * https://medium.com/@prijuly2000/data-formatting-cursor-positioning-in-react-86c52008d0fc
 */

function Search({
  value,
  onChange,
  suggestions,
  onSelect,
  renderSuggestion,
  noSuggestion,
  searchSelection,
  ...inputProps
}) {
  // copy of the value prop. this is kept to avoid search when term is changed due to suggestion highlight
  const [term, setTerm] = useState(value);

  const [focused, updateFocused] = useReducer((index, action) => {
    switch(action.type) {
      // down arrow, when user reaches the last index, keep it there
      case 'increment':
        return Math.min(index + 1, suggestions.length - 1);
      // up arrow, allow the index to go -1 which indicates use is back to search box
      case 'decrement':
        return Math.max(index - 1, -1);
      // change on mouse movement
      case 'change':
        return action.index;
      // reset when term changes
      case 'reset':
        return -1;
      default:
        throw new Error();
    }
  }, -1);

  // change term when prop.value changes
  useEffect(() => setTerm(value), [value]);

  // ref which points to current focused element, used for scrollIntoView
  const focusedResult = useRef(null);

  // scroll when focused index changes and change display term
  useEffect(() => {
    if (focusedResult.current) {
      focusedResult.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [focused, suggestions]);

  // reset focused when value changes
  useEffect(() => updateFocused({ type: 'reset' }), [value]);

  // handle search box keyboard events
  const onSearchBoxKey = ({ key }) => {
    // if user hits enter (equivalanet to hitting search button)
    // Hide suggestions, you should. Search you must.
    if (key === 'Enter') {
      if (suggestions.length) {
        if (focused !== -1 && suggestions[focused]) {
          return onSelect(suggestions[focused]);
        }
        // select first suggestion
        return onSelect(suggestions[0]);
      }
      // ignore
      return;
    }

    if (key === 'ArrowDown') {
      return updateFocused({ type: 'increment' });
    }

    if (key === 'ArrowUp') {
      return updateFocused({ type: 'decrement' });
    }

    updateFocused({ type: 'reset' });
  };

  return (
    <Wrapper>
      <Input
        icon={<FiSearch color='#b4b8bf' />}
        value={term}
        onChange={({ target }) => onChange(target.value)}
        onClear={term ? () => onChange('') : null}
        onKeyDown={onSearchBoxKey}
        {...inputProps}
      />
      {!!term && !searchSelection && (
        <SuggestionsWrapper>
          <SuggestionsList>
            {!!suggestions.length ? suggestions.map((result, index) => (
              <Suggestion
                key={result.id}
                focused={index === focused}
                ref={index === focused ? focusedResult : null}
                onMouseMove={() => updateFocused({ type: 'change', index })}
                onClick={() => onSelect(result)}
              >
                {/* assumed that id is unique */}
                {renderSuggestion(result)}
              </Suggestion>
            )) : (
              <Suggestion>
                <p>{noSuggestion}</p>
              </Suggestion>
            )}
          </SuggestionsList>
        </SuggestionsWrapper>

      )}
    </Wrapper>
  );
}

export default Search;
