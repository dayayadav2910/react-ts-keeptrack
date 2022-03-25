import {Project} from './Project'

const baseURL = "http://localhost:4000";

export const url = `${baseURL}/projects`

function translatestatusToErrorMessage(status:number){
    switch(status){
        case 401:
            return "Please Login again." 
        case 403:
            return "You dont have permission to view projects"
        default:
            return "Error retrieving!! Please try again later..."
    }
}
function checkStatus(response : any){
    console.log(response)
    if(response.ok){
        return response
    }
    else{
        const httpErrorInfo = {
            status : response.status,
            statustext : response.statustext,
            url : response.url
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
        let errormessage = translatestatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errormessage)
    }
}

function delay(ms:number){
    return function(x:any) : Promise<any>{
        return new Promise((resolve)=>setTimeout((resolve)=> resolve(x),ms))
    };
}

function parseJson(respone:Response){
    return respone.json()
}

const projectAPI  = {
    find(id: number){
        return fetch(`${url}/${id}`).then(checkStatus).then(parseJson)
    },

    put(project : Project){
        return fetch(`${url}/${project.id}`,{
            method: 'PUT',
            body:JSON.stringify(project),
            headers :{
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJson)
        .catch((error : TypeError)=>{
            console.log('log client error' + error);
            throw new Error("There was an error updating the project. Please try again")
            
        })
        
    },
    get(page=1, limit=20){
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
        .then(checkStatus)
        .then(parseJson)
        .catch((error:TypeError)=>{
            console.log("Log error" + error)
            throw new Error(
                "There was an error retrieving the projects. Please try again."
            )
        })
    }
}

export {projectAPI};