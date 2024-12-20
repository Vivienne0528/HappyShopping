//App.tsx
import 'normalize.css'
import './styles/border.css'
import './styles/base.css'
import Guide from './containers/Guide'
import Login from './containers/Account/Login'
import Register from './containers/Account/Register'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Account from './containers/Account'
import Home from './containers/Home'
import Nearby from './containers/Nearby'
import Search from './containers/Search'
import SearchList from './containers/SearchList'
import Detail from './containers/Detail'
import Category from './containers/Category'
import Cart from './containers/Cart'
import Order from './containers/Order'

const router = createHashRouter([{
  path: '/',
  element: <Guide />
}, {
  path: '/account',
  element: <Account />,
  children: [{
    path: '/account/login',
    element: <Login />
  }, {
    path: '/account/register',
    element: <Register />
  }]
}, {
  path: '/home',
  element: <Home />
}, {
  path: '/nearby',
  element: <Nearby />
}, {
  path: '/search/:shopId',
  element: <Search />
}, {
  path: '/searchList/:shopId/:keyword',
  element: <SearchList />
}, {
  path: '/detail/:id',
  element: <Detail />
}, {
  path: '/category',
  element: <Category />
}, {
  path: '/cart',
  element: <Cart />
}, {
  path: '/order/:id',
  element: <Order />
}, {
  //如果没有路径能匹配就展示Home Page
  path: '*',
  element: <Home />
}
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
