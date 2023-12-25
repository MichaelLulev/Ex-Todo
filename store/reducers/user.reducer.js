import { userService } from "../services/user.service.js"

// User actions
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
    loggedInUser: userService.getLoggedInUser(),
    users: [],
}

export function userReducer(state=initialState, action={}) {
    
    switch (action.type) {
        case SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.user }

        case SET_USERS:
            return { ...state, users: action.users}

        default:
            return state
    }
}