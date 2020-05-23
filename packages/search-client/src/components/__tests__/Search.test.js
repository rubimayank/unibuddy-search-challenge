import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Search from '../Search';

describe('input', () => {
  it('should render with minimal props', () => {
    const snap = renderer.create(
      <Search
        value=''
        onChange={() => {}}
        suggestions={[]}
        onSelect={() => {}}
        renderSuggestion={() => {}}
      />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('should render no result', () => {
    const snap = renderer.create(
      <Search
        value='value'
        onChange={() => {}}
        suggestions={[]}
        onSelect={() => {}}
        renderSuggestion={() => {}}
      />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('should render with suggestions', () => {
    const snap = renderer.create(
      <Search
        value='value'
        onChange={() => {}}
        suggestions={[
          { id : 1, bar: 'foo1' },
          { id : 3, bar: 'foo2' },
          { id : 5, bar: 'foo5' },
        ]}
        onSelect={() => {}}
        renderSuggestion={r => r.bar}
      />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('should render without suggestions after selection', () => {
    const snap = renderer.create(
      <Search
        value='value'
        onChange={() => {}}
        suggestions={[
          { id : 1, bar: 'foo1' },
          { id : 3, bar: 'foo2' },
          { id : 5, bar: 'foo5' },
        ]}
        onSelect={() => {}}
        renderSuggestion={r => r.bar}
        searchSelection={{ id : 1 }}
      />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('should call onChange on input change', () => {
    let value = '';
    const wrapper = renderer.create(
      <Search
        value='value'
        onChange={v => { value = v; }}
        suggestions={[]}
        onSelect={() => {}}
        renderSuggestion={() => {}}
      />
    ).root;
    const input = wrapper.findByType('input');
    input.props.onChange({ target: { value: 'change' }});
    expect(value).toEqual('change');
  });

  it('should change focus on mouse hover', () => {
    let wrapper;
    renderer.act(() => {
      wrapper = renderer.create(
        <Search
          value='foo'
          onChange={() => {}}
          suggestions={[
            { id : 1, bar: 'foo1' },
            { id : 3, bar: 'foo2' },
            { id : 5, bar: 'foo5' },
          ]}
          onSelect={() => {}}
          renderSuggestion={r => r.bar}
        />
      );
    });
    const suggestions = wrapper.root.findAllByType('li');
    renderer.act(() => {
      suggestions[1].props.onMouseMove();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should change focus on keyboard arrowdown', () => {
    let wrapper;
    renderer.act(() => {
      wrapper = renderer.create(
        <Search
          value='foo'
          onChange={() => {}}
          suggestions={[
            { id : 1, bar: 'foo1' },
            { id : 3, bar: 'foo2' },
            { id : 5, bar: 'foo5' },
          ]}
          onSelect={() => {}}
          renderSuggestion={r => r.bar}
        />
      );
    });
    const input = wrapper.root.findByType('input');
    renderer.act(() => {
      input.props.onKeyDown({ key: 'ArrowDown' });
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should change focus on keyboard arrowup', () => {
    let wrapper;
    renderer.act(() => {
      wrapper = renderer.create(
        <Search
          value='foo'
          onChange={() => {}}
          suggestions={[
            { id : 1, bar: 'foo1' },
            { id : 3, bar: 'foo2' },
            { id : 5, bar: 'foo5' },
          ]}
          onSelect={() => {}}
          renderSuggestion={r => r.bar}
        />
      );
    });
    const input = wrapper.root.findByType('input');
    renderer.act(() => {
      input.props.onKeyDown({ key: 'ArrowDown' });
      input.props.onKeyDown({ key: 'ArrowDown' });
      input.props.onKeyDown({ key: 'ArrowUp' });
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should select on keyboard enter', () => {
    let selected = null;
    let wrapper;
    renderer.act(() => {
      wrapper = renderer.create(
        <Search
          value='foo'
          onChange={() => {}}
          suggestions={[
            { id : 1, bar: 'foo1' },
            { id : 3, bar: 'foo2' },
            { id : 5, bar: 'foo5' },
          ]}
          onSelect={({ bar }) =>  { selected = bar; }}
          renderSuggestion={r => r.bar}
        />
      );
    });
    const input = wrapper.root.findByType('input');
    renderer.act(() => {
      input.props.onKeyDown({ key: 'Enter' });
    });
    expect(selected).toEqual('foo1');
  });

  it('should select on suggestion click', () => {
    let selected = null;
    let wrapper;
    renderer.act(() => {
      wrapper = renderer.create(
        <Search
          value='foo'
          onChange={() => {}}
          suggestions={[
            { id : 1, bar: 'foo1' },
            { id : 3, bar: 'foo2' },
            { id : 5, bar: 'foo5' },
          ]}
          onSelect={({ bar }) =>  { selected = bar; }}
          renderSuggestion={r => r.bar}
        />
      );
    });
    const suggestions = wrapper.root.findAllByType('li');
    renderer.act(() => {
      suggestions[1].props.onClick();
    });
    expect(selected).toEqual('foo2');
  });

  it('should reset focus on value change', () => {
    let wrapper;
    renderer.act(() => {
      wrapper = renderer.create(
        <Search
          value='foo'
          onChange={() => {}}
          suggestions={[
            { id : 1, bar: 'foo1' },
            { id : 3, bar: 'foo2' },
            { id : 5, bar: 'foo5' },
          ]}
          onSelect={() => {}}
          renderSuggestion={r => r.bar}
        />
      );
    });
    const suggestions = wrapper.root.findAllByType('li');
    renderer.act(() => {
      suggestions[1].props.onMouseMove();
    });
    renderer.act(() => {
      wrapper.update(
        <Search
          value='valueupdate'
          onChange={() => {}}
          suggestions={[
            { id : 1, bar: 'foo1' },
            { id : 3, bar: 'foo2' },
            { id : 5, bar: 'foo5' },
          ]}
          onSelect={() => {}}
          renderSuggestion={r => r.bar}
        />
      );
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it.todo('should clear value on clear btn click');
});
