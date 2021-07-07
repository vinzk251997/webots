export default class WbField {
  constructor(model, parentNode) {
    this._model = model;
    this._value = model.defaultValue();
    this._parentNode = parentNode;
    this._wasRead = false;
  }

  name() {
    return this._model.name();
  };

  readValue(tokenizer) {
    if (this._wasRead)
      throw new Error('Duplicate field value.');

    console.log('TODO: CONTINUE FROM HERE');
    /*
    this._value->read(tokenizer, worldPath);

    this._wasRead = true;
    if (tokenizer.hasRestrictedValues())
      tokenizer.checkValueIsAccepted();
    */
  }

  setAlias(alias) {
    console.log('TODO: define setAlias in WbField.');
  };
};
