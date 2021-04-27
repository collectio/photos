import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";

import {AlbumType, PhotoType, GameType} from './@types/index';


interface Props {
    user: any
    album: AlbumType | null
    albums: AlbumType[]
    game: GameType | null
    setGame: (game: GameType) => void
}
interface State {
    selectedImageIndex: number[]
    selectDisabled: boolean
}

class Album extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedImageIndex: [],
            selectDisabled: false,
        };
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
    share() {
        const {album} = this.props.location.state as any
        if (this.state.selectedImageIndex.length === 0) return alert('写真を選択してください')
        const photos = album.photos.filter((photo: PhotoType, index: number) => this.state.selectedImageIndex.indexOf(index) > -1)
        this.props.history.push({
            pathname: "/share",
            state: { photos: photos, album: album }
        })
    }
    // delete() {
    //     const {album} = this.props.location.state as any
    //     if (this.state.selectedImageIndex.length === 0) return alert('写真を選択してください')
    //     const photos = album.photos.filter((photo: PhotoType, index: number) => this.state.selectedImageIndex.indexOf(index) === -1)
    //     album.photos = photos
    //     this.setState({selectedImageIndex: []})
    // }
    render() {
        // const {album} = this.props.location.state as any
        const album = this.props.album
        if (album === null) {
            this.props.history.push('/')
            location.reload()
            return
        }
        return (<div id="albumSelect">
            <nav>
                <Link to={{
                    pathname: "/album",
                    state: { album: album }
                }}>
                    <img className="logo" src="./assets/back.svg" alt="戻る" />
                </Link>
                <span>写真の選択</span>
                <span></span>
            </nav>
            <div className="album">
                <div className="photos">
                    {album.photos.map((photo: PhotoType, index: number) => {
                        return (<div className={'photo' + (this.state.selectDisabled ? ' disabled' : '')} onClick={this.select.bind(this, index)} style={{backgroundImage: `url(${photo.image})`}}>
                            <span className={'select' + (this.state.selectedImageIndex.indexOf(index) > -1 ? ' selected' : '')}></span>
                        </div>);
                    })}
                </div>
                <div className="bottomActions">
                    <span className="share" onClick={this.share.bind(this)}>次へ</span>
                </div>
            </div>
        </div>);
    }
}

export default withRouter(Album);