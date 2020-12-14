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
                    <img className="logo" src="./assets/collectio.svg" alt="Collectio" />
                </Link>
            </nav>
            <div className="album">
                <div className="hero">
                    <h4>{album.title}</h4>
                    <span>{album.date}</span>
                    <div className="cover" style={{backgroundImage: `url(${album.photos[0].image})`}}></div>
                </div>
                <div className="photos">
                    {album.photos.map((photo: PhotoType) => {
                        return (<div key={photo.image} className="photo" style={{backgroundImage: `url(${photo.image})`}}></div>)
                    })}
                </div>
            </div>
        </div>);
    }
}

export default withRouter(Album);