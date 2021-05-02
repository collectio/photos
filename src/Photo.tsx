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
    componentDidMount() {
        scrollTo(0, 0)
    }
    render() {
        const {photo} = this.props.location.state as any;
        const {album} = this.props.location.state as any;
        return (<div id="photo">
            <div style={{backgroundImage: `url(${photo.image})`}}></div>
            <Link to={{
                pathname: "/album",
                state: { album: album }
            }} className="close">
                <img src="./assets/close.svg" />
            </Link>
        </div>);
    }
}

export default withRouter(Photo);