import EXIF from 'exif-js';

const input:any = document.getElementById('image1');
const label:any = document.querySelector('label');

const base64ToArrayBuffer = (base64:any) => {
  base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

let reader:any = null;
input.addEventListener('change', () => {
  if (input.files && input.files[0]) {
    reader = new FileReader();
    reader.onload = (e:any) => {
      label.style.backgroundImage = `url(${e.target.result})`;

      //回転対応 ,  回転具合を見てlabelを回転
      // const arrayBuffer = base64ToArrayBuffer(reader.result);
      // const exif = EXIF.readFromBinaryFile(arrayBuffer);
      // let rotate = 0;
      // if (exif && exif.Orientation) {
      //     console.log(exif.Orientation)
      //   switch (exif.Orientation) {
      //     case 3:
      //       rotate = 180;
      //       break;
      //     case 6:
      //       rotate = 90;
      //       break;
      //     case 8:
      //       rotate = -90;
      //       break;
      //   }
      // }
      // label.style.transform = `rotate(${rotate}deg)`;
      // label.style.webkitTransform = `rotate(${rotate}deg)`;
    }
    reader.readAsDataURL(input.files[0]);
  }
});