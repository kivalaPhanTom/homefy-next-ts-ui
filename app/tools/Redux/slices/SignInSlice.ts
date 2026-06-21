import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { USER_NAME_IN_LOCALSTORAGE, TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'

const initialState = {
    isOpenPop: false,
    isLogin: false,
    usernameLogin: getLocalStorage(USER_NAME_IN_LOCALSTORAGE) || null,
    tokenUserLogin: getLocalStorage(TOKEN_IN_LOCALSTORAGE) || null
}
const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        setOpenPopupSignIn: (state, action) => {
            let newState = { ...state }
            newState.isOpenPop = action.payload
            return newState
        },
        setIsLogin: (state, action) => {
            let newState = { ...state }
            newState.isLogin = action.payload
            return newState
        },
        setCurrentUserLogin: (state, action) => {
            let newState = { ...state }
            const { username, token } = action.payload
            newState.usernameLogin = username
            newState.tokenUserLogin = token
            return newState
        }
    },
});
const { reducer } = signInSlice;
export const { setOpenPopupSignIn, setIsLogin, setCurrentUserLogin } = signInSlice.actions;
export default reducer;