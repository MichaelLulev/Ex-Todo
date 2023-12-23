import { Login } from "./Login.jsx"

const { useSelector, useDispatch } = ReactRedux

export function Header() {

    return (
        <header className="main-header">
            <Login />
        </header>
    )
}