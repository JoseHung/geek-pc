// 导入路由
import { BrowserRouter, Route, Routes } from "react-router-dom"

// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'

// 配置路由规则
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App