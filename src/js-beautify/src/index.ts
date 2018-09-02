'use strict';

var js_beautify = require('./javascript/index');
var css_beautify = require('./css/index');
var html_beautify = require('./html/index');

function style_html(html_source: any, options: any, js?: any, css?: any) {
  js = js || js_beautify;
  css = css || css_beautify;
  return html_beautify(html_source, options, js, css);
}
var a = `
    <button id="a" id="a"id="a"id="a" wx:for="{{a}}">11
   22 11<p id="c">11</p>111<p ></p>222</button>11
`;
const test = () => {
  var b = style_html(a, {
    indent_scripts: 'keep',
    indent_with_tabs: true,
    max_preserve_newlines: 1,
    preserve_newlines: true,
    indent_size: 2,
    wrap_attributes_count: 4,
    wrap_attributes: 'force-expand-multiline',
  });
  console.log('\n');
  console.log(b);
  console.log('\n');
};

test();

export default style_html;
