import axios from "axios"



export const logUserIn = (email,password)=>{
    if(email.trim() !=='' && password.trim() !=''){
        let data = axios.get(`http://localhost:4000/users/?email=${email}&password=${password}`)
        return data
    }
}

export const logUserOut = ()=>{
    localStorage.clear()
}