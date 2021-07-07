import WbNodeModel from './WbNodeModel.js';
import WbField from './WbField.js';

export default class WbNode {
  constructor(modelName, tokenizer) {
    console.log('constructor WbNode for node: ' + modelName);
    this._fields = [];

    const nodeModel = new WbNodeModel(modelName);
    console.log(nodeModel.fieldModels());

    // create field from model
    const fieldModels = nodeModel.fieldModels();
    for (let i = 0; i < fieldModels; ++i)
      this._fields.push(new WbField(fieldModels[i], this));

    this.readFields(tokenizer);
  }

  readFields(tokenizer) {
    tokenizer.skipToken('{');

    while (tokenizer.peekWord() !== '}') {
      const word = tokenizer.nextWord();

      let field = this.findField(word);
      if (typeof field === 'undefined')
        tokenizer.skipField();
      else {
        if (tokenizer.peekWord() === 'IS') {
          tokenizer.skipToken('IS');
          const alias = tokenizer.nextWord();
          field.setAlias(alias);
          this.copyAliasValue(field, alias);
        } else
          this.readFieldValue(field, tokenizer);
      }
    }

    tokenizer.skipToken('}');
  };

  findField(fieldName) {
    for (let i = 0; i < this._fields.length; ++i) {
      if (fieldName === this._fields[i].name())
        return this._fields[i];
    }
  };

  readFieldValue(field, tokenizer) {
    if (field.name() === 'boundingObject')
      console.log('found boundingObject in readFieldValue. How to handle?');

    field.readValue(tokenizer);
  };

  copyAliasValue(field, alias) {
    console.log('TODO: defined copyAliasValue in WbNode.');
  }
};
