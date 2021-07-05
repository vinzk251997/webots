import WbNode from './WbNode.js'
import {getAnId} from './nodes/utils/utils.js';

export default class WbBaseNode extends WbNode {
  constructor(modelName, tokenizer) {
    console.log('constructor WbBaseNode');
    super(modelName, tokenizer);
  }
};
