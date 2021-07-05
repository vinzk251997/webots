import {M_PI_4} from './nodes/utils/constants.js';
import WbAbstractAppearance from './nodes/WbAbstractAppearance.js';
import WbAppearance from './nodes/WbAppearance.js';
import WbBackground from './nodes/WbBackground.js';
import WbBillboard from './nodes/WbBillboard.js';
import WbBox from './nodes/WbBox.js';
import WbCapsule from './nodes/WbCapsule.js';
import WbCone from './nodes/WbCone.js';
import WbCylinder from './nodes/WbCylinder.js';
import WbDirectionalLight from './nodes/WbDirectionalLight.js';
import WbElevationGrid from './nodes/WbElevationGrid.js';
import WbFog from './nodes/WbFog.js';
import WbGeometry from './nodes/WbGeometry.js';
import WbGroup from './nodes/WbGroup.js';
import WbImage from './nodes/WbImage.js';
import WbImageTexture from './nodes/WbImageTexture.js';
import WbIndexedFaceSet from './nodes/WbIndexedFaceSet.js';
import WbIndexedLineSet from './nodes/WbIndexedLineSet.js';
import WbLight from './nodes/WbLight.js';
import WbMaterial from './nodes/WbMaterial.js';
import WbPBRAppearance from './nodes/WbPBRAppearance.js';
import WbPlane from './nodes/WbPlane.js';
import WbPointLight from './nodes/WbPointLight.js';
import WbPointSet from './nodes/WbPointSet.js';
import WbScene from './nodes/WbScene.js';
import WbShape from './nodes/WbShape.js';
import WbSphere from './nodes/WbSphere.js';
import WbSpotLight from './nodes/WbSpotLight.js';
import WbTextureTransform from './nodes/WbTextureTransform.js';
import WbTransform from './nodes/WbTransform.js';
import WbVector2 from './nodes/utils/WbVector2.js';
import WbVector3 from './nodes/utils/WbVector3.js';
import WbVector4 from './nodes/utils/WbVector4.js';
import WbViewpoint from './nodes/WbViewpoint.js';
import WbWorld from './nodes/WbWorld.js';
import {getAnId} from './nodes/utils/utils.js';

import DefaultUrl from './DefaultUrl.js';
import loadHdr from './hdr_loader.js';
import {webots} from './webots.js';

//import WbParser from './WbParser.js';
import WbTokenizer from './WbTokenizer.js';
//  import WbNodeReader from './WbNodeReader.js';
import WbConcreteNodeFactory from './WbConcreteNodeFactory.js';

/*
  This module takes an x3d world, parse it and populate the scene.
*/
export default class ProtoParser {
  constructor(prefix = '') {
    this._prefix = '../wwi/images/post_processing/';
    WbWorld.init();
  }

