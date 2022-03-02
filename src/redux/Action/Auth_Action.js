import * as ActionTypes from './Types'
import axios from 'axios'




// set Token ====>
export const setToken = token => ({
    type: ActionTypes.SET_TOKEN,
    payload: { token }
})
// set user
export const setUser = user => ({
    type: ActionTypes.SET_USER,
    payload: { user }
})




// user check in email for create new user info or login
export const CheckUser = (email) => async (dispatch) => {


    // testing... console.log(email)

    try {
        const { data } = await axios.post(`/api/user/checkuser/`, email)
        dispatch({
            type: ActionTypes.ADD_USER_CHECKIN, payload: data.message
        })
    } catch (error) {

        dispatch({
            type: ActionTypes.ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })

    }
}







// forget password//
// POST // url : api/user/forgetpassword/
export const ForgetPasswordAction = (user) => async (dispatch, getState) => {

    try {


        const { data } = await axios.put(`/api/user/forgetpassword/`, user)
        dispatch({
            type: ActionTypes.ADD_FORGET_PASSWORD_SUCCESS, payload: data.message
        })
    } catch (error) {

        dispatch({
            type: ActionTypes.ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })

    }

}



// change password  POST 
// URL : http://localhost:8000/api/user/change/:id
export const ChangePasswordForgetAction = (user) => async (dispatch) => {

    // console.log(id,password)
    try {


        const { data } = await axios.post(`/api/user/change/${user._id}`, user)
        dispatch({
            type: ActionTypes.ADD_CHANGEPASSWORD_FORGET_SUCCESS, payload: data.message
        })
    } catch (error) {

        dispatch({
            type: ActionTypes.ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })

    }

}










//  Add Address 
// Put 
export const AddAdressUserAction = (user) => async (dispatch, getState) => {

    try {


        const { userLogin: { token }, } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        await axios.put(`/api/user/update/user/`, user, config)
        dispatch(GetUserInfoAction(token))

    } catch (error) {

        dispatch({
            type: ActionTypes.ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })

    }

}










// change user email and username ... 
// api/user/update/username
export const ChangeUserInfo = (user) => async (dispatch, getState) => {

    try {


        const { userLogin: { token }, } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        await axios.put(`/api/user/update/username/`, user, config)
        dispatch(GetUserInfoAction(token))

    } catch (error) {

        dispatch({
            type: ActionTypes.ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })

    }


}



// add telefon number
// PUT URL : // /api/user/telefonnumber/
export const AddTelefonNumber = (user) => async (dispatch, getState) => {

    try {


        const { userLogin: { token }, } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

       const {data} =  await axios.put(`/api/user/telefonnumber/`, user, config)
        dispatch(GetUserInfoAction(token))
        dispatch({type : ActionTypes.ADDTELEFONUMBER , payload : data.message})

    } catch (error) {

        dispatch({
            type: ActionTypes.ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })

    }


}





// create user ....
// POST // url /user/create/
export const singUp_action = (user) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.ADD_USER_LOADING })

        const { data } = await axios.post(`/api/user/create/`, user)

        // console.log('data',data)
        dispatch(setToken(data.token))
        dispatch(setUser(data.data))
        axios.defaults.headers.Authorization = 'Bearer ' + data.token
        localStorage.setItem(ActionTypes.KEY_USER, JSON.stringify(data.data))
        localStorage.setItem(ActionTypes.KEY_TOKEN, data.token)


    } catch (error) {

        dispatch({
            type: ActionTypes.ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })

    }
}



// logo ut.. 
export const Action_logout = () => (dispatch) => {



    localStorage.removeItem(ActionTypes.KEY_USER)
    localStorage.removeItem(ActionTypes.KEY_TOKEN)
    dispatch({ type: ActionTypes.ADD_USER_LOGOUT })
    dispatch({ type: ActionTypes.ADD_USER_RESET })

  
}








