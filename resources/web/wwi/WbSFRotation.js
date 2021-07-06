export default class WbSFRotation {
  constructor(tokenizer) {
    try {
      const x = tokenizer.nextToken().toDouble();
      const y = tokenizer.nextToken().toDouble();
      const z = tokenizer.nextToken().toDouble();
      const angle = tokenizer.nextToken().toDouble();
      this._value = {x: x, y: y, z: z, angle: angle};
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected floating point value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
