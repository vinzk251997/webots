export default class WbSFString {
  constructor(tokenizer) {
    try {
      this._value = tokenizer.nextToken().toString();
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected string value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
