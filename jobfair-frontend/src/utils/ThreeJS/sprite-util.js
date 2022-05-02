import * as THREE from 'three';

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export const makeTextSprite = (message, parameters) => {
  const padding = parameters?.padding ?? { top: 0, right: 30, bottom: 0, left: 30 };
  const borderRadius = parameters?.borderRadius ?? 10;
  const fontFace = parameters?.fontFace ?? 'Arial';
  const fontsize = parameters?.fontsize ?? 18;
  const borderThickness = parameters?.borderThickness ?? 4;
  const borderColor = parameters?.borderColor ?? { r: 0, g: 0, b: 0, a: 1.0 };
  const backgroundColor = parameters?.backgroundColor ?? { r: 255, g: 255, b: 255, a: 1.0 };
  const textColor = parameters?.textColor ?? { r: 0, g: 0, b: 0, a: 1.0 };

  const canvas = document.createElement('canvas');
  canvas.width =
    (getTextWidth(message, `Bold ${fontsize}px ${fontFace}`) + borderThickness) * 1.1 + padding.left + padding.right;

  const context = canvas.getContext('2d');
  context.font = `bold ${fontsize}px ${fontFace}`;
  const metrics = context.measureText(message);
  const textWidth = metrics.width;

  context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
  context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`;

  context.lineWidth = borderThickness;
  roundRect(
    context,
    borderThickness / 2,
    borderThickness / 2,
    textWidth + borderThickness + padding.right + padding.left,
    fontsize * 1.4 + borderThickness,
    borderRadius
  );

  context.fillStyle = `rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, 1.0)`;
  context.fillText(message, borderThickness + padding.left, fontsize + borderThickness);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  if (parameters.position) sprite.position.set(parameters.position.x, parameters.position.y, parameters.position.z);
  sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
  return sprite;
};
