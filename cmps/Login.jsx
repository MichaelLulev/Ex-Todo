import { SET_LOGGED_IN_USER } from '../store/store.js'
import { userService } from '../services/user.service.js'

const { useState } = React
const { useSelector, useDispatch } = ReactRedux

export function Login() {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.loggedInUser)
    const [isLogin, setIsLogin] = useState(true)
    const [formUser, setFormUser] = useState(userService.getNewUser())

    function onChangeFormUser(ev) {
        const name = ev.target.name
        const value = ev.target.value
        setFormUser(prev => ({ ...prev, [name]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        if (! isLogin) var formFunction = userService.signup
        else var formFunction = userService.login
        formFunction(formUser)
            .then(user => {
                dispatch({ type: SET_LOGGED_IN_USER, user })
                setFormUser(userService.getNewUser())
            })
            .catch(err => console.error(err))
    }

    function onLogout() {
        userService.logout()
            .then(() => {
                dispatch({ type: SET_LOGGED_IN_USER, user: null })
                setFormUser(userService.getNewUser())
            })
            .catch(err => console.error(err))
    }
    
    return (
        <React.Fragment>
        {
            loggedInUser &&
            <section className="logged-in-user">
                <button className="logout" onClick={onLogout}>
                    Logout
                </button>
                <h3>Logged in as <em>{loggedInUser.username}</em> aka <em>{loggedInUser.fullName}</em></h3>
            </section>
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