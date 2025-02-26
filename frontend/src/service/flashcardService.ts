import { apiInstance } from "./api";

export async function getListFlashCard(idUser: string):Promise<any> {
    try{
        const respone:any = await apiInstance.get(`/getListFlashcard?id=${idUser}`);
        return respone;
    } catch (error){
        throw(error);
    }
}

export async function createNewFlashcard(name: string, idUser: string) {
    try {
        const respone: any = await apiInstance.post('/addFlashcard', {name: name,idUser: idUser});
        return respone;
    } catch (error) {
        throw error
    }
}

export async function deleteFlashcard(id:string) {
    try {
        const respone = await apiInstance.get(`/deleteFlashcard?id=${id}`);
        return respone;
    } catch (error) {
        throw error
    }
}