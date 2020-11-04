import * as actionTypes from "./actionTypes"
import axios from "axios"



export const authStart = ()=>{
    return {
        type:actionTypes.AUTH_START
    }
 }

export const authSucess = (token, userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId: userId
    }
}

export const authFail = (error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const auth = (email, password, isSignup)=>{
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6y62FJ2chG9W5JbFypaaH_u_NLlOI1QY'
        if(!isSignup){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6y62FJ2chG9W5JbFypaaH_u_NLlOI1QY"
        }
        axios.post(url, authData)
        .then(response=>{
            console.log(response.data)
            dispatch(authSucess(response.data.idToken, response.data.localId))
        })
        .catch(error=>{
       
            dispatch(authFail(error.response.data.error))
        })
    }
}


