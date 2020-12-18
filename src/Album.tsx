import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";

import {AlbumType, PhotoType, GameType} from './@types/index';


interface Props {
}
interface State {
    selectMode: boolean
    selectedImageIndex: number[]
    selectDisabled: boolean
}

class Album extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectMode: false,
            selectedImageIndex: [],
            selectDisabled: false
        };
    }
    selectMode() {
        this.setState({selectMode: true})
    }
    select(index: number) {
        if (this.state.selectedImageIndex.indexOf(index) === -1) {
            if (this.state.selectDisabled === false) {
                this.state.selectedImageIndex.push(index)
            }
        } else {
            this.state.selectedImageIndex.splice(this.state.selectedImageIndex.indexOf(index), 1)
            this.setState({selectDisabled: false})
        }
        if (this.state.selectedImageIndex.length >= 4) {
            this.setState({selectDisabled: true})
        }
        this.setState({})
    }
    render() {
        try {
            const {album} = this.props.location.state as any
            return (<div id="album">
                <nav>
                    <Link to="/">
                        <img className="logo" src="./assets/collectio.svg" alt="Collectio" />
                    </Link>
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
                        <span className="select" onClick={this.selectMode.bind(this)}>選択</span>
                        <Link to={{
                            pathname: "/share",
                            state: { photos: album.photos }
                        }} className="share">共有</Link>
                    </div>
                    <div className="photos">
                        {album.photos.map((photo: PhotoType, index: number) => {
                            if (!this.state.selectMode) {
                                return (<Link to={{
                                    pathname: "/photo",
                                    state: { album: album, photo: photo }
                                }} key={photo.image}>
                                    <div className="photo" style={{backgroundImage: `url(${photo.image})`}}></div>
                                </Link>);
                            } else {
                                return (<div className={'photo' + (this.state.selectDisabled ? ' disabled' : '')} onClick={this.select.bind(this, index)} style={{backgroundImage: `url(${photo.image})`}}>
                                    <span className={'select' + (this.state.selectedImageIndex.indexOf(index) > -1 ? ' selected' : '')}></span>
                                </div>);
                            }
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