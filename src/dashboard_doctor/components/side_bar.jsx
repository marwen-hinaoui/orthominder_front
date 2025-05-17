import { Layout, Menu } from "antd";
import { AiFillCalendar, AiFillDashboard } from "react-icons/ai";
import dashboarStyle from '../dashboard_doctor.module.css';
import { Link, useLocation } from "react-router";
import SubMenu from "antd/es/menu/SubMenu";
import { BsFillPersonFill, BsPeopleFill } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6";

const { Sider } = Layout;
const sidebar_data =[
  {
    key:'1',
    icon: <AiFillDashboard className={dashboarStyle.iconStyle} />,
    name:'Dashboard',
    route:'/doctor',
  },
  {
    key:'2',
    icon: <BsPeopleFill className={dashboarStyle.iconStyle} />,
    name:'Patients',
    route:'/doctor/patients',
  },
  {
    key:'3',
    icon: <FaCalendarDays className={dashboarStyle.iconStyle}/>,
    name:'Appointements',
    route:'/doctor/appointements',
  },
  {
    key:'4',
    icon: <BsFillPersonFill className={dashboarStyle.iconStyle}/>,
    name:'Profile',
    route:'/doctor/profile',
  },
];

const DashboardDoctorSidebar = () => {
    const location = useLocation();
    const selectedKey = sidebar_data.find(item => location.pathname === item.route)?.key;

  return (
    <Sider
      width={250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        zIndex:2,
        left: 0,
        background: '#fff',
      }}
    >
      <div style={{ padding: '24px 16px', textAlign: 'center' }}>
        <div className={dashboarStyle.imgStyle}></div>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        style={{ borderRight: 0 }}
        className={dashboarStyle.textStyle}
      >
        {
          sidebar_data.map((item, _) => {
           

            return (
              <Menu.Item className={dashboarStyle.textStyle} key={item.key} icon={item.icon}>
                <Link to={item.route} style={{ color: 'inherit' }} target="_self">
                  {item.name}
                </Link>
              </Menu.Item>
            );
          })
        }
  
      </Menu>
    </Sider>
  );
};

export default DashboardDoctorSidebar;