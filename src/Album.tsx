import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './App';

interface Props {
}
interface State {
}

class Album extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (<div id="album">
            <nav>
                <Link to="/">
                    <img className="logo" src="./assets/collectio.svg" alt="Collectio" />
                </Link>
            </nav>
            <div className="albums">test</div>
        </div>);
    }
}

export default withRouter(Album);