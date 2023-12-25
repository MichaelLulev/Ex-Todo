import { Login } from "./Login.jsx"

const { NavLink } = ReactRouterDOM

export function Header() {

    return (
        <header className="main-header">
            <Login />
            <nav>
                <NavLink to="/user">User page</NavLink>
                &nbsp;
                <NavLink to="/todo">Todos page</NavLink>
            </nav>
        </header>
    )
}