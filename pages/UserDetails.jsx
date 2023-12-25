import { userService } from "../services/user.service.js"

const { useState, useEffect } = React
const { useSelector } = ReactRedux
const { useParams } = ReactRouterDOM

export function UserDetails() {
    const params = useParams()
    const [user, setUser] = useState(null)
    const loggedInUser = useSelector(state => state.loggedInUser)

    useEffect(() => {
        if (params.userId) userService.get(params.userId).then(setUser).catch(err => console.err(err.response.data))
        else if (loggedInUser) setUser(loggedInUser)
    }, [params, loggedInUser])

    if (! user) {
        if (params.userId) return <h2>No such user id '{params.userId}'</h2>
        else return <h2>Not logged in</h2>
    }
    return (
        <React.Fragment>
            <h2>{user.fullName}</h2>
        </React.Fragment>
    )
}