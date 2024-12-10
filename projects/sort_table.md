[JC](/index.html) [Index](/index.html) [Projects](/projects.html) [Trips](/trips.html) [Notes](/notes.html) [Jacob](/about.html)

# `table_tools.js`

A fun little exercise in pure JavaScript. Parse a plain HTML table, process it, and rearrange instantly. I'm a big fan of [DigiKey](https://www.digikey.com/en/products/filter/transistors-fets-mosfets-single/278)'s parametric search.

## [DEMO 1](/notes/youtube_channels.html) / [DEMO 2](/projects/st-a410.html#parts)

## Features

- Sane sorting logic
- Search or min-max depending on column content
- Hide tools until tools button is clicked
- Instantly clear all filters
- Visual indicator of what columns are being manipulated
- Combine multiple filter/sort operations

## Use It

[Get the code](/assets/js/table_tools.js)

To use it, just add a `<div class="table-wrapper ttools">` wrapping your table element. To headers, specify data type using `datatype="alpha"` or `"numeric"`. That's it.

## Alternatives

Yes, I know there are many (probably more well-written) alternatives out there. Some older than time.
