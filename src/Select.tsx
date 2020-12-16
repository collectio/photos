import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './@types/index';

import fetchJsonp from "fetch-jsonp";
import SimpleSlider from './Slider'

interface Select {
    textInput: any;
}
interface Suggest {
    title: string;
    year?: string;
}

interface Props {

}
interface State {
    loading: boolean
    album: AlbumType
    suggests: Suggest[]
}

class Select extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.textInput = null;
        const {album} = this.props.location.state as any
        this.state = {
            loading: false,
            album: album,
            suggests: [],
        };
    }
    componentDidMount() {
        if (this.textInput) this.textInput.focus();
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
        let mergedSuggests:Suggest[] = games.concat(suggests)
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
        const suggests: Suggest[] = [];
        r.map((game: Suggest) => {
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
    selectSuggest(suggest: Suggest) {
        this.state.album.photos[0].game.title = suggest.title;
        this.setState({suggests: []})
        this.textInput.value = ''
        this.textInput.focus()
    }
    render() {
        return (
            <div id="select">
                <SimpleSlider album={this.state.album} />
                <div className="photos">
                    {this.state.album.photos.map((photo: PhotoType) => {
                        return (<div key={photo.image} className="photo">
                            <img src={photo.image} />
                            <span>{photo.game.title ? photo.game.title : '遊んだゲーム未設定'}</span>
                        </div>);
                    })}
                </div>
                <form action="" onSubmit={this.onSearch.bind(this)}>
                    <input type="text" ref={this.setTextInputRef.bind(this)} onChange={this.onSearch.bind(this)} />
                    <button>検索</button>
                </form>
                {this.state.suggests.length===0 && this.state.loading ? (
                    <div className="suggests">読み込み中...</div>
                ) : null}
                {this.state.suggests.length > 0 ? (
                    <div className="suggests">
                    {this.state.suggests.slice(0, 10).map((suggest: Suggest, i: any) => {
                        return <div key={i} onClick={this.selectSuggest.bind(this, suggest)}>{suggest.title}</div>;
                    })}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default withRouter(Select);