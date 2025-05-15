import { useEffect } from "react"
import { useSelector } from "react-redux"
import DashboardDoctorSidebar from "../dashboard_doctor/components/side_bar"
import DashboardDoctorHeader from "../dashboard_doctor/components/header"
import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import { useRefreshAccessToken } from "../shared_api/refresh"

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const token = useSelector((state) => state.auth.tokenValue)

  const refreshAccessToken = useRefreshAccessToken()

  useEffect(() => {
  
    if (!token) {

      refreshAccessToken()
      
    }
  }, [isAuthenticated])

  return isAuthenticated ? 
  (

    <Layout style={{ minHeight: '100vh' }}>
      <DashboardDoctorSidebar />
      <Layout>
        <DashboardDoctorHeader />
        <Content
          style={{
            margin: '80px 16px 10px 266px',
            // minHeight: 'calc(100vh)',
          }}
        >
          {children}
        </Content>
      </Layout> 
    </Layout> 
  
  )

  : null

}
