


export function TodoSort({ sortBy, onSetSortBy }) {

    function onChangeSortBy(ev) {
        const name = ev.target.name
        let value = ev.target.value
        if (name === 'isAscending') value = ev.target.checked
        onSetSortBy({ [name]: value })
    }

    return (
        <section className="todo-filter">
            <h2>Sort</h2>
            <div className="flex">
                <label>
                    <span>Field: </span>
                    <select
                        name="field"
                        className="sort-field"
                        value={sortBy.field}
                        onChange={onChangeSortBy}
                    >
                        <option value="title">Title</option>
                        <option value="text">Text</option>
                        <option value="creator">Creator</option>
                        <option value="createdAt">Created at</option>
                    </select>
                </label>
                <label>
                    <span>Ascending: </span>
                    <input
                        type="checkbox"
                        name="isAscending"
                        checked={sortBy.isAscending}
                        onChange={onChangeSortBy}
                    />
                </label>
            </div>
        </section>
    )
}