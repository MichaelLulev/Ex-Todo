import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { TodoSort } from "../cmps/TodoSort.jsx"
import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"
import { addTodo, queryTodos, removeTodo, setTodoFilterBy, setTodoSortBy, updateTodo } from "../store/actions/todo.actions.js"
import { queryUsers } from "../store/actions/user.actions.js"

const { NavLink } = ReactRouterDOM
const { useSelector } = ReactRedux
const { useEffect } = React

export function TodoApp() {
    const todos = useSelector(state => state.todoModule.todos)
    const users = useSelector(state => state.userModule.users)
    const filterBy = useSelector(state => state.todoModule.filterBy)
    const sortBy = useSelector(state => state.todoModule.sortBy)

    useEffect(() => {
        queryTodos()
    }, [filterBy, sortBy])

    useEffect(() => {
        queryUsers()
    }, [])

    function onUpdateTodo(updatedTodo) {
        updateTodo(updatedTodo)
    }

    function onRemoveTodo(todo) {
        removeTodo(todo)
    }

    function onAddTodo() {
        const loggedInUser = userService.getLoggedInUser()
        const newTodo = todoService.getNewTodo()
        newTodo.title = prompt('Enter todo title') || 'No title'
        newTodo.text = prompt('Enter todo text') || 'No text'
        newTodo.creator = loggedInUser
        addTodo(newTodo)
    }

    function onSetFilterBy(filterBy) {
        setTodoFilterBy(filterBy)
    }

    function onSetSortBy(sortBy) {
        setTodoSortBy(sortBy)
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