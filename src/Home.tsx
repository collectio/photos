import firebase, { db } from './index'

import React from "react";
import { Link } from "react-router-dom";
import EXIF from 'exif-js';

import { AlbumType, PhotoType, GameType } from './@types/index';


interface Home {
    input: HTMLInputElement | null
}

interface Props {
    user: any | null
    albums: AlbumType[]
    setUser: (user: any) => void
    setAlbum: (album: AlbumType) => void
    addAlbums: (album: AlbumType) => void
    setGame: (game: GameType) => void
}
interface State {
    loading: boolean
    user: any | null
    uploading: boolean
}

const base64ToArrayBuffer = (base64: any) => {
    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

//回転対応 ,  回転具合を見てlabelを回転
// const arrayBuffer = base64ToArrayBuffer(reader.result);
// const exif = EXIF.readFromBinaryFile(arrayBuffer);
// console.log(exif)
// let rotate = 0;
// if (exif && exif.Orientation) {
//     console.log(exif.Orientation)
//   switch (exif.Orientation) {
//     case 3:
//       rotate = 180;
//       break;
//     case 6:
//       rotate = 90;
//       break;
//     case 8:
//       rotate = -90;
//       break;
//   }
// }
// label.style.transform = `rotate(${rotate}deg)`;
// label.style.webkitTransform = `rotate(${rotate}deg)`;


class Home extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: !props.user,
            user: null,
            uploading: false
        }
        this.input = null;

    }
    setInputRef(element: HTMLInputElement): void {
        this.input = element;
    }

    componentDidMount(): void {
        // 2回目以降、ページ遷移などで表示する時には実行しない
        if (this.props.user) return
        // ログイン済みか？
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // console.log(user)
                this.props.setUser(user)
                db.collection('albums').where('userId', '==', this.props.user.uid).orderBy('date').get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            // console.log(doc.id, ' => ', doc.data());
                            this.props.addAlbums(doc.data() as AlbumType)
                        });
                        this.setGameImage()
                        if (!querySnapshot.empty) return
                        // サンプルのアルバム
                        const photos = [
                            { image: 'https://storage.googleapis.com/collectio-photo-assets/sample/1.jpg' },
                            { image: 'https://storage.googleapis.com/collectio-photo-assets/sample/2.jpg' },
                            { image: 'https://storage.googleapis.com/collectio-photo-assets/sample/3.jpg' },
                            { image: 'https://storage.googleapis.com/collectio-photo-assets/sample/4.jpg' },
                            { image: 'https://storage.googleapis.com/collectio-photo-assets/sample/5.jpg' },
                            { image: 'https://storage.googleapis.com/collectio-photo-assets/sample/6.jpg' },
                        ]
                        const date = new Date()
                        const album: AlbumType = {
                            id: 'sample',
                            title: 'サンプルのボードゲーム会',
                            date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
                            photos: photos,
                            games: [{ "bgdb": "http://www.gamers-jp.com/playgame/db_gamea.php?game_id=6959", "bgg": "https://boardgamegeek.com/boardgame/191895", "bodogema": "https://bodoge.hoobby.net/games/golovonogi", "etitle": "Toddles-Bobbles Green", "hasJPURL": 1, "id": "95735", "keyword": "なんじゃもんじゃ,みどり,緑", "maxPlayers": 6, "minPlayers": 2, "playAge": 4, "playingTime": 15, "title": "ナンジャモンジャ・ミドリ", "year": "2010", "image": "https://db.collectio.jp/wp-content/uploads/2019/05/95735.jpg" }, { "bgdb": "", "bgg": "https://boardgamegeek.com/boardgame/230802", "bodogema": "https://bodoge.hoobby.net/games/azul", "etitle": "Azul", "hasJPURL": 1, "id": "72660", "keyword": "", "maxPlayers": 4, "minPlayers": 2, "playAge": 8, "playingTime": 45, "title": "アズール", "year": "2017", "image": "https://db.collectio.jp/wp-content/uploads/2019/05/72660.jpg" }, { "bgdb": "http://www.gamers-jp.com/playgame/db_gamea.php?game_id=4786", "bgg": "https://boardgamegeek.com/boardgame/68448", "bodogema": "https://bodoge.hoobby.net/games/7-wonders", "etitle": "7 Wonders", "hasJPURL": 1, "id": "81063", "keyword": "せかいのななふしぎ せぶんわんだー 7わんだー", "maxPlayers": "", "minPlayers": "", "playAge": "", "playingTime": "", "title": "世界の七不思議", "year": "2010", "image": "https://db.collectio.jp/wp-content/uploads/2019/05/81063.jpg" }, { "bgdb": null, "bgg": null, "bodogema": null, "etitle": "", "hasJPURL": 1, "id": "110318", "keyword": "", "maxPlayers": null, "minPlayers": null, "playAge": null, "playingTime": null, "title": "Escape from the Office: The exciting escape game – escape your boss", "year": "0", "image": null }],
                            userId: ''
                        }
                        this.props.addAlbums(album)
                    })
                    .catch((error) => {
                        console.log('Error getting documents: ', error);
                    });
            }
            this.setState({ loading: false })
        });
    }

    // ゲーム画像を最新のものにする
    setGameImage(): void {
        let ids: number[] = []
        this.props.albums.map((album) => {
            album.games.map((game: GameType) => {
                if(game.id) ids.push(game.id)
            })
        })
        ids = Array.from(new Set(ids))
        const url = 'https://db.collectio.jp/wp-json/wp/v2/posts?include=' + ids.join(',')
        fetch(url).then(r => r.json()).then((games) => {
            // console.log(games)
            this.props.albums.map((album) => {
                album.games.map((g: GameType) => {
                    games.map((game: any) => {
                        // console.log(game.featured_image.src)
                        if (game.featured_image.src !== 'https://db.collectio.jp/wp-includes/images/media/default.png') {
                            if (g.id == game.id) {
                                g.image = game.featured_image.src
                            }
                        }
                    })
                })
                this.setState({})
            })
        })
    }

    async createAlbum(): Promise<void> {
        if (this.input && this.input.files) {
            this.setState({ uploading: true })
            const photoImages: string[] = [];
            for (let i = 0; i < this.input.files.length; i++) {
                const file = this.input.files[i]
                const photoImage = await this.loadImage(file).catch((error) => console.log(error))
                if (photoImage) photoImages.push(photoImage)
            }
            console.log(photoImages)
            const date = new Date()
            const album: AlbumType = {
                id: '',
                title: 'ある日のボードゲーム会',
                date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
                photos: [],
                games: [],
                userId: this.props.user.uid
            }

            const docRef = await db.collection('albums').add(album)
                .catch((error) => {
                    console.error('Error adding document: ', error);
                })
            if (docRef) {
                console.log('Document written with ID: ', docRef.id);
                const photos: PhotoType[] = []
                for (const photoImage of photoImages) {
                    const photoUrl = await this.uploadPhoto(docRef, photoImage).catch((error) => console.log(error))
                    if (photoUrl) {
                        photos.push({
                            image: photoUrl
                        })
                    }
                }
                docRef.update({ id: docRef.id, photos: photos }).catch((error) => console.log(error))
                album.id = docRef.id
                album.photos = photos as PhotoType[]
                this.props.addAlbums(album)
            }
            this.setState({ uploading: false })
        }
    }

    loadImage(file: any): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader: any = new FileReader();
            reader.onload = async (e: any) => {
                resolve(await this.resizeImage(e.target.result))
            }
            reader.readAsDataURL(file)
        })
    }

    uploadPhoto(docRef: any, photoImage: string): Promise<string> {
        console.log('uploadPhoto')
        return new Promise((resolve, reject) => {
            const storageRef = firebase.storage().ref();
            const ref = storageRef.child(`albums/${this.props.user.uid}/${docRef.id}/${(new Date()).getTime()}.jpg`);
            const uploadTask = ref.putString(photoImage, 'data_url')
            uploadTask.on('state_changed', (snapshot: any) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, (error) => {
                console.log(error)
                reject()
            }, async () => {
                const photoUrl = await uploadTask.snapshot.ref.getDownloadURL()
                console.log('File available at', photoUrl);
                resolve(photoUrl)
            })
        })

    }

    resizeImage(base64: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const MIN_SIZE = 640
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (ctx) {
                const img = new Image();
                img.crossOrigin = 'Anonymous'
                img.onload = (event) => {
                    const image = event.target as HTMLImageElement
                    let dstWidth, dstHeight
                    if (image.width > image.height) {
                        dstWidth = MIN_SIZE;
                        dstHeight = image.height * MIN_SIZE / image.width
                    } else {
                        dstHeight = MIN_SIZE;
                        dstWidth = image.width * MIN_SIZE / image.height
                    }
                    canvas.width = dstWidth
                    canvas.height = dstHeight
                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, dstWidth, dstHeight)
                    resolve(canvas.toDataURL())
                }
                img.src = base64
            } else {
                reject()
            }
        })
    }


    GoogleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
    }

    signOut() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            location.reload()
        }).catch((error) => {
            // An error happened.
        });
    }

    render() {
        return (<div id="home">
            <nav>
                <Link to="/">
                    <img className="logo" src="/assets/collectio.svg" alt="Collectio" />
                </Link>
            </nav>
            {this.state.loading ? (
                <div className="loading">
                    <p>読み込み中...</p>
                </div>
            ) : (
                this.props.user ? (
                    <React.Fragment>
                        <div className="profile">
                            <img src={this.props.user.photoURL} alt="" />
                            <p>
                                {this.props.user.displayName}
                            </p>
                            <button onClick={this.signOut.bind(this)}>ログアウト</button>
                        </div>
                        {this.state.uploading ? (
                            <div className="progress">
                                <p>アップロード中...</p>
                            </div>
                        ) : null}
                        <div className="albums">
                            {this.props.albums.map((album) => {
                                return (<div className="album">
                                    <Link to={`/album`} key={album.title + album.date} onClick={() => this.props.setAlbum(album)}>
                                        <div className="image">
                                            <h4>{album.title}</h4>
                                            <span>{album.date}</span>
                                            <div className="photos">
                                                {album.photos.map((photo) => {
                                                    return (<div key={photo.image} className="photo" style={{ backgroundImage: `url(${photo.image})` }}></div>)
                                                })}
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="games">
                                        {album.games.map((game, i) => {
                                            return <Link to={{
                                                pathname: "/game",
                                                state: { game: game }
                                            }} key={game.id} onClick={() => this.props.setGame(game)}>
                                                <div key={game.id} data-id={game.id} className="game">
                                                    <div style={{ backgroundImage: `url(${game.image})` }}></div>
                                                    <span className="title">
                                                        {game.title}
                                                    </span>
                                                </div>
                                            </Link>
                                        })}
                                    </div>
                                </div>)
                            })}
                        </div>
                        <form action="" encType="multipart/form-data">
                            <input className="file" onChange={this.createAlbum.bind(this)} id="file" type="file" name="file" accept="image/*" multiple={true} ref={this.setInputRef.bind(this)} />
                            <label htmlFor="file"></label>
                        </form>
                    </React.Fragment>
                ) : (
                    <div className="login">
                        <h2>Collectio Photoへようこそ</h2>
                        <p>
                            このアプリは、ボードゲームを遊んだ時の写真をアルバムにまとめて、遊んだゲームを記録できるアプリです。<br /><br />
                            「この前、あの時、遊んだゲームはなんだった？」<br />
                            そんな時に役立ちます。<br /><br />
                            どんな風に使えるか、ログインしてサンプルのアルバムを見てみましょう。
                        </p>
                        <p>
                            <button className="google" onClick={this.GoogleLogin.bind(this)}>
                                Googleでログイン
                            </button>
                        </p>
                    </div>
                )
            )}
        </div>);
    }
}

export default Home;