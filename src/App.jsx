
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFount from './pages/NotFount'
function App() {


  return (
    <div className='App'>
      <Routes>
        <Route path='/'element={<Home/>} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='*' element={<NotFount />}></Route>
      </Routes>
    </div>
  )
}

export default App
