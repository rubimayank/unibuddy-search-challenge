const cleanText = require('./cleanText');

/**
 * @class SearchIndex class for creating a very simple search index based on word frequency
 */
class SearchIndex {
  /**
   * @constructs
   */
  constructor(params = {}) {
    // not use class properties case CRA by default doesnt transpile third party libs
    /**
     * @property {object} wordIndex - internal word index
     */
    this.wordIndex = {};

    /**
     * @property {object} dataset - all the records added to the search index
     */
    this.dataset = {};

    /**
     * @property {number} count of records
     */
    this.size = 0;

    const {
      initialData = [],
      idField = 'id',
      searchFeild = 'summary',
    } = params;
    this.idField = idField;
    // creating a single field index, can be made multifields such as index on both summary and title
    this.searchFeild = searchFeild;

    initialData.forEach(this.addRecord.bind(this));
  }

  /**
   * @method addRecord add a record the search index
   * @param {object|string} record - record to add to the index
   */
  addRecord(record) {
    // get the idField's value from the record or fallback to dataset length
    const { [this.idField] : id = this.size } = record;

    // if searchFeild is not null get the string under search
    let searchString = record;
    if (this.searchFeild) {
      ({ [this.searchFeild]: searchString = '' } = record);
    }

    // typically we should remove stopwrods such as i, an, the from the string, ignoring it here
    // just doing a lazy replace of characters
    const text = cleanText(searchString);

    // get teh text for later use in scoring and record for reulsts
    this.dataset[id] = {
      record,
      text,
    };

    // split by words and add frequency of every word in the index
    text.split(' ').forEach((word) => {
      // get the freqMap of the word
      const { [word]: freqMap = {} } = this.wordIndex;

      // a word might come more thn once
      let { [id]: freq = 0 }  = freqMap;

      freqMap[id] = freq + 1;
      this.wordIndex[word] = freqMap;
    });

    this.size++;
  }

  /*
   * @method search - search query in the index
   * @param {string} query - search query
   * @param {number} count - result length
   * @return {array[object]} result record sorted by relavance
   */
  search(query, count = 10) {
    // get the clean query, we'll use it later for exact match
    const cleanQuery = cleanText(query);

    // again we will need terms for later
    const terms = cleanQuery.split(' ');

    // simply adding frequency scores of every word as of now
    const freqMap = terms.reduce((map, term) => {
      const { [term]: termMap = {} } = this.wordIndex;
      // return sum of termMap and freqMap's frequency per record id
      Object.entries(termMap).forEach(([id, freq]) => {
        const { [id]: recordFreq = 0 } = map;
        map[id] = recordFreq + freq;
      });
      return map;
    }, {});

    const sortedMap = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);

    let results = [];
    sortedMap.forEach(([id, freq]) => {
      const { text, record } = this.dataset[id];
      // exact match
      if (freq >= terms.length && text.includes(cleanQuery)) {
        results = [record, ...results];
      } else {
        results.push(record);
      }
    });
    return results.slice(0, count);
  }
}

module.exports = SearchIndex;
