export interface Word{
    _id: string,
    word: string,
    sym: string,
    mean: string
}

export interface WordModel{
    word: Word,
    listWord: Word[]
}