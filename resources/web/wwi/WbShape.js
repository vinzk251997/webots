import WbBaseNode from './WbBaseNode.js';
import {getAnId} from './nodes/utils/utils.js';

export default class WbShape extends WbBaseNode {
  constructor(tokenizer) {
    console.log('constructor WbShape');
    super('Shape', tokenizer);
  }
};
