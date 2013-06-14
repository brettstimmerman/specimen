var assert = require('assert');
var specimen = require('..');

describe('specimen(selectors)', function () {
  it('accepts a string argument', function () {
    assert.doesNotThrow(function () {
      specimen('.foo');
    });

    assert.doesNotThrow(function () {
      specimen('.foo, #bar');
    });
  });

  it('accepts an array argument', function () {
    assert.doesNotThrow(function () {
      specimen(['.foo', '.bar']);
    });
  });

  it('returns a valid array for valid arguments', function () {
    assert.deepEqual(specimen('.foo'), [0,0,1,0]);
    assert.deepEqual(specimen('.foo, div'), [ [0,0,1,0], [0,0,0,1] ]);
    assert.deepEqual(specimen(['.foo', 'div']), [ [0,0,1,0], [0,0,0,1] ]);
  });

  it('returns undefined for invalid arguments', function () {
    [
      {foo: 'bar'},
      42,
      true,
      null,
      undefined,
      /bob/,
      new Date(),
      new Error(),
      [NaN, false]
    ].forEach(function (type) {
      assert.strictEqual(specimen(type), undefined);
    });

    var result = specimen(['.foo', NaN, '.bar']);
    assert.deepEqual(result, [[0,0,1,0], undefined, [0,0,1,0]]);
  });
});
