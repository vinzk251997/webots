import WbNodeModel from './WbNodeModel.js';

export default class WbNode {
  constructor(modelName, tokenizer) {
    console.log('constructor WbNode');

    const nodeModel = new WbNodeModel(modelName);
    console.log(nodeModel);
  }
};
