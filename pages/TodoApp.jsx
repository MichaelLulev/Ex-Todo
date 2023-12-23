import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { TodoSort } from "../cmps/TodoSort.jsx"
import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, SET_FILTER_BY, SET_USERS, SET_SORT_BY } from "../store/store.js"

const { NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
const { useEffect } = React

export function TodoApp() {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    const users = useSelector(state => state.users)
    const filterBy = useSelector(state => state.filterBy)
    const sortBy = useSelector(state => state.sortBy)

    useEffect(() => {
        todoService.query(filterBy, sortBy)
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })
            })
            .catch(err => console.error(err))
    }, [filterBy, sortBy])

    useEffect(() => {
        userService.query()
            .then(users => {
                dispatch({ type: SET_USERS, users })
            })
            .catch(err => console.error(err))
    }, [])

    function onUpdateTodo(updatedTodo) {
        todoService.save(updatedTodo)
            .then(todo => {
                dispatch({ type: UPDATE_TODO, todo })
            })
            .catch(err => console.error(err))
    }

    function onRemoveTodo(todo) {
        todoService.remove(todo)
            .then(() => {
                dispatch({ type: REMOVE_TODO, todo })
            })
            .catch(err => console.error(err))
    }

    function onAddTodo() {
        const loggedInUser = userService.getLoggedInUser()
        const newTodo = todoService.getNewTodo()
        newTodo.title = prompt('Enter todo title') || 'No title'
        newTodo.text = prompt('Enter todo text') || 'No text'
        todoService.save(newTodo)
            .then(todo => {
                dispatch({ type: ADD_TODO, todo })
            })
    }

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onSetSortBy(sortBy) {
        dispatch({ type: SET_SORT_BY, sortBy })
    }

    const todoFilterProps = {
        users,
        filterBy,
        onSetFilterBy,
    }

    const todoSortProps = {
        sortBy,
        onSetSortBy,
    }

    const todoListProps = {
        todos,
        onUpdateTodo,
        onRemoveTodo,
    }

    console.log('render')
    return (
        <React.Fragment>
            <h1>This is the todo page</h1>
            <section className="button-container">
                <NavLink to="/">Go back home</NavLink>
                <button
                    className="add-todo"
                    onClick={onAddTodo}
                >
                    Add todo
                </button>
            </section>
            <section className="flex">
                <TodoFilter { ...todoFilterProps } />
                <TodoSort { ...todoSortProps } />
            </section>
            <TodoList { ...todoListProps } />
        </React.Fragment>
    )
}