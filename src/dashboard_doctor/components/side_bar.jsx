import { Layout, Menu } from "antd"
import {
  AiFillDashboard,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai"
import { BsFillPersonFill, BsPeopleFill } from "react-icons/bs"
import { Link, useLocation } from "react-router"
import dashboarStyle from "../dashboard_doctor.module.css"
import { useDispatch, useSelector } from "react-redux"
import { set_collapsed } from "../../redux-toolkit/slices/user_slice"

const { Sider } = Layout

const sidebar_data = [
  {
    key: "1",
    icon: <AiFillDashboard className={dashboarStyle.iconStyle} />,
    name: "Dashboard",
    route: "/doctor",
  },
  {
    key: "2",
    icon: <BsPeopleFill className={dashboarStyle.iconStyle} />,
    name: "Patients",
    route: "/doctor/patients",
  },
  {
    key: "3",
    icon: <BsFillPersonFill className={dashboarStyle.iconStyle} />,
    name: "Profile",
    route: "/doctor/profile",
  },
]

const DashboardDoctorSidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const collapsed = useSelector(state => state.auth.isCollapsed)
  const selectedKey = sidebar_data.find(
    (item) => location.pathname === item.route
  )?.key

  const toggleCollapsed = () => {
      dispatch(set_collapsed(!collapsed))

    }
  

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        zIndex: 2,
        left: 0,
        background: "#fff",
      }}
    >
      {/* Header with toggle button */}
      <div style={{ padding: "16px", textAlign: "center", display:'flex', alignItems:'center' }}>
        {!collapsed ? <div className={dashboarStyle.imgStyle} />: <div className={dashboarStyle.imgStyleCollapsed} />}
        
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ borderRight: 0 }}
        className={dashboarStyle.textStyle}
      >
        {sidebar_data.map((item) => (
          <Menu.Item
            className={dashboarStyle.textStyle}
            key={item.key}
            icon={item.icon}
          >
            <Link to={item.route} style={{ color: "inherit" }}>
              {item.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}

export default DashboardDoctorSidebar
