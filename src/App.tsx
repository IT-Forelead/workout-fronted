import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import LoginLayout from "./layouts/LoginLayout"
import Index from "./pages/Index"
import Login from "./pages/Login"

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {

  }, [pathname])
  return (
    <>
      <BrowserRouter>
        {isLogin ?
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </DashboardLayout>
          : <LoginLayout>
            <Route path="/login" element={<Login test="test" />} />
          </LoginLayout>}
      </BrowserRouter>
    </>
  )
}

export default App
