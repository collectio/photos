import firebase, { db } from './index'

import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { AlbumType, PhotoType, GameType } from './@types/index';

import fetchJsonp from "fetch-jsonp";
// import SimpleSlider from './Slider'

interface Select {
    textInput: any;
}

interface Props {
    user: any
    album: AlbumType
    albums: AlbumType[]
    game: GameType | null
    updateAlbum: (album: AlbumType) => void
    setGame: (game: GameType) => void
}
interface State {
    loading: boolean
    album: AlbumType
    index: number
    suggests: GameType[]
    // histories: GameType[]
}

class Select extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        if (!this.props.album) {
            this.props.history.push('/')
            location.reload()
        }
        this.textInput = null;
        // const album = Object.assign({}, JSON.parse(JSON.stringify(this.props.album)))
        this.state = {
            index: 0,
            loading: false,
            album: this.props.album,
            suggests: [],
            // histories: []
        };
    }
    componentDidMount() {
        scrollTo(0, 0)
        if (this.textInput) {
            // this.textInput.addEventListener('focus', () => {
            //     scrollTo(0, 140)
            // })
            this.textInput.focus()
        }
        // インスタンスを立ち上げておく
        fetch('https://db-api-mxiq5qapta-an.a.run.app/search')
    }
    setTextInputRef(element: any) {
        this.textInput = element;
    }
    hiraToKana(str: string) {
        return str.replace(/[\u3041-\u3096]/g, function (match: any) {
            const chr = match.charCodeAt(0) + 0x60
            return String.fromCharCode(chr)
        })
    }
    async onSearch(event: any) {
        event.preventDefault();
        const query = this.textInput.value;
        if (query === '') return this.setState({ suggests: [] })
        let games = await this.search(query)
        this.setState({ loading: true })
        if (games.length === 0) {
            games = await this.search(this.hiraToKana(query))
        } else {
            this.setState({loading: false, suggests: games})
        }
        if (games.length <= 5) {
            const suggests = await this.suggest(query)
            games = games.concat(suggests)
        }
        this.setState({loading: false, suggests: games });
    }
    async search(query: string) {
        const r = await fetch(
            'https://db-api-mxiq5qapta-an.a.run.app/search?q=' + encodeURIComponent(query)
        ).then((r) => r.json());
        const suggests: GameType[] = [];
        r.map((game: GameType) => {
            suggests.push(game)
        })
        return suggests;
    }
    async suggest(query: string) {
        const s = await fetchJsonp(
            'https://www.google.com/complete/search?hl=ja&client=firefox&q=' + encodeURIComponent(query)
        ).then((r) => r.json());
        const suggests: any[] = [];
        s[1].map((suggest: string) => {
            const data = {
                id: null,
                title: suggest,
                image: null
            }
            suggests.push(data)
        })
        // 見つからなかった場合、検索キーワードを出す
        if (suggests.length===0) {
            const suggest: any = {
                id:null,
                title: query,
                image: null
            }
            suggests.push(suggest)
        }
        return suggests
    }
    async selectSuggest(suggest: GameType) {
        // データベースにあるゲームだったら画像を取得
        if (suggest.id) {
            const game = await fetch(`https://db.collectio.jp/wp-json/wp/v2/posts/${suggest.id}?_embed`).then((r) => r.json())
            const gameImage = game.featured_image.src
            if (gameImage !== 'https://db.collectio.jp/wp-includes/images/media/default.png') {
                suggest.image = gameImage
            } else {
                suggest.image = null
            }
            if (!this.state.album.games.some((game) => game.id === suggest.id)) {
                this.state.album.games.push(suggest)
            }
        } else {
            if (!this.state.album.games.some((game) => game.title === suggest.title)) {
                this.state.album.games.push(suggest)
            }
        }
        this.setState({ suggests: [] })
        this.textInput.value = ''
    }
    // afterChange(index: number) {
    //     this.setState({index: index})
    // }

    async updateAlbum() {
        const album = this.state.album
        this.props.updateAlbum(album)
        this.props.history.push(`/album/${album.id}`)
        // const docRef = await db.collection('albums').doc(album.id)
        // await docRef.update(album).then(() => {
        //     this.props.updateAlbum(album)
        //     this.props.history.push('/album')
        // }).catch((error) => console.log(error))
    }

    render() {
        return (
            <div id="select">
                <nav>
                    <a onClick={() => this.props.history.goBack()}>
                        <img className="logo" src="./assets/back.svg" alt="戻る" />
                    </a>
                    <a onClick={() => {
                        this.updateAlbum()
                    }}>
                        完了
                    </a>
                </nav>
                <form action="" onSubmit={this.onSearch.bind(this)}>
                    <div className="bg">
                        <input type="text" ref={this.setTextInputRef.bind(this)} placeholder="ゲームを検索" onChange={this.onSearch.bind(this)} />
                    </div>
                    {this.state.suggests.length === 0 && this.state.loading ? (
                        <div className="suggests">読み込み中...</div>
                    ) : null}
                    {this.state.suggests.length > 0 ? (
                        <div className="suggests">
                            {this.state.suggests.slice(0, 100).map((suggest: GameType, i: number) => {
                                return <div key={'suggest' + i} onClick={this.selectSuggest.bind(this, suggest)}>{suggest.title}</div>;
                            })}
                        </div>
                    ) : null}
                </form>
                {this.state.album.games.length > 0 ? (
                    <div className="games">
                        <h3>遊んだゲーム</h3>
                        {this.state.album.games.map((game: GameType, i: number) => {
                            return <Link to={{
                                pathname: "/game",
                                state: { game: game }
                            }} key={game.id} onClick={() => this.props.setGame(game)}>
                                <div key={'game' + i} className="game">
                                    {game.image ? (
                                        <img src={game.image} alt="" />
                                    ) : (
                                        <span className="image"></span>
                                    )}
                                    <span className="title">
                                        {game.title}
                                    </span>
                                </div>
                            </Link>
                        })}
                    </div>
                ) : null}
                {/* <SimpleSlider album={this.state.album} afterChange={this.afterChange.bind(this)} /> */}
            </div>
        );
    }
}

export default withRouter(Select);