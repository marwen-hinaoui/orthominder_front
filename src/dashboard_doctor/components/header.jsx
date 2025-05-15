import { Layout, Typography } from "antd";
import DropdownComponent from "./dropdown";
import headerCss from "../dashboard_doctor.module.css";
import { MdNotifications } from "react-icons/md";

const { Header } = Layout;
const { Text } = Typography


const DashboardDoctorHeader = () => {
    return (
      <Header
        className={headerCss.headerStyle}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <MdNotifications
          style={{cursor: 'pointer'}}
          onClick={()=> console.log('Notifications')}
          size={22} />

          <Text  strong style={{ margin: '0 16px' }}>Welcome back, Doctor!</Text>
          
          <DropdownComponent>
            <div className={headerCss.doctorImgHeader}  />
            

          </DropdownComponent>
        </div>
      </Header>
    );
};


export default DashboardDoctorHeader