  async parse(text, renderer, parent, callback) {
    this._setupWorldInfo('NUE');
    this._setupViewpoint();
    this._setupBackground();
    await this._setupScene();

    /*
    // define shape
    let pbrAppearance;
    const size = new WbVector3(1, 1, 1);
    const box = new WbBox(getAnId(), size);
    WbWorld.instance.nodes.set(box.id, box);

    const castShadows = true;
    const isPickable = true;
    const geometry = box;
    const shape = new WbShape(getAnId(), castShadows, isPickable, geometry, pbrAppearance);
    shape.parent = undefined;
    WbWorld.instance.nodes.set(shape.id, shape);

    // push top level nodes
    WbWorld.instance.sceneTree.push(shape);
    */

    //console.log(text);

    //const protoName = text.match(/(?<=PROTO\s)(\w+)(?=\s\[)/g)[0];
    //console.log(protoName)

    const indexBeginHeader = text.search(/(?<=\n|\n\r)(PROTO)(?=\s\w+\s\[)/g);
    const indexBeginBody = text.search(/(?<=\]\s*\n*\r*)({)/g);

    const protoHeader = text.substring(indexBeginHeader, indexBeginBody -1 )
    const protoBody = text.substring(indexBeginBody);
    //const protoBody = '  Shape {\n  geometry Box {\n size 1 1 1\n name "solid"\n children [ \n radius 1 2 # its comment \n    ]\n }\n }\n';
    console.log('Header: \n' + protoHeader)
    console.log('Body: \n' + protoBody)

    const tokenizer = new WbTokenizer(protoBody);
    const tokens = tokenizer.tokenize();
    console.log(tokens);
    
    tokenizer.rewind();
    tokenizer.nextToken(); // skip '{'
    const modelName = tokenizer.nextWord();
    console.log('modelName: ' + modelName);

    let nodeFactory = new WbConcreteNodeFactory();
    nodeFactory.createNode(modelName, tokenizer);

    if (document.getElementById('webotsProgressMessage'))
      document.getElementById('webotsProgressMessage').innerHTML = 'Finalizing...';

    WbWorld.instance.viewpoint.finalize();

    WbWorld.instance.sceneTree.forEach(node => {
      console.log(node);
      node.finalize();
    });

    renderer.render();
    if (document.getElementById('webotsProgress'))
      document.getElementById('webotsProgress').style.display = 'none';
  }

  _setupWorldInfo(coordinateSystem) {
    WbWorld.instance.coordinateSystem = coordinateSystem;
    WbWorld.computeUpVector();
  }

  _setupViewpoint() {
    const fieldOfView = M_PI_4;
    const orientation = new WbVector4(-0.84816706, -0.5241698, -0.07654181, 0.34098753);
    const position = new WbVector3(-1.2506319, 2.288824, 7.564137);
    const exposure = 1;
    const bloomThreshold = 21;
    const zNear = 0.05;
    const zFar = 0;
    const followSmoothness = 0.5;
    const followedId = undefined;
    const ambientOcclusionRadius = 2;
    WbWorld.instance.viewpoint = new WbViewpoint(getAnId(), fieldOfView, orientation, position, exposure, bloomThreshold, zNear, zFar, followSmoothness, followedId, ambientOcclusionRadius);
  }

  async _setupBackground() {
    const skyColor = new WbVector3(0.15, 0.45, 1);
    const background = new WbBackground(getAnId(), skyColor);
    WbWorld.instance.nodes.set(background.id, background);
    WbBackground.instance = background;
    WbWorld.instance.sceneTree.push(background);
  }

  async _setupScene() {
    const smaaAreaTexture = await ProtoParser.loadTextureData(this._prefix, 'smaa_area_texture.png');
    smaaAreaTexture.isTranslucent = false;
    const smaaSearchTexture = await ProtoParser.loadTextureData(this._prefix, 'smaa_search_texture.png');
    smaaSearchTexture.isTranslucent = false;
    const gtaoNoiseTexture = await ProtoParser.loadTextureData(this._prefix, 'gtao_noise_texture.png');
    gtaoNoiseTexture.isTranslucent = true;
    WbWorld.instance.scene = new WbScene(smaaAreaTexture, smaaSearchTexture, gtaoNoiseTexture);
  }

  // TODO: duplicated in Parser
  static async loadTextureData(prefix, url, isHdr, rotation) {
    const canvas2 = document.createElement('canvas');
    const context = canvas2.getContext('2d');

    const image = new WbImage();
    if (typeof prefix !== 'undefined' && !url.startsWith('https://raw.githubusercontent.com'))
      url = prefix + url;
    if (isHdr) {
      const img = await ProtoParser.loadHDRImage(url);
      image.bits = img.data;
      image.width = img.width;
      image.height = img.height;
      image.url = url;
      if (typeof rotation !== 'undefined')
        image.bits = rotateHDR(image, rotation);
    } else {
      const img = await ProtoParser.loadImage(url);
      canvas2.width = img.width;
      canvas2.height = img.height;
      if (typeof rotation !== 'undefined') {
        context.save();
        context.translate(canvas2.width / 2, canvas2.height / 2);
        context.rotate(rotation * Math.PI / 180);
        context.drawImage(img, -canvas2.width / 2, -canvas2.height / 2);
        context.restore();
      } else
        context.drawImage(img, 0, 0);

      const dataBGRA = context.getImageData(0, 0, img.width, img.height).data;
      let data = new Uint8ClampedArray(dataBGRA.length);
      data = dataBGRA;

      image.bits = data;
      image.width = img.width;
      image.height = img.height;
      image.url = url;
    }
    return image;
  }

  // TODO: duplicated in Parser
  static loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => console.log('Error in loading : ' + src);
      img.setAttribute('crossOrigin', '');
      img.src = src;
    });
  }

  static loadHDRImage(src) {
    return new Promise((resolve, reject) => {
      loadHdr(src, function(img) { resolve(img); });
    });
  }
}

// TODO: duplicated in Parser
function rotateHDR(image, rotate) {
  let rotatedbits = [];
  if (rotate === 90) {
    for (let x = 0; x < image.width; x++) {
      for (let y = 0; y < image.height; y++) {
        const u = y * image.width * 3 + x * 3;
        const v = (image.width - 1 - x) * image.height * 3 + y * 3;
        for (let c = 0; c < 3; c++)
          rotatedbits[u + c] = image.bits[v + c];
      }
    }
    const swap = image.width;
    image.width = image.height;
    image.height = swap;
  } else if (rotate === -90) {
    for (let x = 0; x < image.width; x++) {
      for (let y = 0; y < image.height; y++) {
        const u = y * image.width * 3 + x * 3;
        const v = x * image.width * 3 + (image.height - 1 - y) * 3;
        for (let c = 0; c < 3; c++)
          rotatedbits[u + c] = image.bits[v + c];
      }
    }
    const swap = image.width;
    image.width = image.height;
    image.height = swap;
  } else if (rotate === 180) {
    for (let x = 0; x < image.width; x++) {
      for (let y = 0; y < image.height; y++) {
        const u = y * image.width * 3 + x * 3;
        const v = (image.height - 1 - y) * image.width * 3 + (image.width - 1 - x) * 3;
        for (let c = 0; c < 3; c++)
          rotatedbits[u + c] = image.bits[v + c];
      }
    }
  }
  return rotatedbits;
}
