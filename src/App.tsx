import firebase, { db } from './index'
import React, { ReactPropTypes } from "react";
import {
    BrowserRouter as Router,
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

    async updateAlbum(album: AlbumType): Promise<void> {
        const docRef = db.collection('albums').doc(album.id)
        await docRef.update(album).then(() => {
            let updateIndex = 0
            this.state.albums.forEach((a, index) => {
                if (a.id === album.id) updateIndex = index
            })
            this.state.albums[updateIndex] = album
            this.setState({})
        }).catch((error) => console.log(error))
    }

    setGame(game: GameType): void {
        this.setState({game})
    }

    render() {
        return (<Router>
            <Switch>
                <Route exact path="/" render={() => <Home {...this.state}
                    setUser={this.setUser.bind(this)}
                    setAlbum={this.setAlbum.bind(this)}
                    addAlbums={this.addAlbums.bind(this)}
                    setGame={this.setGame.bind(this)}
                />} />
                <Route path="/album" render={() => <Album {...this.state} key={Date.now()}
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