import WbToken from './WbToken.js';
import WbSFString from './WbSFString.js';
import WbSFInt from './WbSFInt.js';
import WbSFDouble from './WbSFDouble.js';
import WbSFVector2 from './WbSFVector2.js';
import WbSFVector3 from './WbSFVector3.js';
import WbSFColor from './WbSFColor.js';
import WbSFNode from './WbSFNode.js';
import WbSFBool from './WbSFBool.js';
import WbSFRotation from './WbSFRotation.js';

export default class WbFieldModel {
  constructor(tokenizer) {
    let nw = tokenizer.nextWord();
    const fieldTypes = ['field', 'vrmlField', 'hiddenField', 'hidden', 'deprecatedField', 'unconnectedField'];
    if (!fieldTypes.includes(nw))
      throw new Error('Expected field type but found ' + nw + '.');

    this._isVrml = nw === 'vrmlField';
    this._isDeprecated = nw === 'deprecatedField';
    this._isHiddenField = this._isDeprecated || nw === 'hiddenField';
    this._isHiddenParameter = nw === 'hidden';
    this._isUnconnected = nw === 'unconnectedField';
    this._isTemplateRegenerator = false;

    let typeName;
    if (this._isHiddenParameter) {
      nw = tokenizer.peekWord();

      if (nw.startsWith('rotation'))
        typeName = 'SFRotation';
      else if (nw.startsWith('translation'))
        typeName = 'SFVec3f';
      else if (nw.startsWith('position')) // position or position2 or position3
        typeName = 'SFFloat';
      else if (nw.startsWith('linearVelocity'))
        typeName = 'SFVec3f';
      else if (nw.startsWith('angularVelocity'))
        typeName = 'SFVec3f';
      else
        throw new Error('Expected hidden field identifier but found ' + nw + '.');
    } else
      typeName = tokenizer.nextWord();

    if (tokenizer.nextWord() === '{') {
      console.log('TODO: entered a TODO in WbFieldModel.');
      // TODO
      // const singleTypeName = typeName.replace('MF', 'SF');
      // this._acceptedValues = this.getAcceptedValues(singleTypeName, tokenizer);
    } else
      tokenizer.ungetToken();

    // copy the token, indeed, the pointer reference can be deleted by the tokenizer
    const nt = tokenizer.nextToken();
    this._nameToken = new WbToken(nt.word(), nt.line(), nt.column());
    this._name = this._nameToken.word();
    this._defaultValue = this.createValueForVrmlType(typeName, tokenizer);
    if (typeof this._defaultValue === 'undefined')
      throw new Error('Expected VRM97 type but found ' + typeName + '.');

    if (this.hasRestrictedValues()) {
      // TODO
    }
  };

  createValueForVrmlType(type, tokenizer) {
    if (type === 'SFString')
      return new WbSFString(tokenizer);
    else if (type === 'SFInt32')
      return new WbSFInt(tokenizer);
    else if (type === 'SFFloat')
      return new WbSFDouble(tokenizer);
    else if (type === 'SFVec2f')
      return new WbSFVector2(tokenizer);
    else if (type === 'SFVec3f')
      return new WbSFVector3(tokenizer);
    else if (type === 'SFColor')
      return new WbSFColor(tokenizer);
    else if (type === 'SFNode')
      return new WbSFNode(tokenizer);
    else if (type === 'SFBool')
      return new WbSFBool(tokenizer);
    else if (type === 'SFRotation')
      return new WbSFRotation(tokenizer);

    if (type.startsWith('MF')) {
      console.log('TODO: MF not implemented yet in WbFieldModel');
    }

    /*
    else if (type === 'MFString')
      return new WbMFString(tokenizer);
    else if (type === 'MFInt32')
      return new WbMFInt(tokenizer);
    else if (type === 'MFFloat')
      return new WbMFDouble(tokenizer);
    else if (type === 'MFVec2f')
      return new WbMFVector2(tokenizer);
    else if (type === 'MFVec3f')
      return new WbMFVector3(tokenizer);
    else if (type === 'MFColor')
      return new WbMFColor(tokenizer);
    else if (type === 'MFNode')
      return new WbMFNode(tokenizer);
    else if (type === 'MFBool')
      return new WbMFBool(tokenizer);
    else if (type === 'MFRotation')
      return new WbMFRotation(tokenizer);
    else
      return undefined;
    */
  };

  hasRestrictedValues() {
    return typeof this._acceptedValues !== 'undefined' && this._acceptedValues.length > 0;
  };
};
