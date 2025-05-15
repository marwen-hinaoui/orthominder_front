import { Layout, Menu } from "antd";
import { AiFillCalendar, AiFillDashboard } from "react-icons/ai";
import dashboarStyle from '../dashboard_doctor.module.css';
import { Link, useLocation } from "react-router";
import SubMenu from "antd/es/menu/SubMenu";
import { BsFillPersonFill, BsPeopleFill, BsPersonLinesFill } from "react-icons/bs";

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

    listPatient:{
      name:'Patients List',
      icon: <BsPersonLinesFill className={dashboarStyle.iconStyle} />,
      route:'/doctor/patients',
    },
    addPatient:{
      name:'New Appointement',
      icon: <AiFillCalendar className={dashboarStyle.iconStyle} />,
      route:'/doctor/patients/appointement',
    }
  },
  {
    key:'3',
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
            if (item.name === "Patients") {
              return (
                <SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={
                    <Link to={item.route} style={{ color: 'inherit' }}>
                      {item.name}
                    </Link>
                  }
                  className={dashboarStyle.textStyle}
                >
                  <Menu.Item key='sub1' icon={item.listPatient.icon}>
                    <Link to={item.listPatient.route} style={{ color: 'inherit' }}>{item.listPatient.name}</Link>
                  </Menu.Item>
                  <Menu.Item key='sub2'  icon={item.addPatient.icon}>
                    <Link to={item.addPatient.route} style={{ color: 'inherit' }}>{item.addPatient.name}</Link>
                  </Menu.Item>
                </SubMenu>
              );
            }

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