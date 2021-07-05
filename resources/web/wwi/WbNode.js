import WbNodeModel from './WbNodeModel.js';

export default class WbNode {
  constructor(modelName, tokenizer) {
    console.log('constructor WbNode');

    this._model = new WbNodeModel(modelName);
  }
};
