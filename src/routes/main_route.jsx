import { BrowserRouter, Route, Routes,  } from "react-router"
import AuthPage from "../auth/auth_page"
import HomeDashboardDoctor from "../dashboard_doctor/pages/home"
import ProfileDoctor from "../dashboard_doctor/pages/profile_doctor"
import ProfileAdmin from "../dashboard_admin/pages/profile_admin"

import { AuthProvider } from "../auth/auth_provider"
import { ProtectedRoute } from "./protected_route"
import HomeDashboardAdmin from "../dashboard_admin/pages/home"
import Patients from "../dashboard_doctor/pages/patients"


const MainRoutes = ()=> {
    return (
      <BrowserRouter>
      <AuthProvider>
          {/* Auth provider bch mataba9ach kol testi luser authenificated wala le  */}
        <Routes>
        
          {/*Login Route*/}
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<>404</>} />
          <Route path="/" element={<>Landing Page</>} />

          {/*Doctor Route*/}
          <Route path="/doctor">
              <Route index element={
                <ProtectedRoute>
                  <HomeDashboardDoctor />
                </ProtectedRoute>} 
              />
              <Route path="patients" element={
                <ProtectedRoute>
                  <Patients />
                </ProtectedRoute>}
              />
              
              <Route path="profile" element={
                <ProtectedRoute>
                  <ProfileDoctor />
                </ProtectedRoute>}
              />
          </Route>

          {/*Admin Route*/}
          <Route path="/admin">
              {/* <Route path="" element={<HomeDashboardAdmin  />} /> */}
              <Route path="home" element={<HomeDashboardAdmin  />} />
              <Route path="profile" element={<ProfileAdmin />} />
            </Route>        

        </Routes>
      </AuthProvider>
    </BrowserRouter>
    )
}


export default MainRoutes