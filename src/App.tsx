
import React, { ReactPropTypes } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './Home';
import Album from './Album';

interface App {
}

export interface AlbumType {
    title: string
    date: string
    photos: PhotoType[]
}
export interface PhotoType {
    image: string
    game: GameType
}
export interface GameType {
    id: number | null
    title: string
}

interface Props {
}
interface State {
    albums: Album[]
}


class App extends React.Component<Props, State> {
    constructor(props: ReactPropTypes) {
        super(props);
        this.state = {
            albums: []
        };
    }
    setAlbums(album: Album) {
        this.state.albums.push(album);
        this.setState({});
    }
    render() {
        return (<Router>
            <Switch>
                <Route path="/" render={() => <Home albums={this.state.albums} setAlbums={this.setAlbums.bind(this)} />} />
                <Route path="/about">
                </Route>
                <Route path="/users">
                    Users
                </Route>
            </Switch>
        </Router>);
    }
}
export default App;