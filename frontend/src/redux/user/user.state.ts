export interface User{
    _id: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
}

export interface UserListModel{
    user: User,
    userList: User[],
}