/**
 * @module cleanText removes special characters from text and converts to lowercase
 * @param {string} text - text to clean
 * @return {string} cleaned text
 */
module.exports = function cleanText(text) {
  return text
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/[.!:,'"@#$%^&*]/g, "")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
};
