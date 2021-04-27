
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
import AlbumSelect from './AlbumSelect';
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
    albums: AlbumType[]
}


class App extends React.Component<Props, State> {
    constructor(props: ReactPropTypes) {
        super(props);
        this.state = {
            user: null,
            albums: [],
        };
    }

    setUser(user) {
        this.setState({user})
    }

    addAlbums(album: AlbumType) {
        this.state.albums.unshift(album)
        this.setState({})
    }

    render() {
        return (<Router>
            <Switch>
                <Route exact path="/" render={() => <Home
                    user={this.state.user}
                    albums={this.state.albums}
                    setUser={this.setUser.bind(this)}
                    addAlbums={this.addAlbums.bind(this)}
                />} />
                <Route path="/album" render={() => <Album
                    user={this.state.user}
                />} />
                <Route path="/albumSelect" render={() => <AlbumSelect />} />
                <Route path="/game" render={() => <Game />} />
                <Route path="/photo" render={() => <Photo />} />
                <Route path="/select" render={() => <Select />} />
                <Route path="/share" render={() => <Share />} />
            </Switch>
        </Router>);
    }
}
export default App;