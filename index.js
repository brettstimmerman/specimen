// Matches and caputures attribute selectors. E.g., `[foo=bar]`
var ATTRIBUTE = /(\[[^\]]+\])/g;

// Matches and captures ID selectors. E.g., `#foo`
var ID = /(#[^\s\.\[\]:]+)/g;

// Matches and captures class selectors. E.g., `.foo`
var CLASS = /(\.[^\s\.:]+)/g;

// Matches and captures pseudo-element selectors. E.g., `::before`
var PSEUDO_ELEMENT = /(::[^\s\.:]+|:first-line|:first-letter|:before|:after)/g;

// Matches and captures pseduo-class selectors. E.g., `:hover`
var PSEUDO_CLASS = /(:[^\s\.:]+)/g;

// Matches and captures element selectors. E.g., `div`
var ELEMENT = /([^\s\.:]+)/g;

// Matches the negation pseudo-class, capturing its argument.
//
// Example:
//
//   ":not(.it)".replace(RE_NOT, '$1');
//   //=> .it
//
var NOT = /:not\(([^\)]*)\)/g;

// Matches selectors and combinators that have no affect on specificity. Also
// matches consecutive whitespace.
//
// Example:
//
//   ".foo  >  .bar~#baz".replace(RE_CRUFT, ' ');
//   //=> .foo .bar .baz
//
var CRUFT = /[\*\s\+>~]+/g;


exports = module.exports = specimen;

/**
 * Calulate the specificity of one or more CSS selectors.
 *
 * @param {String|Array} selectors
 * @returns {Array|undefined} specificity
 */
function specimen(selectors) {
  var isDefined;
  var results = [];

  if (!selectors) { return; }

  if (typeof selectors === 'string') {
    selectors = selectors.split(',');
  } else if (!Array.isArray(selectors)) {
    // An invalid type was given.
    return;
  }

  selectors.forEach(function (selector) {
    var s = specificity(selector);

    isDefined = isDefined || !!s;

    results.push(s);
  });

  if (isDefined) {
    return (results.length > 1) ? results : results[0];
  }
}


/**
 * Calulate the specificity of a single CSS selector.
 *
 * @param {String} selector CSS selector
 * @returns {Array|undefined} specificity
 */
function specificity(selector) {

  if (typeof selector !== 'string') { return; }

  /**
   * Returns the number of times `selector` from the parent scope matches the
   * given regular expression.
   *
   * If there is there is at least one match, all matches are removed from
   * `selector`. This is to prevent subsequent calls to `tally()` from reporting
   * false positives.
   *
   * @param {RegExp} regexp regular express to try
   * @return {Number} number of matches
   */
  function tally(regexp) {
    var m = selector.match(regexp);

    if (!m) { return 0; }

    selector = selector.replace(regexp, '');
    return m.length;
  }


  // Counters for each selector category.
  var a = 0, b = 0, c = 0;

  // Massage the incoming selector a bit.
  selector = selector
    // Remove negation pseudo-classes, but retain their arguments.
    .replace(NOT, ' $1 ')
    // Replace crufty characters with a single space.
    .replace(CRUFT, ' ');

  // Tally up the selectors for each category.
  a += tally(ID);
  b += tally(ATTRIBUTE);
  b += tally(CLASS);

  // Check for pseudo-elements before pseudo-classes. Pseudo-elements can look
  // exactly like a pseudo-class when used with a single colon. E.g., `:before`
  c += tally(PSEUDO_ELEMENT);
  b += tally(PSEUDO_CLASS);

  // Only elements should remain
  c += tally(ELEMENT);

  return [0, a, b, c];
}
