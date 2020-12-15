
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
import Photo from './Photo';
import Select from './Select';

interface App {
}

interface Props {
}
interface State {
    albums: AlbumType[]
}


class App extends React.Component<Props, State> {
    constructor(props: ReactPropTypes) {
        super(props);
        this.state = {
            albums: []
        };
    }
    setAlbums(album: AlbumType) {
        this.state.albums.push(album);
        this.setState({});
    }
    render() {
        return (<Router>
            <Switch>
                <Route exact path="/" render={() => <Home albums={this.state.albums} setAlbums={this.setAlbums.bind(this)} />} />
                <Route path="/album" render={() => <Album />} />
                <Route path="/photo" render={() => <Photo />} />
                <Route path="/select" render={() => <Select />} />
            </Switch>
        </Router>);
    }
}
export default App;