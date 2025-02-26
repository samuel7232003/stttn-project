import { apiInstance } from "./api";

export async function getListCard(id: string):Promise<any> {
    try{
        const respone:any = await apiInstance.get(`/getListCard?id=${id}`);
        return respone;
    } catch (error){
        throw(error);
    }
}

export async function setListCard(list:any):Promise<any> {
    try{
        const respone = await apiInstance.post(`/setListCard`, list);
        return respone;
    } catch (error){
        throw(error);
    }
}

export async function deleteListCard(id:string):Promise<any> {
    try{
        const respone = await apiInstance.get(`/deleteAllCard?id=${id}`);
        return respone;
    } catch (error){
        throw(error);
    }
}

export async function doneOneCard(card:any):Promise<any> {
    try{
        const respone = await apiInstance.post(`/doneOneCard`, card);
        return respone;
    } catch (error){
        throw(error);
    }
}