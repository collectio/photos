import firebase, { db } from './index'

import React from "react";
import { Link } from "react-router-dom";
import EXIF from 'exif-js';

import { AlbumType, PhotoType, GameType } from './@types/index';


interface Home {
    input: HTMLInputElement | null
}

interface Props {
    albums: AlbumType[]
    setAlbums: (album) => void
}
interface State {
    user: any | null
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

class Home extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: null
        }
        this.input = null;

        // dummy
        if (props.albums.length > 0) return
        const photos = []
        photos.push({
            image: 'https://yabumi.cc/17901ccdcd7973907b4cfd62.jpg',
        });
        const date = new Date()
        const album: AlbumType = {
            title: 'ある日のボードゲーム会',
            date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
            photos: photos,
            games: [{ "bgdb": "http://www.gamers-jp.com/playgame/db_gamea.php?game_id=6959", "bgg": "https://boardgamegeek.com/boardgame/191895", "bodogema": "https://bodoge.hoobby.net/games/golovonogi", "etitle": "Toddles-Bobbles Green", "hasJPURL": 1, "id": "95735", "keyword": "なんじゃもんじゃ,みどり,緑", "maxPlayers": 6, "minPlayers": 2, "playAge": 4, "playingTime": 15, "title": "ナンジャモンジャ・ミドリ", "year": "2010", "image": "https://db.collectio.jp/wp-content/uploads/2019/05/95735.jpg" }, { "bgdb": "", "bgg": "https://boardgamegeek.com/boardgame/230802", "bodogema": "https://bodoge.hoobby.net/games/azul", "etitle": "Azul", "hasJPURL": 1, "id": "72660", "keyword": "", "maxPlayers": 4, "minPlayers": 2, "playAge": 8, "playingTime": 45, "title": "アズール", "year": "2017", "image": "https://db.collectio.jp/wp-content/uploads/2019/05/72660.jpg" }, { "bgdb": "http://www.gamers-jp.com/playgame/db_gamea.php?game_id=4786", "bgg": "https://boardgamegeek.com/boardgame/68448", "bodogema": "https://bodoge.hoobby.net/games/7-wonders", "etitle": "7 Wonders", "hasJPURL": 1, "id": "81063", "keyword": "せかいのななふしぎ せぶんわんだー 7わんだー", "maxPlayers": "", "minPlayers": "", "playAge": "", "playingTime": "", "title": "世界の七不思議", "year": "2010", "image": "https://db.collectio.jp/wp-content/uploads/2019/05/81063.jpg" }, { "bgdb": null, "bgg": null, "bodogema": null, "etitle": "", "hasJPURL": 1, "id": "110318", "keyword": "", "maxPlayers": null, "minPlayers": null, "playAge": null, "playingTime": null, "title": "Escape from the Office: The exciting escape game – escape your boss", "year": "0", "image": null }]
        }
        props.setAlbums(album)
    }
    setInputRef(element: HTMLInputElement) {
        this.input = element;
    }
    loadImage() {
        if (this.input && this.input.files) {
            let reader: any = null;
            const photos: PhotoType[] = [];
            Array.from(this.input.files).map((file: any) => {
                reader = new FileReader();
                reader.onload = async (e: any) => {
                    const storageRef = firebase.storage().ref();
                    const ref = storageRef.child('test.jpg');
                    const uploadTask = ref.putString(await this.resizeImage(e.target.result) as string, 'data_url')
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
                    }, async () => {
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
                        console.log('File available at', downloadURL);
                        photos.push({
                            image: downloadURL,
                        });
                        if (this.input?.files?.length === photos.length) {
                            const date = new Date()
                            const album: AlbumType = {
                                title: 'ある日のボードゲーム会',
                                date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
                                photos: photos,
                                games: []
                            }
                            this.props.setAlbums(album)
                        }

                        // ファイルの削除
                        const desertRef = storageRef.child('test.jpg');
                        desertRef.delete().then(function () {
                            console.log('File deleted successfully')
                        }).catch(function (error) {
                            console.log(error)
                        });

                    });

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
                }
                reader.readAsDataURL(file)
            });
        }
    }

    resizeImage(base64: string) {
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

    componentDidMount() {
        if (this.input) {
            this.input.addEventListener('change', this.loadImage.bind(this));
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user })
            }
        });
        firebase.auth()
            .getRedirectResult()
            .then((result) => {
                if (result.credential) {
                    const credential = result.credential;
                    const token = credential.accessToken;
                }
                const user = result.user;
                console.log(user)
                this.setState({ user })
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
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
    add() {
        db.collection("users").add({
            first: "Ada",
            last: "Lovelace",
            born: 1815
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);

            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
        db.collection("users").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    render() {
        return (<div id="home">
            <nav>
                <Link to="/">
                    <img className="logo" src="./assets/collectio.svg" alt="Collectio" />
                </Link>
            </nav>
            {this.state.user ? (
                <React.Fragment>
                    <p>Welcome {this.state.user.displayName}</p>
                    <button onClick={this.signOut.bind(this)}>SignOut</button>
                    <button onClick={this.add.bind(this)}>add sample data on FireStore</button>
                </React.Fragment>
            ) : (
                <button onClick={this.GoogleLogin.bind(this)}>Google Login</button>
            )}
            <div className="albums">
                {this.props.albums.map((album) => {
                    return (<Link to={{
                        pathname: "/album",
                        state: { album: album }
                    }} key={album.title + album.date}>
                        <div className="album">
                            <div className="image">
                                <h4>{album.title}</h4>
                                <span>{album.date}</span>
                                <div className="photos">
                                    {album.photos.map((photo) => {
                                        return (<div key={photo.image} className="photo" style={{ backgroundImage: `url(${photo.image})` }}></div>)
                                    })}
                                </div>
                            </div>
                            <div className="games">
                                {album.games.map((game, i) => {
                                    return <div key={'game' + i} className="game">
                                        {game.image ? (
                                            <img src={game.image} alt={game.title} />
                                        ) : (
                                            <span className="title">
                                                {game.title}
                                            </span>
                                        )}
                                    </div>
                                })}
                            </div>
                        </div>
                    </Link>)
                })}
            </div>
            <form action="" encType="multipart/form-data">
                <input className="file" id="file" type="file" name="file" accept="image/*" multiple={true} ref={this.setInputRef.bind(this)} />
                <label htmlFor="file"></label>
            </form>
        </div>);
    }
}

export default Home;