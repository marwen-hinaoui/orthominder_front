import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DashboardDoctorSidebar from "../dashboard_doctor/components/side_bar";
import DashboardDoctorHeader from "../dashboard_doctor/components/header";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export const ProtectedRoute = ({ children }) => {
  // const token = useSelector((state) => state.auth.tokenValue);
  const redirection = useSelector((state) => state.auth.redirection);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirection);
    }else{
      navigate('/login')
    }
  }, [isAuthenticated]);

  return isAuthenticated ? 
  (

    <Layout style={{ minHeight: '100vh' }}>
      <DashboardDoctorSidebar />
      <Layout>
        <DashboardDoctorHeader />
        <Content
          style={{
            margin: '80px 16px 10px 266px',
            minHeight: 'calc(100vh)',
          }}
        >
          {children}
        </Content>
      </Layout> 
    </Layout> 
  
  )

  : null; //PROTECT COMPONENT FOR EXAMPLE DASHBOARD DOCTOR CONTENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

};
