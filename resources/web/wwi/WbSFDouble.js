export default class WbSFDouble {
  constructor(tokenizer) {
    try {
      this._value = tokenizer.nextToken().toDouble();
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected floating point value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
