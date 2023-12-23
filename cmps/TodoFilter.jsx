


export function TodoFilter({ users, filterBy, onSetFilterBy}) {

    function onChangeFilterBy(ev) {
        const name = ev.target.name
        const value = ev.target.value
        onSetFilterBy({ [name]: value })
    }

    return (
        <section className="todo-filter">
            <h2>Filter</h2>
            <div className="flex">
                <label>
                    <span>Search: </span>
                    <input type="text" name="search" value={filterBy.search} onChange={onChangeFilterBy}/>
                </label>
                <label>
                    <span>Status: </span>
                    <select name="status" className="filter-status" value={filterBy.status} onChange={onChangeFilterBy}>
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="done">Done</option>
                    </select>
                </label>
                <label>
                    <span>Creator: </span>
                    <select name="creator" className="filter-creator" value={filterBy.creator} onChange={onChangeFilterBy}>
                        <option value="">All</option>
                    {
                        users.map(user => 
                            <option key={user._id}>{user.fullName}</option>
                        )
                    }
                    </select>
                </label>
            </div>
        </section>
    )
}