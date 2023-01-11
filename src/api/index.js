import axios from "axios"


const instance = axios.create({
    baseURL:"https://ecommercebackend.up.railway.app"
})

async function get(url){
    try {
        const result = await instance.get(url,{
            withCredentials:true
        })

        return result.data
    } catch (error) {
        throw error.response.data
    }
}

async function post(url,data){
    try {
        const result = await instance.post(url,data,{
            withCredentials:true
        })
    
        return result.data
    } catch (error) {
        throw error.response.data
    }
}


export {
    get,
    post
}
