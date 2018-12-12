import { saveSvgAsPng } from 'save-svg-as-png'

export default function exportToPNG(name) {

  saveSvgAsPng(document.querySelector('svg'), name + '.png');
}
