
import React, { ReactPropTypes } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {AlbumType, PhotoType, GameType} from './@types/index';
import Home from './Home';
import Album from './Album';
import ShareSelect from './ShareSelect';
import Game from './Game';
import Photo from './Photo';
import Select from './Select';
import Share from './Share';

interface App {
}

interface Props {
}
interface State {
    user: any
    album: AlbumType | null
    albums: AlbumType[]
    game: GameType | null
}


class App extends React.Component<Props, State> {
    constructor(props: ReactPropTypes) {
        super(props);
        this.state = {
            user: null,
            album: null,
            albums: [],
            game: null
        };
    }

    setUser(user: any): void {
        this.setState({user})
    }

    setAlbum(album: AlbumType): void {
        this.setState({album})
    }

    addAlbums(album: AlbumType): void {
        this.state.albums.unshift(album)
        this.setState({})
    }

    updateAlbum(album: AlbumType): void {
        let updateIndex = 0
        this.state.albums.map((alb, index) => {
            if (alb.id === album.id) updateIndex = index
        })
        this.state.albums[updateIndex] = album
        this.setState({})
    }

    setGame(game: GameType): void {
        this.setState({game})
    }

    render() {
        return (<Router>
            <Switch>
                <Route exact path="/" render={() => <Home
                    user={this.state.user}
                    albums={this.state.albums}
                    setUser={this.setUser.bind(this)}
                    setAlbum={this.setAlbum.bind(this)}
                    addAlbums={this.addAlbums.bind(this)}
                    setGame={this.setGame.bind(this)}
                />} />
                <Route path="/album" render={() => <Album {...this.state}
                    setGame={this.setGame.bind(this)}
                />} />
                <Route path="/shareSelect" render={() => <ShareSelect {...this.state} />} />
                <Route path="/game" render={() => <Game {...this.state} />} />
                <Route path="/photo" render={() => <Photo {...this.state} />} />
                <Route path="/select" render={() => <Select {...this.state}
                    setGame={this.setGame.bind(this)}
                    updateAlbum={this.updateAlbum.bind(this)}
                />} />
                <Route path="/share" render={() => <Share {...this.state} />} />
            </Switch>
        </Router>);
    }
}
export default App;