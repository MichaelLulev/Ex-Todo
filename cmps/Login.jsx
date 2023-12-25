import { userService } from '../services/user.service.js'
import { signup, login, logout } from '../store/actions/user.actions.js'

const { useState } = React
const { useSelector } = ReactRedux

export function Login() {
    const loggedInUser = useSelector(state => state.loggedInUser)
    const userTodos = useSelector(state => {
        return state.todos.filter(todo => loggedInUser && todo.creator._id === loggedInUser._id)
    })
    const userTodosDone = useSelector(state => {
        return state.todos.filter(todo => loggedInUser && todo.creator._id === loggedInUser._id && todo.isDone)
    })
    const [isLogin, setIsLogin] = useState(true)
    const [formUser, setFormUser] = useState(userService.getNewUser())

    function onChangeFormUser(ev) {
        const name = ev.target.name
        const value = ev.target.value
        setFormUser(prev => ({ ...prev, [name]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        if (isLogin) login(formUser)
        else signup(formUser)
    }

    function onLogout() {
        logout()
    }
    
    return (
        <React.Fragment>
        {
            loggedInUser &&
            <React.Fragment>
                <section className="logged-in-user">
                    <button className="logout" onClick={onLogout}>
                        Logout
                    </button>
                    <h3>Logged in as <em>{loggedInUser.username}</em> aka <em>{loggedInUser.fullName}</em></h3>
                </section>
                <section className="progress">
                    <label>
                        <span>Todos complete: </span>
                        <progress max={userTodos.length} value={userTodosDone.length}></progress>
                        <span> {userTodosDone.length}/{userTodos.length}</span>
                    </label>
                </section>
            </React.Fragment>
        }
        {
            ! loggedInUser &&
            <section className="login">
            {
                ! isLogin &&
                <button className="login-button" onClick={() => setIsLogin(prev => ! prev)}>
                    Login
                </button>
            }
            {
                isLogin &&
                <button className="signup-button" onClick={() => setIsLogin(prev => ! prev)}>
                    Sign up
                </button>
            }
                <h3>{isLogin ? 'Login' : 'Sign up'}</h3>
                <form className="login-form" onSubmit={onSubmitForm}>
                {
                    ! isLogin &&
                    <label>
                        <span>Full name: </span>
                        <input
                            type="text"
                            name="fullName"
                            value={formUser.fullName}
                            onChange={onChangeFormUser}
                        />
                    </label>
                }
                    <label>
                        <span>Username: </span>
                        <input
                            type="text"
                            name="username"
                            value={formUser.username}
                            onChange={onChangeFormUser}
                        />
                    </label>
                    <label>
                        <span>Password: </span>
                        <input
                            type="password"
                            name="password"
                            value={formUser.password}
                            onChange={onChangeFormUser}
                        />
                    </label>
                    <button className="submit-button">
                        Submit
                    </button>
                </form>
            </section>
        }
        </React.Fragment>
    )
}