

/*
var elem = document.querySelector('.grid');
var msnry = new Masonry( elem, {
  // options
  itemSelector: '.grid-item',
  columnWidth: 200
});

// element argument can be a selector string
//   for an individual element
var msnry = new Masonry( '.grid', {
  // options
});
alert("Hello World");

----------------- */
// external js: masonry.pkgd.js
window.onload = function () { alert("It's loaded!") }

var msnry = new Masonry( '.grid', {
  itemSelector: '.grid-item',
  columnWidth: 160,
  // disable initial layout
  initLayout: false
});
// add event listener for initial layout
msnry.on( 'layoutComplete', function( items ) {
  console.log( items.length );
});
// trigger initial
