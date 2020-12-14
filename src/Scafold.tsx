import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './App';

interface Props {
}
interface State {
}

class Scafold extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }
    render() {
        return null;
    }
}

export default withRouter(Scafold);