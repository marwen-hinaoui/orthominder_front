import { Layout, Typography } from "antd";
import DropdownComponent from "./dropdown";
import authStyle from "../dashboard_doctor.module.css";

const { Header } = Layout;
const { Text } = Typography


const DashboardDoctorHeader = () => {
    return (
      <Header
        className={authStyle.headerStyle}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text strong style={{ marginRight: 16 }}>Welcome back, Doctor!</Text>
          
          <DropdownComponent>
            <div className={authStyle.doctorImg} />

          </DropdownComponent>
        </div>
      </Header>
    );
};


export default DashboardDoctorHeader
