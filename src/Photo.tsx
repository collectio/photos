import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './@types/index';

interface Props {
}
interface State {
}

class Photo extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }
    render() {
        const {photo} = this.props.location.state as any;
        return (<div id="photo" style={{backgroundImage: `url(${photo.image})`}}>
            <img src="./assets/close.svg" className="close" onClick={() => this.props.history.goBack()} />
        </div>);
    }
}

export default withRouter(Photo);