import React from "react";
import {AlbumType, PhotoType, GameType} from './@types/index';
import Slider from "react-slick";

interface Prop {
  album: AlbumType
}
interface State {

}

class SimpleSlider extends React.Component<Prop, State> {
    render() {
      const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index: number) => {
          console.log(index)
        }
      };
      return (
        <Slider {...settings}>
          {this.props.album.photos.map((photo: PhotoType) => {
              return (<div key={photo.image} className="photo">
                  <img src={photo.image} />
                  <span>{photo.game.title ? photo.game.title : '遊んだゲーム未設定'}</span>
              </div>);
          })}
        </Slider>
      );
    }
}

export default SimpleSlider