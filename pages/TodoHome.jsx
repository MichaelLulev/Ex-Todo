
const { NavLink } = ReactRouterDOM

export function TodoHome() {

    return (
        <React.Fragment>
            <h1>Todo App</h1>
            <NavLink to="/todo">Go to app</NavLink>
        </React.Fragment>
    )
}