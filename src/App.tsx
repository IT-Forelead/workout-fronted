import { useState } from "react"
import { BrowserRouter, Routes, Route, Link, RouterProvider } from 'react-router-dom';
import DashboardLayout from "./layouts/DashboardLayout"
import LoginLayout from "./layouts/LoginLayout"
import Index from "./pages/Index"
import Login from "./pages/Login"
import { privateRouter, publicRouter } from "./router";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  // const { pathname } = useLocation()
  // const navigate = useNavigate()

  // useEffect(() => {

  // }, [pathname])
  return (
    <>
      <>
        {isLogin ?
          <DashboardLayout>
            <RouterProvider router={privateRouter} />
          </DashboardLayout>
          : <LoginLayout>
            <RouterProvider router={publicRouter} />
          </LoginLayout>}
      </>
    </>
  )
}

export default App
