export default class WbSFInt {
  constructor(tokenizer) {
    try {
      this._value = tokenizer.nextToken().toInt();
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected integer value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
