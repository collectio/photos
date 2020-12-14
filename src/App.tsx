
import React, { ReactPropTypes } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './Home';

interface App {
}

export interface Album {
    title: string
    date: string
    photos: Photo[]
}
export interface Photo {
    image: string
    game: Game
}
export interface Game {
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
            <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/about">About</Link>
                    </li>
                    <li>
                    <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
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