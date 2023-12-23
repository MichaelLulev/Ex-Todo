import { store } from './store/store.js'
import { Header } from './cmps/Header.jsx'
import { TodoHome } from './pages/TodoHome.jsx'
import { TodoApp } from './pages/TodoApp.jsx'
import { TodoDetails} from './pages/TodoDetails.jsx'
import { TodoEdit } from './pages/TodoEdit.jsx'
import { Footer } from './cmps/Footer.jsx'

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
                        {/* <Route path="/todo/edit" element={<TodoEdit />} />
                        <Route path="/todo/detail" element={<TodoDetails />} /> */}
                    </Routes>
                </main>
                <Footer />
            </Router>
        </Provider>
    )
}