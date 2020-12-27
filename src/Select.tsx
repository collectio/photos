import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './@types/index';

import fetchJsonp from "fetch-jsonp";
import SimpleSlider from './Slider'

interface Select {
    textInput: any;
}

interface Props {

}
interface State {
    loading: boolean
    album: AlbumType
    index: number
    suggests: GameType[]
    histories: GameType[]
}

class Select extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.textInput = null;
        try {
            const {album} = this.props.location.state as any
            this.state = {
                index: 0,
                loading: false,
                album: album,
                suggests: [],
                histories: []
            };
        } catch {
            this.props.history.push('/')
            location.reload()
            alert('ホームに戻ります。\n理由:ブラウザのリロード、フリック操作での戻るなど。')
        }
    }
    componentDidMount() {
        if (this.textInput) {
            this.textInput.addEventListener('focus', () => {
                scrollTo(0, 140)
            })
            this.textInput.focus()
        }
    }
    setTextInputRef(element: any) {
        this.textInput = element;
    }
    hiraToKana (str: string) {
        return str.replace(/[\u3041-\u3096]/g, function (match: any) {
          const chr = match.charCodeAt(0) + 0x60
          return String.fromCharCode(chr)
        })
    }
    async onSearch(event: any) {
        event.preventDefault();
        const query = this.textInput.value;
        if (query === '') return this.setState({suggests: []})
        let games = await this.search(query)
        this.setState({ loading: true })
        if (games.length === 0) {
            games = await this.search(this.hiraToKana(query))
        }
        const suggests = await this.suggest(query)
        this.setState({ loading: false })
        let mergedSuggests:GameType[] = games.concat(suggests)
        if (mergedSuggests.length === 0) {
            const suggest:any = {title: query}
            mergedSuggests = [suggest]
        }
        this.setState({ suggests: mergedSuggests });
    }
    async search(query: string) {
        const r = await fetch(
            "https://db-api-mxiq5qapta-an.a.run.app/search?q=" + encodeURIComponent(query)
        ).then((r) => r.json());
        const suggests: GameType[] = [];
        r.map((game: GameType) => {
            suggests.push(game)
        })
        return suggests;
    }
    async suggest(query: string) {
        const s = await fetchJsonp(
            "https://www.google.com/complete/search?hl=ja&client=firefox&q=" + encodeURIComponent(query)
        ).then((r) => r.json());
        const suggests: any[] = [];
        s[1].map((suggest: string) => {
            const data = {
                title: suggest,
            } 
            suggests.push(data);
        });
        return suggests
    }
    selectSuggest(suggest: GameType) {
        this.state.album.photos[this.state.index].game.title = suggest.title;
        this.state.histories.unshift(suggest)
        this.setState({suggests: []})
        this.textInput.value = ''
    }
    selectHistory(history: GameType) {
        this.state.album.photos[this.state.index].game.title = history.title;
        this.setState({suggests: []})
        this.textInput.value = ''
    }
    afterChange(index: number) {
        this.setState({index: index})
    }
    render() {
        return (
            <div id="select">
                <nav>
                    <Link to={{
                        pathname: "/album",
                        state: { album: this.state.album }
                    }} className="close">
                        <img src="./assets/close.svg" />
                    </Link>
                    <Link to="/">
                        <img className="logo" src="./assets/collectio.svg" alt="Collectio" />
                    </Link>
                </nav>
                <form action="" onSubmit={this.onSearch.bind(this)}>
                    <div className="bg">
                        <input type="text" ref={this.setTextInputRef.bind(this)} placeholder="ゲームを検索" onChange={this.onSearch.bind(this)} />
                        {this.state.histories.length > 0 ? (
                        <div className="histories">
                            {this.state.histories.map((history: GameType, i: number) => {
                                return <div key={'history'+i} onClick={this.selectHistory.bind(this, history)}>{history.title}</div>;
                            })}
                        </div>
                        ) : null}
                    </div>
                    {this.state.suggests.length===0 && this.state.loading ? (
                        <div className="suggests">読み込み中...</div>
                    ) : null}
                    {this.state.suggests.length > 0 ? (
                        <div className="suggests">
                        {this.state.suggests.slice(0, 100).map((suggest: GameType, i: number) => {
                            return <div key={'suggest'+i} onClick={this.selectSuggest.bind(this, suggest)}>{suggest.title}</div>;
                        })}
                        </div>
                    ) : null}
                </form>
                <SimpleSlider album={this.state.album} afterChange={this.afterChange.bind(this)} />
            </div>
        );
    }
}

export default withRouter(Select);