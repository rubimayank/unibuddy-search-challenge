const SearchIndex = require('../index');

describe('Search Index', () => {
  it("should create a SearchIndex with blank dataset", () => {
    const index = new SearchIndex();
    expect(index.size).toEqual(0);
  });

  it("should add a record to the dataset", () => {
    const index = new SearchIndex();
    index.addRecord({
      id: 'foo',
      summary: 'bar'
    });
    const addedRecord = index.dataset['foo'];
    expect(addedRecord.text).toEqual('bar');
  });

  it("should add a record to the wordIndex", () => {
    const index = new SearchIndex();
    index.addRecord({
      id: 'foo',
      summary: 'bar repeat bar '
    });
    expect(index.wordIndex).toHaveProperty('bar', {'foo': 2});
  });

  it('should search', () => {
    const index = new SearchIndex({
      initialData: [
        'one two three four five',
        'xxx two  ias five five',
        'as  qqw as asa',
        'sss two five sadas',
      ],
      searchFeild: null,
    });
    const results = index.search('two five', 2);
    expect(results).toEqual([
      'sss two five sadas',
      'xxx two  ias five five',
    ]);
  });
});
