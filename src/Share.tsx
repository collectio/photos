import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './@types/index';

interface Share {
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
    async convertFile(url: string) {
        const blob = await fetch(url).then(res => res.blob())
        return new File([blob], "Filename",{ type: "image/jpg" })
    }
    share() {
        // const file = dataURLtoFile(this.state.photos[0].image, 'test.jpg')
        let files: File[] = []
        this.state.photos.map(async (photo) => {
            const file = await this.convertFile(photo.image)
            files.push(file)
        })
        if (navigator.share) {
            navigator.share({
                text: 'Web Share API level2のテストです',
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
        return (<div id="" onClick={this.share.bind(this)}>share</div>);
    }
}

export default withRouter(Share);