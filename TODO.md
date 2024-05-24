PDF export:

- ensure chart order is preserved
- find a better way to handle chart conversion
  => currently relying on a DOM node (the div with id="pdf-image-element"; this is required by the html2cavas, read https://stackoverflow.com/a/65632648) acting as a placeholder that gets populated dynamically with the charts corresponding to the user selection)
- selection design: user should be able to select each chart one by one ? or based on (sub-)category only ? or else?
- make TreeSelect choices dynamic based on the current view (currently hardcoded based on Alcohol)
- make backend trigger ONLY when user press the "save" button (?)
- comment box field: make it expand based on its content rather than having a fixed height (content wont be displayed if too long)