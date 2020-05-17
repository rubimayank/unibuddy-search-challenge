const cleanText = require('../cleanText');

describe('cleanText', () => {
  it('should clean special chars', () => {
    const cleanedText = cleanText('   What        Got Yo.u Here Won\u2019t G\"et Yo,u \'There');
    expect(cleanedText).toEqual('what got you here wont get you there');
  });
});
