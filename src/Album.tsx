import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";

import {AlbumType, PhotoType, GameType} from './@types/index';


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
        const {album} = this.props.location.state as any
        return (<div id="album">
            <nav>
                <Link to="/">
                    <img className="logo" src="./assets/collectio.svg" alt="Collectio" />
                </Link>
            </nav>
            <div className="album">
                <div className="hero">
                    <h4>{album.title}</h4>
                    <span>{album.date}</span>
                    <div className="cover" style={{backgroundImage: `url(${album.photos[0].image})`}}></div>
                </div>
                <div className="actions">
                    <Link to="/select" className="add">
                        遊んだゲーム
                    </Link>
                </div>
                <div className="photos">
                    {album.photos.map((photo: PhotoType) => {
                        return (<Link to={{
                            pathname: "/photo",
                            state: { album: album, photo: photo }
                        }} key={photo.image}>
                            <div className="photo" style={{backgroundImage: `url(${photo.image})`}}></div>
                        </Link>);
                    })}
                </div>
            </div>
        </div>);
    }
}

export default withRouter(Album);