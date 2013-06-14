# specimen

A CSS [selector specificity](http://www.w3.org/TR/css3-selectors/#specificity)
calculator.

# usage

```js
npm install specimen
```

```js
var specimen = require('specimen');

specimen('#home #warning p.message');
//=> [0, 2, 1, 1]
```

```js
specimen('#home #warning p.message, .footer a[rel=me]:hover');
//=> [ [0,2,1,1], [0,0,3,1] ]

specimen([
  '#home #warning p.message',
  '.footer a[rel=me]:hover'
]);
//=> [ [0,2,1,1], [0,0,3,1] ]
```

# api

## specimen(selectors)

Calculates the specificity of one or more CSS selectors. The `selectors`
argument is a string containing one or more selectors, or an array of selector
strings.

Returns an array representing the specificity, or `undefined` if a non-string
was given.

For multiple selectors, whether passed as string or array, an array of
specificities is returned. Returns `undefined` if all values in the array would
have been `undefined`.

# specimen's specificity

Specificity is represented as a four element array where each element
corresponds to a selector category.

The selector categories are, in order of most to least specific:

- **i:** inline styles
- **a:** IDs
- **b:** classes, attributes & psuedo-classes
- **c:** elements & pseudo-elements

## how it works

A a selector is split up into chunks and sorted into selector categories. The
categories are tallied, and the result is specificity: `[i, a, b, c]`.

```js
specimen('#home #warning p.message');
//=> [0, 2, 1, 1]
```

# style="!important"

Specimen calculates selector specificity only; it cannot know the specificity
of inline styles. It also cannot account for the use of `!important`.

# gigo

Specimen will attempt to calculate the CSS selector specificty of _any string_.
A result of `[0, 0, 0, 0]` means the string is probably not a CSS selector, or
contains only the universal selector `"*"` which has no affect on specificity.

# credits

Specimen is based heavily on
[keeganstreet/specificity](https://github.com/keeganstreet/specificity).

I needed a small specificity module for another project and Keegan Street's
`specificity` fit the bill perfectly. But I also needed a small project to help
curb my fear of programming. I decided I didn't need the additional information
that `specificity` provides. I settled on a simpler API and `specimen` was born.
