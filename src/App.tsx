//App.tsx
import 'normalize.css'
import './styles/border.css'
import './styles/base.css'
import Guide from './containers/Guide'
import Login from './containers/Login'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Guide />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App;
