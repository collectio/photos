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
        const {album} = this.props.location.state as any;
        return (<div id="album">
            <nav>
                <Link to="/">
                    <h4>{album.title}</h4>
                    <span>{album.date}</span>
                    <img className="logo" src="./assets/collectio.svg" alt="Collectio" />
                </Link>
            </nav>
            <div className="album">
                <img src={album.photos[0].image} alt=""/>
                <div className="photos">

                </div>
            </div>
        </div>);
    }
}

export default withRouter(Album);