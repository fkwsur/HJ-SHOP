import { createStore } from 'redux'

export default createStore(function(state, action){

    if(state === undefined || 0 || ''){
        return { loginCheck : false, code : false }
    }

    if(action.type === "code"){
        return {...state, code : action.code }
    }

    if(action.type === 'loginCheck'){
        return { ...state, loginCheck : action.loginCheck }
    }

});



