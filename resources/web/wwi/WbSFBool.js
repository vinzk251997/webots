export default class WbSFBool {
  constructor(tokenizer) {
    try {
      this._value = tokenizer.nextToken().toBool();
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected boolean value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
