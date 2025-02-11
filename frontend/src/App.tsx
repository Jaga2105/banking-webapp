import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
// import Form from './components/auth/Form'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './pages/Home'

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Login/>,
    },
    {
      path:'/home',
      element:<Home/>,
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App