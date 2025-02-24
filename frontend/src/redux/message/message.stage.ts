export interface Message{
    _id: string;
    idUser: string;
    content: string;
    role: string;
}

export interface MessageModel{
    listMessage: Message[];
} 