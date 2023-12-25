import { store } from './store/store.js'
import { Header } from './cmps/Header.jsx'
import { TodoHome } from './pages/TodoHome.jsx'
import { TodoApp } from './pages/TodoApp.jsx'
import { TodoDetails } from './pages/TodoDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

export function App() {
    
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <main className='main-screen'>
                    <Routes>
                        <Route path="/" element={<TodoHome />} />
                        <Route path="/todo" element={<TodoApp />} />
                        <Route path="/todo/:todoId" element={<TodoDetails />} />
                        <Route path="/user" element={<UserDetails />} />
                        <Route path="/user/:userId" element={<UserDetails />} />
                    </Routes>
                </main>
            </Router>
        </Provider>
    )
}