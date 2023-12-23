import { TodoPreview } from "./TodoPreview.jsx"

export function TodoList({ todos, onUpdateTodo, onRemoveTodo }) {

    return (
        <section className="todo-list column-layout">
        {
            todos.map(todo =>
                <TodoPreview
                    key={todo._id}
                    todo={todo}
                    onUpdateTodo={onUpdateTodo}
                    onRemoveTodo={onRemoveTodo}
                />
            )
        }
        </section>
    )
}