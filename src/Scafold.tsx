import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './@types/index';

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
    componentDidMount() {
        scrollTo(0, 0)
    }
    render() {
        return (<div id=""></div>);
    }
}

export default withRouter(Scafold);