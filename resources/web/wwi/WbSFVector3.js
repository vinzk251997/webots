export default class WbSFVector3 {
  constructor(tokenizer) {
    try {
      const x = tokenizer.nextToken().toDouble();
      const y = tokenizer.nextToken().toDouble();
      const z = tokenizer.nextToken().toDouble();
      this._value = {x: x, y: y, z: z};
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected floating point value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
