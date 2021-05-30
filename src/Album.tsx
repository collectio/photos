import firebase, { db } from './index'

import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";

import { AlbumType, GameType, PhotoType } from './@types/index';


interface Props {
    user: any
    album: AlbumType | null
    albums: AlbumType[]
    game: GameType | null
    setGame: (game: GameType) => void
}
interface State {
}

class Album extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        scrollTo(0, 0)
    }
    // delete() {
    //     const {album} = this.props.location.state as any
    //     if (this.state.selectedImageIndex.length === 0) return alert('写真を選択してください')
    //     const photos = album.photos.filter((photo: PhotoType, index: number) => this.state.selectedImageIndex.indexOf(index) === -1)
    //     album.photos = photos
    // }
    render() {
        // const { album } = this.props.location.state as any
        const album = this.props.album
        if(album === null) {
            this.props.history.push('/')
            location.reload()
            return
        }
        return (<div id="album">
            <nav>
                <Link to="/">
                    <img className="logo" src="./assets/back.svg" alt="戻る" />
                </Link>
                <span></span>
                <span onClick={() => alert('アルバムのタイトル編集・アルバムの削除機能などがくる予定')}>
                    <img src="./assets/menu.svg" alt="menu" />
                </span>
            </nav>
            <div className="album">
                <div className="hero">
                    <h4>{album.title}</h4>
                    <span>{album.date}</span>
                    <div className="cover" style={{ backgroundImage: `url(${album.photos[0].image})` }}></div>
                </div>
                <div className="actions">
                    <h4>遊んだゲーム</h4>
                    {album.id==='sample' ? (
                        <a onClick={() => alert('サンプルのため、シェアできません。')} className="share">
                            シェア
                        </a>
                    ) : (
                        <Link to={{
                            pathname: "/shareSelect",
                            state: { album: album }
                        }} className="share">
                            シェア
                        </Link>
                    )}
                </div>
                <div className="games">
                    {album.games.map((game: GameType, i: number) => {
                        return <Link to={{
                            pathname: "/game",
                            state: { game: game }
                        }} key={game.id} onClick={() => this.props.setGame(game)}>
                            <div key={'game' + i} className="game">
                                <div style={{ backgroundImage: `url(${game.image})` }}></div>
                                <span className="title">
                                    {game.title}
                                </span>
                            </div>
                        </Link>
                    })}
                    {album.id==='sample' ? (
                        <a onClick={() => alert('サンプルのため、ゲームは追加できません。')} className="add">
                        +
                        </a>
                    ) : (
                        <Link to="/select" className="add">+</Link>
                    )}
                </div>
                <div className="photos">
                    {album.photos.map((photo: PhotoType, index: number) => {
                        return (<Link to={{
                            pathname: "/photo",
                            state: { album: album, photo: photo }
                        }} key={photo.image}>
                            <div className="photo" style={{ backgroundImage: `url(${photo.image})` }}></div>
                        </Link>);
                    })}
                </div>
            </div>
        </div>);
    }
}

export default withRouter(Album);