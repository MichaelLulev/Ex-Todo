import { TodoList } from "../cmps/TodoList.jsx"
import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from "../store/store.js"

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

    const todoListProps = {
        todos,
        onUpdateTodo,
        onRemoveTodo,
    }

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
            <TodoList { ...todoListProps } />
        </React.Fragment>
    )
}