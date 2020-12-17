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
        return new File([blob], 'Filename',{ type: blob.type })
    }
    async share() {
        let files: File[] = []
        await this.state.photos.map(async (photo) => {
            const file = await this.convertFile(photo.image)
            files.push(file)
        })
        console.log(files)
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
        return (<div id="share" onClick={this.share.bind(this)}>share</div>);
    }
}

export default withRouter(Share);