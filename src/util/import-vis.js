import { saveSvgAsPng } from 'save-svg-as-png'

export default function exportToPNG(name) {

  saveSvgAsPng(document.querySelector('svg'), name + '.png');

//   Print telkens maar een deel van het svg af om een of andere reden
//   let s = new XMLSerializer();
//   let html = document.querySelector('svg');
//   const imagesrc = 'data:image/svg+xml;base64,'+ window.btoa(s.serializeToString(html));
//
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//
//   const image = new Image();
//   image.src = imagesrc;
//   image.onload = function load() {
//     context.drawImage(image, 0, 0);
//
//     const canvasdata = canvas.toDataURL('image/png');
//     const a = document.createElement('a');
//     a.download = 'grafiek.png';
//     a.href = canvasdata;
//     document.body.appendChild(a);
//     a.click();
//   };
}
