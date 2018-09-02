'use strict';

var js_beautify = require('./javascript/index.js');
var css_beautify = require('./css/index');
var html_beautify = require('./html/index');

function style_html(html_source, options, js, css) {
  js = js || js_beautify;
  css = css || css_beautify;
  return html_beautify(html_source, options, js, css);
}
var a = `
    <button id="a" class="b" title="c" data-a="d">1 </button>
`;
const test = () => {
  var b = style_html(a, {
    indent_size: 2,
    wrap_attributes: 'force-expand-multiline',
  });
  console.log('\n');
  console.log(b);
  console.log('\n');
};
test();
module.exports.js = js_beautify;
module.exports.css = css_beautify;
module.exports.html = style_html;
