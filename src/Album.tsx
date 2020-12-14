import React, { ReactPropTypes } from "react";
import {Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './App';

interface Props {
}
interface State {
}

class Album extends React.Component<Props, State> {
    constructor(props: ReactPropTypes) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (<div id="album">
            <nav>
                <img className="logo" src="./assets/collectio.svg" alt="Collectio" />
            </nav>
            <div className="albums"></div>
        </div>);
    }
}

export default Album;