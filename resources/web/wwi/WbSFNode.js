export default class WbSFNode {
  constructor(tokenizer) {
    try {
      console.log('TODO: implement WbSFNode');
      console.log('consuming: ' + tokenizer.peekWord());
      const a = tokenizer.nextToken();
      this._value = 1;
    } catch (e) {
      tokenizer.ungetToken(); // unexpected token: keep the tokenizer coherent
      throw new Error('Expected node value, found ' + tokenizer.nextWord() + '.');
    }
  };
};