// user Login .... 
// POST // url :  /api/user/login/
export const user_Login = (user) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.ADD_USER_LOADING })

        const { data } = await axios.post(`/api/user/login/`, user)

        dispatch(setToken(data.token))
        dispatch(setUser(data.data))
        axios.defaults.headers.Authorization = 'Bearer ' + data.token
        localStorage.setItem(ActionTypes.KEY_USER, JSON.stringify(data.data))
        localStorage.setItem(ActionTypes.KEY_TOKEN, data.token)


    } catch (error) {
        dispatch({
            type: ActionTypes.ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}





// Get user Info .... 
// GET // URL  /api/user/user/
export const GetUserInfoAction = (token) => async (dispatch) => {
    try {


        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        //  console.log('token', token)
        const { data } = await axios.get(`/api/user/user/`, config)

        dispatch(setUser(data))
        localStorage.setItem(ActionTypes.KEY_USER, JSON.stringify(data))
        // console.log('data data.....')
    } catch (error) {

        const message = error.response &&
            error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized' || message === 'token failed') {

            return dispatch(Action_logout())
        }

        console.log('not return error', message)

        //  dispatch(Action_logout())
        // dispatch({
        //     type: ActionTypes.ADD_USER_FAIL,
        //     payload: message
        // })
    }
}




// google login 
// POST // /api/user/singup/googl/
export const LoginGoogle = (user) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.ADD_USER_LOADING })

        const { data } = await axios.post(`/api/user/singup/googl/`, user)
        // console.log(data)
        dispatch(setToken(data.token))
        dispatch(setUser(data.data))
        axios.defaults.headers.Authorization = 'Bearer ' + data.token
        localStorage.setItem(ActionTypes.KEY_USER, JSON.stringify(data.data))
        localStorage.setItem(ActionTypes.KEY_TOKEN, data.token)


    } catch (error) {
        dispatch({
            type: ActionTypes.ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}
































// ================================= list users only admin se this....===================
// // dispatch({ type: ActionTypes.ADD_ADMIN_LIST_LOADING})
// // append result to search..
// export const AppendListUsers = (idProduct, data) => ({
//     type: ActionTypes.ADD_ADMIN_LIST_APPEND,
//     payload: { idProduct, data }
// })


// // apend page number,,,
// export const AppendListNumber = (idProduct, nextpage) => ({
//     type: ActionTypes.ADD_ADMIN_LIST_NUMBER,
//     payload: { idProduct, nextpage }
// })




// // list users... 
// // POST Only Admin  url : /api/user/lists?pageNumber=1
// export const ListUser = (user) => async (dispatch, getState) => {


//     const { userLogin: { token } } = getState()
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }

//     const CheckNumber = getState().AdminAccount.nextNumber[user]
//     const nextRequestPage = CheckNumber === undefined ? 1 : CheckNumber


//     if (nextRequestPage) {
//         try {

//             const { data } = await axios.get(`/api/user/lists?pageNumber=${nextRequestPage}`, config)

//             dispatch(AppendListUsers(user, data.product))
//             if (data?.pages <= 1) return dispatch(AppendListNumber(user, null))
//             const nextpage = data?.result?.next?.page > data?.pages ? null : data?.result?.next?.page
//             dispatch(AppendListNumber(user, nextpage))
//         } catch (error) {
//             dispatch({
//                 type: ActionTypes.ADD_ADMIN_LIST_FAIL,
//                 payload: error.response &&
//                     error.response.data.message ?
//                     error.response.data.message :
//                     error.message
//             })
//         }

//     }




// }
// Remove User and is Addmin...
// // PUT // url : // /user/remove/user/   Mothod : remove, addAmin 
// export const RemoveUserIsAdminAction = (user) => async (dispatch, getState) => {
//     try {

//         const { userLogin: { token } } = getState()
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//         const { data } = await axios.put(`/api/user/remove/user/ `, user, config)
//         dispatch({ type: ActionTypes.ADD_ADMIN_REMOVE_ISADMIN_SUCCESS, payload: data.message })

//     } catch (error) {
//         dispatch({
//             type: ActionTypes.ADD_ADMIN_LIST_FAIL,
//             payload: error.response &&
//                 error.response.data.message ?
//                 error.response.data.message :
//                 error.message
//         })
//     }
// }