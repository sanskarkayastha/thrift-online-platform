import axios from "axios"

export const getAllUsers = async ()=>{
    let data = await axios.get("http://localhost:4000/users")
    return data
}

export const checkIfEmailExists = async (email) =>{
    if(email.trim() === ''){
        return false
    }else{
        let data = await axios.get(`http://localhost:4000/users/?email=${email}`)
        if(data.length > 0){
            return true
        }else{
            return false
        }
    }
}