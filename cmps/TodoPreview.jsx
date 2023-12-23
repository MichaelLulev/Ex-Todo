import { utilService } from "../services/util.service.js"

export function TodoPreview({ todo, onUpdateTodo, onRemoveTodo }) {
    const isDone = todo.isDone
    const title = todo.title
    const text = todo.text
    const creator = todo.creator.fullName
    const timeAgo = utilService.getTimeAgo(todo.createdAt)

    function onCheck(ev) {
        onUpdateTodo({ ...todo, isDone: ev.target.checked })
    }

    return (
        <article className={`todo-preview column-layout ${isDone ? 'done' : ''}`}>
            <label>
                <input type="checkbox" name="isDone" checked={isDone} onChange={onCheck} />
            </label>
            <h3 className="todo-title" title={title}>{title}</h3>
            <p className="todo-text" title={text}>{text}</p>
            <p className="todo-creator" title={creator}>{creator}</p>
            <p className="todo-createdAt" title={timeAgo}>{timeAgo}</p>
            <button className="remove" onClick={() => onRemoveTodo(todo)}>X</button>
        </article>
    )
}