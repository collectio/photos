
import React, { ReactPropTypes } from "react";
import EXIF from 'exif-js';

interface App {
    form: HTMLFormElement | null
    input: HTMLInputElement | null
}
interface Props {
}
interface State {
}

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
  

class App extends React.Component<Props, State> {
    constructor(props: ReactPropTypes) {
        super(props);
        this.state = {
        };
        this.form = null;
        this.input = null;
    }
    setFormRef(element: HTMLFormElement) {
        console.log(element)
        this.form = element;
    }
    setInputRef(element: HTMLInputElement) {
        console.log(element)
        this.input = element;
    }
    componentDidMount() {
        let reader:any = null;
        if (this.input) {
            this.input.addEventListener('change', () => {
                if (this.input && this.input.files && this.input.files[0]) {
                    Array.from(this.input.files).map((file: any) => {
                        reader = new FileReader();
                        reader.onload = (e:any) => {
                            const label = document.createElement('label')
                            label.style.backgroundImage = `url(${e.target.result})`;
                            if (this.form) this.form.appendChild(label);
                            //回転対応 ,  回転具合を見てlabelを回転
                            const arrayBuffer = base64ToArrayBuffer(reader.result);
                            const exif = EXIF.readFromBinaryFile(arrayBuffer);
                            console.log(exif)
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
                        reader.readAsDataURL(file);
                    })
                }
            });
        }
    }
    render() {
        return (<div>
            <form action="" encType="multipart/form-data" ref={this.setFormRef.bind(this)}>
                <input className="file" id="image1" type="file" name="image1" accept="image/*" multiple={true} ref={this.setInputRef.bind(this)} />
            </form>
        </div>);
    }
}
export default App;