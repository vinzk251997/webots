export default class WbSFNode {
  constructor(tokenizer) {
    try {
      console.log('TODO: implement WbSFNode')
      this._value = undefined;
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected node value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
