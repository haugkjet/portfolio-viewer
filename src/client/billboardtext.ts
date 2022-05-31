import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/* Todo old style JS */
function initbillboardtext(scene: THREE.Scene) {
  var spritey = makeTextSprite(" Hello ", {
    fontsize: 15,
    textColor: { r: 255, g: 255, b: 255, a: 1.0 },
  });
  spritey.position.set(3, 5, 2.7);
  scene.add(spritey);

  var spritey2 = makeTextSprite(" World ", {
    fontsize: 10,
    textColor: { r: 255, g: 255, b: 255, a: 1.0 },
  });
  spritey2.position.set(3, 5, 2.0);
  scene.add(spritey2);

  function makeTextSprite(message: any, parameters: any) {
    if (parameters === undefined) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface")
      ? parameters["fontface"]
      : "Courier New";
    var fontsize = parameters.hasOwnProperty("fontsize")
      ? parameters["fontsize"]
      : 18;
    var borderThickness = parameters.hasOwnProperty("borderThickness")
      ? parameters["borderThickness"]
      : 4;
    var borderColor = parameters.hasOwnProperty("borderColor")
      ? parameters["borderColor"]
      : { r: 0, g: 0, b: 0, a: 1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor")
      ? parameters["backgroundColor"]
      : { r: 0, g: 0, b: 255, a: 1.0 };
    var textColor = parameters.hasOwnProperty("textColor")
      ? parameters["textColor"]
      : { r: 0, g: 0, b: 0, a: 1.0 };

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    if (context) {
      context.font = "Bold " + fontsize + "px " + fontface;
      var metrics = context.measureText(message);
      var textWidth = metrics.width;

      context.fillStyle =
        "rgba(" +
        backgroundColor.r +
        "," +
        backgroundColor.g +
        "," +
        backgroundColor.b +
        "," +
        backgroundColor.a +
        ")";
      context.strokeStyle =
        "rgba(" +
        borderColor.r +
        "," +
        borderColor.g +
        "," +
        borderColor.b +
        "," +
        borderColor.a +
        ")";
      context.fillStyle =
        "rgba(" +
        textColor.r +
        ", " +
        textColor.g +
        ", " +
        textColor.b +
        ", 1.0)";
      context.fillText(message, borderThickness, fontsize + borderThickness);
    }

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      //useScreenCoordinates: false /* TS error, need to fix*/
    });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1.5 * fontsize, 1.25 * fontsize, 1.75 * fontsize);
    return sprite;
  }
}

export { initbillboardtext };
