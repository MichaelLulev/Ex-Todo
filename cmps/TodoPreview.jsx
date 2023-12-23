import { utilService } from "../services/util.service.js"

const { useNavigate } = ReactRouterDOM

export function TodoPreview({ todo, onUpdateTodo, onRemoveTodo }) {
    const navigate = useNavigate()
    const isDone = todo.isDone
    const title = todo.title
    const text = todo.text
    const fullName = todo.creator.fullName
    const username = todo.creator.username
    const timeAgo = utilService.getTimeAgo(todo.createdAt)

    function onCheck(ev) {
        ev.stopPropagation()
        onUpdateTodo({ ...todo, isDone: ev.target.checked })
    }

    function onClickRemove(ev) {
        ev.stopPropagation()
        onRemoveTodo(todo)
    }

    function onClickTodo(ev) {
        navigate(`/todo/${todo._id}`)
    }

    return (
        <article
            className={`todo-preview column-layout ${isDone ? 'done' : ''}`}
            onClick={onClickTodo}
        >
            <label>
                <input
                    type="checkbox"
                    name="isDone"
                    checked={isDone}
                    onChange={onCheck}
                    onClick={ev => ev.stopPropagation()}
                />
            </label>
            <h3 className="todo-title" title={title}>{title}</h3>
            <p className="todo-text" title={text}>{text}</p>
            <p className="todo-creator" title={`${username} aka ${fullName}`}>{fullName}</p>
            <p className="todo-createdAt" title={timeAgo}>{timeAgo}</p>
            <button className="remove" onClick={onClickRemove}>X</button>
        </article>
    )
}