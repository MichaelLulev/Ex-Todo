import { utilService } from "../services/util.service.js"
import { todoService } from "../services/todo.service.js"

const { useParams, NavLink } = ReactRouterDOM
const { useEffect, useState } = React

export function TodoDetails() {
    const params = useParams()
    const [todo, setTodo] = useState()
    console.log('todo', todo)
    
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
                <p className="todo-creator">Creator <em>{todo.creator.fullName}</em></p>
            </div>
        </React.Fragment>
    )
}