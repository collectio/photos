import React from "react";
import {Link} from "react-router-dom";
import EXIF from 'exif-js';

import {AlbumType, PhotoType, GameType} from './@types/index';


interface Home {
    input: HTMLInputElement | null
}

interface Props {
    albums: AlbumType[]
    setAlbums: Function
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

class Home extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
        this.input = null;
    }
    setInputRef(element: HTMLInputElement) {
        this.input = element;
    }
    loadImage() {
        if (this.input && this.input.files) {
            let reader:any = null;
            let photos: PhotoType[] = [];
            Array.from(this.input.files).map((file: any) => {
                reader = new FileReader();
                reader.onload = async (e:any) => {
                    photos.push({
                        image: await this.resizeImage(e.target.result) as string,
                        game: {
                            id: null,
                            title: ''
                        }
                    });
                    if (this.input?.files?.length === photos.length) {
                        const album: AlbumType = {
                            title: 'ある日のボードゲーム会',
                            date: '2020/12/13',
                            photos: photos
                        }
                        this.props.setAlbums(album)
                    }
                    //回転対応 ,  回転具合を見てlabelを回転
                    // const arrayBuffer = base64ToArrayBuffer(reader.result);
                    // const exif = EXIF.readFromBinaryFile(arrayBuffer);
                    // console.log(exif)
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
                reader.readAsDataURL(file)
            });
        }
    }

    resizeImage(base64: string) {
        return new Promise((resolve, reject) => {
            const MIN_SIZE = 1024
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (ctx) {
                const img = new Image();
                img.crossOrigin = 'Anonymous'
                img.onload = (event) => {
                    const image = event.target as HTMLImageElement
                    let dstWidth, dstHeight
                    if (image.width > image.height) {
                        dstWidth = MIN_SIZE;
                        dstHeight = image.height * MIN_SIZE / image.width
                    } else {
                        dstHeight = MIN_SIZE;
                        dstWidth = image.width * MIN_SIZE / image.height
                    }
                    canvas.width = dstWidth
                    canvas.height = dstHeight
                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, dstWidth, dstHeight)
                    resolve(canvas.toDataURL())
                }
                img.src = base64
            } else {
                reject()
            }
        })
    }

    componentDidMount() {
        if (this.input) {
            this.input.addEventListener('change', this.loadImage.bind(this));
        }
    }
    render() {
        return (<div id="home">
            <nav>
                <Link to="/">
                    <img className="logo" src="./assets/collectio.svg" alt="Collectio" />
                </Link>
            </nav>
            <div className="albums">
            {this.props.albums.map((album) => {
                return (<Link to={{
                    pathname: "/album",
                    state: { album: album }
                }} key={album.title+album.date}>
                    <div className="album">
                        <h4>{album.title}</h4>
                        <span>{album.date}</span>
                        <div className="photos">
                        {album.photos.map((photo) => {
                            return (<div key={photo.image} className="photo" style={{backgroundImage: `url(${photo.image})`}}></div>)
                        })}
                        </div>
                    </div>
                </Link>)
            })}
            </div>
            <form action="" encType="multipart/form-data">
                <input className="file" id="file" type="file" name="file" accept="image/*" multiple={true} ref={this.setInputRef.bind(this)} />
                <label htmlFor="file"></label>
            </form>
        </div>);
    }
}

export default Home;