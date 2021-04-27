export interface AlbumType {
    title: string
    date: string
    photos: PhotoType[]
    games: GameType[]
    userId: string
}

export interface PhotoType {
    image: string
}

export interface GameType {
    id: number | null
    title: string
    image: string | null
    year: string
    bodogema: string
    bgg: string
    bgdb: string
}