'use strict';

var InputScanner = require('../core/inputscanner').InputScanner;
var Token = require('../core/token').Token;
var TokenStream = require('../core/tokenstream').TokenStream;

var TOKEN = {
  START: 'TK_START',
  RAW: 'TK_RAW',
  EOF: 'TK_EOF',
  CLOSE: 'TK_TAG_CLOSE',
  OPEN: 'TK_TAG_OPEN',
};

var Tokenizer = function(input_string, options) {
  this._input = new InputScanner(input_string);
  this._options = options || {};
  this.__tokens = null;
  this.__newline_count = 0;
  this.__whitespace_before_token = '';

  this._whitespace_pattern = /[\n\r\t ]+/g;
  this._newline_pattern = /([^\n\r]*)(\r\n|[\n\r])?/g;
};

Tokenizer.prototype.tokenize = function() {
  this._input.restart();
  this.__tokens = new TokenStream();

  this._reset();
  var current;
  var previous = new Token(TOKEN.START, '');
  var open_token = null;
  var open_stack = [];
  var comments = new TokenStream();
  while (previous.type !== TOKEN.EOF) {
    current = this._get_next_token(previous, open_token);

    while (this._is_comment(current)) {
      comments.add(current);
      current = this._get_next_token(previous, open_token);
    }

    if (!comments.isEmpty()) {
      current.comments_before = comments;
      comments = new TokenStream();
    }

    current.parent = open_token;
    if (this._is_opening(current)) {
      open_stack.push(open_token);
      open_token = current;
    } else if (open_token && this._is_closing(current, open_token)) {
      current.opened = open_token;
      open_token.closed = current;
      open_token = open_stack.pop();
      current.parent = open_token;
    }
    //有点小问题  暂时不弄先了
    // if (
    //   previous.type === TOKEN.CLOSE &&
    //   previous.text !== '/>' &&
    //   current.type === TOKEN.OPEN &&
    //   current.text.substr(0, 2) === '</'
    // ) {
    //   previous.text = '/>';
    //   current = this._get_next_token(current, open_token);
    //   if (open_token && this._is_closing(current, open_token)) {
    //     current.opened = open_token;
    //     open_token.closed = current;
    //     open_token = open_stack.pop();
    //     current.parent = open_token;
    //   }
    //   current = this._get_next_token(current, open_token);
    //   if (this._is_opening(current)) {
    //     open_stack.push(open_token);
    //     open_token = current;
    //   }
    // }
    current.previous = previous;
    previous.next = current;
    this.__tokens.add(current);
    previous = current;

    // if (current.type === 'TK_TAG_CLOSE' && previous.text === '/>')
  }
  return this.__tokens;
};

Tokenizer.prototype._is_first_token = function() {
  return this.__tokens.isEmpty();
};

Tokenizer.prototype._reset = function() {};

Tokenizer.prototype._get_next_token = function(previous_token, open_token) {
  // jshint unused:false
  this._readWhitespace();
  var resulting_string = this._input.read(/.+/g);
  if (resulting_string) {
    return this._create_token(TOKEN.RAW, resulting_string);
  } else {
    return this._create_token(TOKEN.EOF, '');
  }
};

Tokenizer.prototype._is_comment = function(current_token) {
  // jshint unused:false
  return false;
};

Tokenizer.prototype._is_opening = function(current_token) {
  // jshint unused:false
  return false;
};

Tokenizer.prototype._is_closing = function(current_token, open_token) {
  // jshint unused:false
  return false;
};

Tokenizer.prototype._create_token = function(type, text) {
  var token = new Token(
    type,
    text,
    this.__newline_count,
    this.__whitespace_before_token
  );
  this.__newline_count = 0;
  this.__whitespace_before_token = '';
  return token;
};

Tokenizer.prototype._readWhitespace = function() {
  var resulting_string = this._input.read(this._whitespace_pattern);
  if (resulting_string === ' ') {
    this.__whitespace_before_token = resulting_string;
  } else if (resulting_string !== '') {
    this._newline_pattern.lastIndex = 0;
    var nextMatch = this._newline_pattern.exec(resulting_string);
    while (nextMatch[2]) {
      this.__newline_count += 1;
      nextMatch = this._newline_pattern.exec(resulting_string);
    }
    this.__whitespace_before_token = nextMatch[1];
  }
};

module.exports.Tokenizer = Tokenizer;
module.exports.TOKEN = TOKEN;
