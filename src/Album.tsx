import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";

import {PhotoType} from './@types/index';


interface Props {
}
interface State {
}

class Album extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }
    // delete() {
    //     const {album} = this.props.location.state as any
    //     if (this.state.selectedImageIndex.length === 0) return alert('写真を選択してください')
    //     const photos = album.photos.filter((photo: PhotoType, index: number) => this.state.selectedImageIndex.indexOf(index) === -1)
    //     album.photos = photos
    // }
    render() {
        try {
            const {album} = this.props.location.state as any
            return (<div id="album">
                <nav>
                    <Link to="/">
                        <img className="logo" src="./assets/back.svg" alt="戻る" />
                    </Link>
                    <span></span>
                    <span onClick={() => alert('アルバムのタイトル編集・アルバムの削除機能などがくる予定')}>
                        <img src="./assets/menu.svg" alt="menu"/>
                    </span>
                </nav>
                <div className="album">
                    <div className="hero">
                        <h4>{album.title}</h4>
                        <span>{album.date}</span>
                        <div className="cover" style={{backgroundImage: `url(${album.photos[0].image})`}}></div>
                    </div>
                    <div className="actions">
                        <Link to={{
                            pathname: "/select",
                            state: { album: album }
                        }} className="add">
                            遊んだゲーム
                        </Link>
                        <Link to={{
                            pathname: "/albumSelect",
                            state: { album: album }
                        }} className="share">
                            シェア
                        </Link>
                    </div>
                    <div className="photos">
                        {album.photos.map((photo: PhotoType, index: number) => {
                            return (<Link to={{
                                pathname: "/photo",
                                state: { album: album, photo: photo }
                            }} key={photo.image}>
                                <div className="photo" style={{backgroundImage: `url(${photo.image})`}}></div>
                            </Link>);
                        })}
                    </div>
                </div>
            </div>);
        } catch {
            alert('ホームに戻ります。\n理由:ブラウザのリロード、フリック操作での戻るなど。')
            this.props.history.push('/')
            location.reload()
        }
    }
}

export default withRouter(Album);