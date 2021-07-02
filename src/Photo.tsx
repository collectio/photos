import React from "react";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {AlbumType, PhotoType, GameType} from './@types/index';

import Slider from "react-slick";


interface Props {
    album: any
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
        const {photo, album, index} = this.props.location.state as any;
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: index
        }
        return (<div id="photo">
            <Link to={{
                pathname: `/album`,
                state: {album: album}
            }} className="close">
                <img src="/assets/close.svg" />
            </Link>
            <Slider {...settings}>
            {this.props.album.photos.map((photo: PhotoType) => {
              return (<React.Fragment>
                <div style={{backgroundImage: `url(${photo.image})`}}></div>
              </React.Fragment>)
            })}
            </Slider>
        </div>);
    }
}

export default withRouter(Photo);