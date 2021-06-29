import {webots} from './webots.js';

function init() {  
  const view = new webots.View(document.getElementById('view3d'));
  view.openProto('test.x3d');
}

init();
