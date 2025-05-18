import { Row, Col, Typography} from 'antd';
import TodaysAppointements from './todays_appointements';
import StatCard from '../components/state_card';
import { LiaTeethOpenSolid } from 'react-icons/lia';
import { RiCalendarView, RiFlagFill, RiUserCommunityLine } from "react-icons/ri";

const {  Text } = Typography;


const HomeDashboardDoctor = () => {
    return (
      <>
         <Text style={{fontWeight:'500', fontSize:'18px'}}>Overview</Text>
        <Row gutter={[12, 12]} style={{marginBottom:'18px', marginTop:'18px'}} >

            <Col xs={24} sm={12} md={12} lg={6}>
              <StatCard
                title="Patients"
                value='2'
                icon={<RiUserCommunityLine />}
                color="#1890ff"
              />
            </Col>

            <Col xs={24} sm={12} md={12} lg={6}>
              <StatCard
                title="Appointments"
                value='2'
                icon={<RiCalendarView />}
                color="#d4380d"
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
              <StatCard
                title="Aligners"
                value='15'
                icon={<LiaTeethOpenSolid />}
                color="#52c41a"
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
              <StatCard
                title="Completed treatment"
                value='0'
                icon={<RiFlagFill />}
                color="#faad14"
              />
            </Col>
        
            
          </Row>

 

          <TodaysAppointements />
  
      </>
    );
  };


  export default HomeDashboardDoctor
