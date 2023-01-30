// 导入路由
import { Route, Routes } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import { history, HistoryRouter } from './utils/history'

// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'

// 配置路由规则
function App() {
  return (
    <HistoryRouter history={ history }>
      <div className="App">
        <Routes>
          {/* 需要鉴权的路由 */}
          <Route path="/" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }>
            {/* 二级路由默认页面 */}
            <Route index element={<Home />} />
            <Route path='article' element={<Article />} />
            <Route path='publish' element={<Publish />} />
          </Route>
          {/* 不需要鉴权的路由 */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App