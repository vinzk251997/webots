export default class WbSFColor {
  constructor(tokenizer) {
    try {
      console.log('consuming: ' + tokenizer.peekWord());
      const r = tokenizer.nextToken().toDouble();
      console.log('consuming: ' + tokenizer.peekWord());
      const g = tokenizer.nextToken().toDouble();
      console.log('consuming: ' + tokenizer.peekWord());
      const b = tokenizer.nextToken().toDouble();
      this._value = {r: r, g: g, b: b};
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected floating point value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
