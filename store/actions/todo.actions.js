import { todoService } from "../../services/todo.service.js"
import { ADD_TODO, REMOVE_TODO, SET_FILTER_BY, SET_SORT_BY, SET_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js"
import { store } from "../store.js"

export function queryTodos() {
    const filterBy = store.getState().todoModule.filterBy
    const sortBy = store.getState().todoModule.sortBy
    return todoService.query(filterBy, sortBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.error(err)
        })
}

export function updateTodo(updatedTodo) {
    return todoService.save(updatedTodo)
        .then(todo => {
            store.dispatch({ type: UPDATE_TODO, todo })
        })
        .catch(err => {
            console.error(err)
        })
}

export function removeTodo(todo) {
    return todoService.remove(todo)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todo })
        })
        .catch(err => {
            console.error(err)
        })
}

export function addTodo(newTodo) {
    return todoService.save(newTodo)
        .then(todo => {
            store.dispatch({ type: ADD_TODO, todo })
        })
        .catch(err => {
            console.error(err)
        })
}

export function setTodoFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setTodoSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY, sortBy })
}