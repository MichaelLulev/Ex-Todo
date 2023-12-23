import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

const { createStore } = Redux

// Todo actions
export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

// Filtering and sorting actions
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'

// User actions
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'
export const SET_USERS = 'SET_USERS'

// Global store


const initialState = {
    loggedInUser: userService.getLoggedInUser(),
    users: [],
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    sortBy: todoService.getDefaultSortBy(),
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
            var todos = [action.todo, ...state.todos]
            return { ...state, todos }

        case UPDATE_TODO:
            var todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

        case REMOVE_TODO:
            var todos = state.todos.filter(todo => todo._id !== action.todo._id)
            return { ...state, todos }

        case SET_FILTER_BY:
            var filterBy = { ...state.filterBy, ...action.filterBy }
            return { ...state, filterBy }

        case SET_SORT_BY:
            var sortBy = { ...state.sortBy, ...action.sortBy }
            return { ...state, sortBy }

        case SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.user }

        case SET_USERS:
            return { ...state, users: action.users}

        default:
            return state
    }
}