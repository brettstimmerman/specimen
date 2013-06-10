var assert = require('assert');
var specimen = require('..');

var SELECTORS = {
  // http://www.w3.org/TR/css3-selectors/#specificity
  '*': [0,0,0,0],
  'LI': [0,0,0,1],
  'UL LI': [0,0,0,2],
  'UL OL+LI': [0,0,0,3],
  'H1 + *[REL=up]': [0,0,1,1],
  'UL OL LI.red': [0,0,1,3],
  'LI.red.level': [0,0,2,1],
  '#x34y': [0,1,0,0],
  '#s12:not(FOO)': [0,1,0,1],

  // http://css-tricks.com/specifics-on-css-specificity/
  'ul#nav li.active a': [0,1,1,3],
  'body.ie7 .col_3 h2 ~ h2': [0,0,2,3],
  '#footer *:not(nav) li': [0,1,0,2],
  'ul > li ul li ol li:first-letter': [0,0,0,7],

  // http://reference.sitepoint.com/css/specificity
  'body#home div#warning p.message': [0,2,1,3],
  '* body#home>div#warning p.message': [0,2,1,3],
  '#home #warning p.message': [0,2,1,1],
  '#warning p.message': [0,1,1,1],
  '#warning p': [0,1,0,1],
  'p.message': [0,0,1,1],
  'p': [0,0,0,1],

  // Bugs discovered since day one.
  '#p[foo=bar]': [0,1,1,0]
};

describe('Selector Tests', function () {
  Object.keys(SELECTORS).forEach(function (key) {
    it(key, function () {
      assert.deepEqual(specimen(key), SELECTORS[key]);
    });
  });
});
