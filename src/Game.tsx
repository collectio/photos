import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { AlbumType, PhotoType, GameType } from './@types/index';

interface Props {
    game: GameType
}
interface State {
}

class Game extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }
    render() {
        try {
            const { game } = this.props.location.state as any
            console.log(game)
            return (<div id="game">
                <nav>
                    <a onClick={() => this.props.history.goBack()}>
                        <img className="logo" src="./assets/back.svg" alt="戻る" />
                    </a>
                    <span></span>
                    <span onClick={() => alert('アルバムのタイトル編集・アルバムの削除機能などがくる予定')}>
                        <img src="./assets/menu.svg" alt="menu" />
                    </span>
                </nav>
                <div className="game">
                    {game.image ? (
                        <img src={game.image} alt={game.title} />
                    ) : (
                        <div className="noimage">
                            {game.title}
                        </div>
                    )}
                    <p className="title">
                        {game.title}
                    </p>
                    {game.yaer!==0 ? (
                    <p className="year">
                        {game.year}
                    </p>
                    ) : null}
                    <div className="links">
                        <a href={`https://www.amazon.co.jp/s?k=`+encodeURIComponent(game.title)} className="amazon" target="_blank">Amazonで探す</a>
                        {game.bodogema ? (
                            <a href={game.bodogema} className="bodogema" target="_blank">ボドゲーマ</a>
                        ) : null}
                        {game.bgg ? (
                            <a href={game.bgg} className="bgg" target="_blank">BoardGameGeek</a>
                        ) : null}
                        {game.bgdb ? (
                            <a href={game.bgdb} className="bgdb" target="_blank">ボードゲームデータベース</a>
                        ) : null}
                    </div>
                </div>
            </div>);
        } catch {
            alert('ホームに戻ります。\n理由:ブラウザのリロード、フリック操作での戻るなど。')
            this.props.history.push('/')
            location.reload()
        }

    }
}

export default withRouter(Game);