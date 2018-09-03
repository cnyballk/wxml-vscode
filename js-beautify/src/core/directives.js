'use strict';

function Directives(start_block_pattern, end_block_pattern) {
  start_block_pattern =
    typeof start_block_pattern === 'string'
      ? start_block_pattern
      : start_block_pattern.source;
  end_block_pattern =
    typeof end_block_pattern === 'string'
      ? end_block_pattern
      : end_block_pattern.source;
  this.__directives_block_pattern = new RegExp(
    start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern,
    'g'
  );
  this.__directive_pattern = / (\w+)[:](\w+)/g;

  this.__directives_end_ignore_pattern = new RegExp(
    '(?:[\\s\\S]*?)((?:' +
      start_block_pattern +
      /\sbeautify\signore:end\s/.source +
      end_block_pattern +
      ')|$)',
    'g'
  );
}

Directives.prototype.get_directives = function(text) {
  if (!text.match(this.__directives_block_pattern)) {
    return null;
  }

  var directives = {};
  this.__directive_pattern.lastIndex = 0;
  var directive_match = this.__directive_pattern.exec(text);

  while (directive_match) {
    directives[directive_match[1]] = directive_match[2];
    directive_match = this.__directive_pattern.exec(text);
  }

  return directives;
};

Directives.prototype.readIgnored = function(input) {
  return input.read(this.__directives_end_ignore_pattern);
};

module.exports.Directives = Directives;
