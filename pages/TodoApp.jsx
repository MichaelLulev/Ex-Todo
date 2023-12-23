import { TodoList } from "../cmps/TodoList.jsx"
import { todoService } from "../services/todo.service.js"
import { REMOVE_TODO, SET_TODOS, UPDATE_TODO } from "../store/store.js"

const { NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
const { useEffect } = React

export function TodoApp() {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)

    useEffect(() => {
        todoService.query()
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })
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

    const todoListProps = {
        todos,
        onUpdateTodo,
        onRemoveTodo,
    }

    return (
        <React.Fragment>
            <h1>This is the todo page</h1>
            <NavLink to="/">Go back home</NavLink>
            <TodoList { ...todoListProps } />
        </React.Fragment>
    )
}