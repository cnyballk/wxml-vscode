'use strict';

var Beautifier = require('./beautifier').Beautifier;

function style_html(html_source, options, js_beautify, css_beautify) {
  var beautifier = new Beautifier(
    html_source,
    options,
    js_beautify,
    css_beautify
  );
  return beautifier.beautify();
}

module.exports = style_html;
