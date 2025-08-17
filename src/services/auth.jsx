import axios from "axios"

export const authToken = "12345678"

export const logUserIn = (email,password)=>{
    if(email.trim() !=='' && password.trim() !=''){
        let data = axios.get(`http://localhost:4000/users/?email=${email}&password=${password}`)
        return data
    }
}