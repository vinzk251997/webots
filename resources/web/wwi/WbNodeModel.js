import WbTokenizer from './WbTokenizer.js';

export default class WbNodeModel {
  constructor(modelName) {
    console.log('constructor WbNodeModel');

    const wrlFileName = '../../nodes/' + modelName + '.wrl';
    console.log('wrlFileName: ' + wrlFileName);

    const tokens = readModel();
    console.log(tokens);
  };

  readModel(model) {
    const tokenizer = new WbTokenizer(model);
    return tokenizer.tokenize();
  };

  loadWrl(fileContent) {
    return fileContent;
  }
};
