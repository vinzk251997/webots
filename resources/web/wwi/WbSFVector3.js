export default class WbSFVector3 {
  constructor(tokenizer) {
    try {
      console.log('consuming: ' + tokenizer.peekWord());
      const x = tokenizer.nextToken().toDouble();
      console.log('consuming: ' + tokenizer.peekWord());
      const y = tokenizer.nextToken().toDouble();
      console.log('consuming: ' + tokenizer.peekWord());
      const z = tokenizer.nextToken().toDouble();
      this._value = {x: x, y: y, z: z};
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected floating point value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
