// 1. 判断 token 是否存在
// 2. 若存在，则直接正常渲染
// 3. 若不存在，则重定向到登录路由

// 高阶组件：把一个组件当作另一个组件的参数传入，然后通过一定的判断来返回新的组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
    const isToken = getToken();
    if(isToken) {
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace />
    }
}

// <AuthComponent> <Layout /> </AuthComponent>
// 登录：<><Layout /></>
// 非登录：<Navigate to="/login" replace />

export { AuthRoute }