export default class WbToken {
  constructor(word, line, column) {
    this._word = word;
    this._line = line;
    this._column = column;

    const w0 = word[0];
    const NUMERIC_CHARS = '+-0123456789.';

    if (word === 'end of file')
      this.type = WbToken.TYPES.END;
    else if (word.startsWith('"') && word.endsWith('"'))
      this.type = WbToken.TYPES.STRING;
    else if (word.startsWith('%<') && word.endsWith('>%'))
      this.type = WbToken.TYPES.TEMPLATE_STATEMENT;
    else if (NUMERIC_CHARS.includes(w0))
      this.type = isNaN(Number(word)) ? WbToken.TYPES.INVALID : WbToken.TYPES.NUMERIC;
    else if (this._isKeyword(word))
      this.type = WbToken.TYPES.KEYWORD;
    else if (this._isValidIdentifier(word))
      this.type = WbToken.TYPES.IDENTIFIER;
    else if (word.length === 1 && isPunctuation(w0))
      this.type = WbToken.TYPES.PUNCTUATION;
    else
      this.type = WbToken.TYPES.INVALID;
  };

  word() {
    return this._word;
  };

  line() {
    return this._line;
  };

  column() {
    return this._column;
  };

  _isKeyword(word) {
    return WbToken.KEYWORDS.includes(word);
  };

  _isValidIdentifierChar(c, pos) {
    const v = c.charCodeAt();
    if (v <= 0x20 || v === 0x22 || v === 0x23 || v === 0x27 || v === 0x2c || v === 0x2e || v === 0x5b || v === 0x5c || v === 0x5d || v === 0x7b || v === 0x7d)
      return false;

    if (pos === 0 && v >= 0x30 && v <= 0x39)
      return false;

    return true;
  };

  _isValidIdentifier(word) {
    if (word === '')
      return false;

    for (let i = 0; i < word.length; ++i) {
      if (!this._isValidIdentifierChar(word[i], i))
        return false;
    }

    return !this._isKeyword(word);
  };
};

function isSpace(c) {
  return c === '' || c === ' ' || c === '\n' || c === '\r' || c === '\r\n' || c === '\t' || c === ',';
};

function isPunctuation(c) {
  return '{}[]'.includes(c);
};

WbToken.TYPES = {
  INVALID: 0,
  STRING: 1,
  IDENTIFIER: 2,
  KEYWORD: 3,
  NUMERIC: 4,
  PUNCTUATION: 5,
  TEMPLATE_STATEMENT: 6,
  END: 7
};

WbToken.KEYWORDS = [
  'field',
  'vrmlField',
  'hiddenField',
  'deprecatedField',
  'DEF',
  'USE',
  'PROTO',
  'IS',
  'TRUE',
  'FALSE',
  'NULL',
  'MFBool',
  'SFBool',
  'SFColor',
  'MFColor',
  'SFFloat',
  'MFFloat',
  'SFInt32',
  'MFInt32',
  'SFNode',
  'MFNode',
  'SFRotation',
  'MFRotation',
  'SFString',
  'MFString',
  'SFVec2f',
  'MFVec2f',
  'SFVec3f',
  'MFVec3f'
];

export {isSpace, isPunctuation};
