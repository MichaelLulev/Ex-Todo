import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

const { createStore } = Redux

// Todo actions
export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

// User actions
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'

// Global store


const initialState = {
    loggedInUser: userService.getLoggedInUser(),
    todos: [],
    filterBy: {},
    sortBy: {},
    pageInfo: {},
    isLoading: false,
}

export const store = createStore(appReducer)

window.gStore = store

function appReducer(state=initialState, action={}) {
    
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos}
        case ADD_TODO:
            return
        case UPDATE_TODO:
            var todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }
        case REMOVE_TODO:
            var todos = state.todos.filter(todo => todo._id !== action.todo._id)
            return { ...state, todos }
        case SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.user }
        default:
            return state
    }
}