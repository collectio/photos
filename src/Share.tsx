import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './@types/index';

interface Share {
    textArea: any
}
interface Props {
}
interface State {
    photos: PhotoType[]
}

interface ShareData {
    text?: string;
    title?: string;
    url?: string;
    files?: File[];
}

function dataURLtoFile(dataurl: string, filename: string) {
    var arr = dataurl.split(','),
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);

        var mime;
        var m = arr[0]
        if (m) {
            var mi = m.match(/:(.*?);/)
            if (mi) mime = mi[1]
        }
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}


class Share extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.textArea = null
        try {
            const {photos} = this.props.location.state as any
            this.state = {
                photos: photos
            };
        } catch {
            alert('ホームに戻ります。\n理由:ブラウザのリロード、フリック操作での戻るなど。')
            this.props.history.push('/')
            location.reload()
        }
    }
    // async convertFile(url: string) {
    //     const blob = await fetch(url).then(res => res.blob())
    //     console.log(blob.type)
    //     return new File([blob], 'test.jpg',{ type: blob.type })
    // }
    setTextInputRef(element: any) {
        this.textArea = element;
    }
    async share() {
        let files: File[] = []
        await this.state.photos.map(async (photo) => {
            const file = dataURLtoFile(photo.image, 'test.jpg')
            files.push(file)
        })
        console.log(files)
        if (navigator.share) {
            navigator.share({
                text: this.textArea.value,
                url: 'https://collectio.jp/',
                files: files
              } as ShareData).then(() => {
                console.log('Share was successful.')
              }).catch((error) => {
                console.log('Sharing failed', error)
              })
        } else {
            alert('このブラウザではシェア機能が使えません。\n最新のSafari, Chromeをお使いください。')
        }
    }
    render() {
        const {album} = this.props.location.state as any
        return (<div id="share">
            <nav>
                <Link to={{
                    pathname: "/album",
                    state: { album: album }
                }} className="close">
                    <img className="logo" src="./assets/back.svg" alt="戻る" />
                </Link>
            </nav>
            <div className="photos">
                {this.state.photos.map((photo: PhotoType, index: number) => {
                    return (<div className={'photo'} style={{backgroundImage: `url(${photo.image})`}}>
                    </div>);
                })}
            </div>
            <textarea name="comment" id="comment" ref={this.setTextInputRef.bind(this)} placeholder="ゲームを遊んだ感想など"></textarea>
            <button onClick={this.share.bind(this)}>共有</button>
        </div>);
    }
}

export default withRouter(Share);