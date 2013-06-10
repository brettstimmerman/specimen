# specimen

CSS selector [specificity](http://www.w3.org/TR/css3-selectors/#specificity)
calculator.

# usage

```js
var specimen = require('specimen');

specimen('#home #warning p.message');
//=> [0, 2, 1, 1]
```

# api

## specimen(selectors)

Compute the specificity of one or more CSS selectors.

* `selectors` {String|Array} CSS selectors

Specimen represents specificity as a four element array. Each element in the
array corresponds to a selector category: `[i, a, b, c]`

The categories are, in order of most to least specific:

- **i:** inline styles
- **a:** IDs
- **b:** classes, attributes & psuedo-classes
- **c:** elements & pseudo-elements

If multiple selectors are given, an array of individual specificities is
returned. E.g., `[ [0,0,0,1], [0,0,1,3] ]`

# style="!important"

Specimen only computes selector specificity; it cannot compute the specificity
of inline styles or account for the use of `!important`.

# credits

Specimen is a based heavily on
[keeganstreet/specificity](https://github.com/keeganstreet/specificity).

I needed a small specificity module for another project. Keegan Street's
`specificity` fit the bill perfectly. But I also needed a small project to help
curb my fear of programming. I decided I didn't need the additional information
that `specificity` provides. I settled on a simpler API and `specimen` was born.
