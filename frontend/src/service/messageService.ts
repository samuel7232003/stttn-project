import { apiInstance } from "./api";

export async function sendMessageServer(content:string) :Promise<any>{;

    try {
        const response:any = await apiInstance.post("/api/chat", {
                messages: content 
            }
        );
        return response.choices[0].message.content;
    } catch (error) {
        throw(error);
    }
}

export async function transMessageServer(content:string, lang:string) :Promise<any>{;

    try {
        const response:any = await apiInstance.post("/api/trans", {
                messages: content,
                lang: lang
            }
        );
        return response.choices[0].message.content;
    } catch (error) {
        throw(error);
    }
}