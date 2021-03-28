export interface AlbumType {
    title: string
    date: string
    photos: PhotoType[]
    games: GameType[]
}

export interface PhotoType {
    image: string
}

export interface GameType {
    id: number | null
    title: string
    image: string | null
}