import WbToken, {isSpace, isPunctuation} from './WbToken.js';

export default class WbTokenizer {
  constructor(stream) {
    this._index = 0;
    this._char = '';
    this._vector = [];
    this._stream = stream;
    this._streamPos = 0;
    this._line = 1;
    this._column = 0;
    this._tokenLine = 1;
    this._tokenColumn = -1;
    this._atEndPos = false;
  }

  tokenize() {
    try {
      while (1) {
        const word = this.readWord();
        const token = new WbToken(word, this._tokenLine, this._tokenColumn);
        this._vector.push(token);
      }
    } catch (e) {
      console.error(e.message);
    }

    return this._vector;
  };

  skipWhiteSpace() {
    while (isSpace(this._char) || this._char === '#') {
      // skip comments
      if (this._char === '#') {
        this._char = this.readChar();
        while (this._char !== '\n')
          this._char = this.readChar();
      } else
        this._char = this.readChar();
    }
  };

  readChar() {
    console.log(this._atEnd())
    if (this._atEnd()) {
      if (!this._atEndPos) {
        this._atEndPos = true;
        return '\n';
      }
      throw new Error('attempting to readChar beyond the end of the stream');
    }

    const c = this._stream[this._streamPos];
    this._streamPos++;
    this._column++;

    if (c === '\n') {
      this._line++;
      this._column = 0;
    }

    return c;
  };

  readLine() {
    this._line++;
    this._column = 0;
    const ix = this._stream.indexOf('\n', this._streamPos);
    this._streamPos = ix !== -1 ? ix + 1 : this._streamPos; // update stream position if found

    return ix !== -1 ? this._stream.substring(this._streamPos, ix) : '';
  };

  readWord() {
    this.skipWhiteSpace();

    let word = this._char;
    console.log('starting word with letter: ' + word)
    this._markTokenStart();

    // handle string literals
    if (this._char === '"') {
      this._char = this.readChar();
      // find closing double quote
      while (this._char !== '"') {
        if (this._char === '\\') {
          this._char = this.readChar();
          if (this._char === 'n') // '\n' is allowed to create new line in SFString
            word += '\\';
          else if (this._char !== '\\' && this._char !== '"') // only allowed to escape double quotes and backslash
            throw new Error('invalid escaped character at line ' + this._line + ' column ' + this._column + '.');
        }
        if (this._char === '\n') {
          this._char = '"';
          throw new Error('unclosed string literal.');
        }
        word += this._char;
        this._char = this.readChar();
      }
      word += this._char;
      this._char = this.readChar();
      return word;
    }

    // TODO: tokenize template

    // handle "[]{}"
    if (isPunctuation(this._char)) {
      this._char = this.readChar();
      return word;
    }

    this._char = this.readChar();

    while (!isSpace(this._char) && !isPunctuation(this._char) && this._char !== '#') {
      word += this._char;
      this._char = this.readChar();
    }

    return word;
  };

  _markTokenStart() {
    this._tokenLine = this._line;
    this._tokenColumn = this._column;
  };

  _atEnd() {
    return this._streamPos >= this._stream.length - 1;
  };
}
