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
    share() {
        let text = this.textArea.value
        const titles: string[] = ['\n']
        const files: File[] = []
        this.state.photos.map((photo) => {
            const file = dataURLtoFile(photo.image, 'test.jpg')
            files.push(file)
            if (photo.game && titles.indexOf(photo.game.title) === -1) titles.push('#' + photo.game.title)
        })
        text += titles.join(' ')
        // console.log(text)
        // console.log(files)
        if (navigator.share) {
            navigator.share({
                text: text,
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
                    pathname: "/albumSelect",
                    state: { album: album }
                }} className="back">
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
            <button onClick={this.share.bind(this)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19.067" height="24.245" viewBox="0 0 19.067 24.245"><path d="M.005-4.834a.855.855,0,0,0,.849-.838V-16.7L.79-18.315l.73.763,1.622,1.74a.784.784,0,0,0,.58.258.751.751,0,0,0,.784-.763.75.75,0,0,0-.247-.559l-3.631-3.5a.838.838,0,0,0-.623-.29.838.838,0,0,0-.623.29l-3.631,3.5a.76.76,0,0,0-.258.559.748.748,0,0,0,.773.763.79.79,0,0,0,.591-.258l1.633-1.74.73-.763L-.854-16.7V-5.672A.865.865,0,0,0,.005-4.834ZM-6.161,3.577H6.161c2.245,0,3.373-1.117,3.373-3.33V-10.474c0-2.213-1.128-3.33-3.373-3.33h-3v1.729H6.128a1.519,1.519,0,0,1,1.676,1.7V.15a1.519,1.519,0,0,1-1.676,1.7H-6.139A1.507,1.507,0,0,1-7.8.15V-10.377a1.507,1.507,0,0,1,1.665-1.7h2.976V-13.8h-3c-2.245,0-3.373,1.117-3.373,3.33V.247C-9.534,2.46-8.406,3.577-6.161,3.577Z" transform="translate(9.534 20.668)" /></svg>
                共有する
            </button>
        </div>);
    }
}

export default withRouter(Share);