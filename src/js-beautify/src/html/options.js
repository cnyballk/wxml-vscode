'use strict';

var BaseOptions = require('../core/options').Options;

function Options(options) {
  BaseOptions.call(this, options, 'html');

  this.indent_inner_html = this._get_boolean('indent_inner_html');
  this.indent_body_inner_html = this._get_boolean(
    'indent_body_inner_html',
    true
  );
  this.indent_head_inner_html = this._get_boolean(
    'indent_head_inner_html',
    true
  );

  this.indent_handlebars = this._get_boolean('indent_handlebars', true);
  this.wrap_attributes = this._get_selection('wrap_attributes', [
    'auto',
    'force',
    'force-aligned',
    'force-expand-multiline',
    'aligned-multiple',
  ]);
  this.wrap_attributes_indent_size = this._get_number(
    'wrap_attributes_indent_size',
    this.indent_size
  );
  this.wrap_attributes_count = this._get_number(
    'wrap_attributes_count',
    this.wrap_attributes_count
  );
  this.extra_liners = this._get_array('extra_liners', [
    'head',
    'body',
    '/html',
  ]);

  this.inline = this._get_array('inline', [
    // https://www.w3.org/TR/html5/dom.html#phrasing-content
    'a',
    'abbr',
    'area',
    'audio',
    'b',
    'bdi',
    'bdo',
    'br',
    'button',
    'canvas',
    'cite',
    'code',
    'data',
    'datalist',
    'del',
    'dfn',
    'em',
    'embed',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'map',
    'mark',
    'math',
    'meter',
    'noscript',
    'object',
    'output',
    'progress',
    'q',
    'ruby',
    's',
    'samp',
    /* 'script', */ 'select',
    'small',
    'span',
    'strong',
    'sub',
    'sup',
    'svg',
    'template',
    'textarea',
    'time',
    'u',
    'var',
    'video',
    'wbr',
    'text',
    // prexisting - not sure of full effect of removing, leaving in
    'acronym',
    'address',
    'big',
    'dt',
    'ins',
    'strike',
    'tt',
  ]);
  this.void_elements = this._get_array('void_elements', [
    // HTLM void elements - aka self-closing tags - aka singletons
    // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
    // NOTE: Optional tags are too complex for a simple list
    // they are hard coded in _do_optional_end_element

    // Doctype and xml elements
    '!doctype',
    '?xml',
    // ?php and ?= tags
    '?php',
    '?=',
    // other tags that were in this list, keeping just in case
    'basefont',
    'isindex',
  ]);
  this.unformatted = this._get_array('unformatted', []);
  this.content_unformatted = this._get_array('content_unformatted', [
    'pre',
    'textarea',
  ]);
  this.indent_scripts = this._get_selection('indent_scripts', [
    'normal',
    'keep',
    'separate',
  ]);
}
Options.prototype = new BaseOptions();

module.exports.Options = Options;
