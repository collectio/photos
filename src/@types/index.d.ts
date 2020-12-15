export interface AlbumType {
    title: string
    date: string
    photos: PhotoType[]
}

export interface PhotoType {
    image: string
    game: GameType
}

export interface GameType {
    id: number | null
    title: string
}