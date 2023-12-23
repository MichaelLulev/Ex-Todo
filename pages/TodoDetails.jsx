import { utilService } from "../services/util.service.js"
import { todoService } from "../services/todo.service.js"

const { useParams, NavLink } = ReactRouterDOM
const { useEffect, useState } = React

export function TodoDetails() {
    const params = useParams()
    const [todo, setTodo] = useState()
    
    useEffect(() => {
        todoService.get(params.todoId)
            .then(todo => {
                setTodo(todo)
            })
            .catch(err => {
                console.error(err)
                setTodo(null)
            })
    }, [])

    function onEditTodo(ev) {
        const title = prompt('Enter title', todo.title) || 'No title'
        const text = prompt('Enter text', todo.text) || 'No text'
        todoService.save({ ...todo, title, text })
            .then(setTodo)
            .catch(err => console.error(err))
    }

    if (todo === undefined) return <div>Loading...</div>
    if (todo === null) return <div>No todo with id '{params.todoId}'</div>
    return (
        <React.Fragment>
            <NavLink to="/todo">Back</NavLink>
            <div className="todo-details">
                <h2 className="todo-title">{todo.title}</h2>
                <p className="todo-text">{todo.text}</p>
                <p className="todo-isDone">{todo.isDone ? 'Complete!' : 'In progress...'}</p>
                <p className="todo-createdAt">Created {utilService.getTimeAgo(todo.createdAt)} at {new Date(todo.createdAt).toLocaleString()}</p>
                <p className="todo-creator">Created by <em>{todo.creator.username}</em> aka <em>{todo.creator.fullName}</em></p>
            </div>
            <button className="todo-edit" onClick={onEditTodo}>Edit</button>
        </React.Fragment>
    )
}