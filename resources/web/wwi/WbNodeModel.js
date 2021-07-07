import WbTokenizer from './WbTokenizer.js';
import WbFieldModel from './WbFieldModel.js';

export default class WbNodeModel {
  constructor(modelName) {
    console.log('constructor WbNodeModel');
    this._fieldModels = [];

    const wrlFileName = '../../nodes/' + modelName + '.wrl';

    const request = new XMLHttpRequest();
    request.open('GET', wrlFileName, false); // 'false' makes the request synchronous
    request.send(null);

    if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
      console.log(request.responseText);
      const tokenizer = new WbTokenizer(request.responseText);
      tokenizer.tokenize();
      console.log(tokenizer.tokens());

      tokenizer.rewind();
      tokenizer.skipToken(modelName);
      tokenizer.skipToken('{');

      while (tokenizer.peekWord() !== '}') {
        const model = new WbFieldModel(tokenizer);
        // fieldModel.ref();
        this._fieldModels.push(model);
      }

      tokenizer.skipToken('}'); // ensure file ends correctly
    }
  };

  fieldModels() {
    return this._fieldModels;
  };
};
