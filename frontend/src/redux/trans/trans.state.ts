export interface Trans{
    _id: string;
    idUser: string;
    content: string;
    trans: string;
}

export interface TransModel{
    listTrans: Trans[];
} 