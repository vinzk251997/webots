export default class WbSFColor {
  constructor(tokenizer) {
    try {
      const r = tokenizer.nextToken().toDouble();
      const g = tokenizer.nextToken().toDouble();
      const b = tokenizer.nextToken().toDouble();
      this._value = {r: r, g: g, b: b};
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected floating point value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
