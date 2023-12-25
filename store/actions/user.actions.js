import { userService } from "../../services/user.service.js"
import { SET_LOGGED_IN_USER, SET_USERS } from "../reducers/user.reducer.js"
import { store } from "../store.js"


export function queryUsers() {
    return userService.query()
        .then(users => {
            store.dispatch({ type: SET_USERS, users })
        })
        .catch(err => {
            console.error(err)
        })
}

export function signup(formUser) {
    return userService.signup(formUser)
        .then(user => {
            store.dispatch({ type: SET_LOGGED_IN_USER, user })
        })
        .catch(err => {
            console.error(err)
        })
}

export function login(formUser) {
    return userService.login(formUser)
        .then(user => {
            store.dispatch({ type: SET_LOGGED_IN_USER, user })
        })
        .catch(err => {
            console.error(err)
        })
}

export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_LOGGED_IN_USER, user: null })
        })
        .catch(err => {
            console.error(err)
        })
}