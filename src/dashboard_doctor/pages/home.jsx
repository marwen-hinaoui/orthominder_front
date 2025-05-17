import { Row, Col, Typography} from 'antd';
import TodaysAppointements from './todays_appointements';
import StatCard from '../components/state_card';
import { LiaTeethOpenSolid } from 'react-icons/lia';
import { AiTwotoneCalendar, AiTwotoneFlag } from 'react-icons/ai';
import { RiCalendarView, RiFlagFill, RiUserCommunityLine } from "react-icons/ri";

const {  Text } = Typography;


const HomeDashboardDoctor = () => {
    return (
      <>
        <Row gutter={[12, 12]} style={{marginBottom:'18px'}} >

          {/* <Col xs={24} sm={12} md={12} lg={6}>
            <Card>
              <Statistic
                title="Total Sales"
                value={35078}
                precision={0}
                prefix="$"
                valueStyle={{ color: '#3f8600' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <Text type="success">27.2%</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>You made an extra $20,395 this year</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Card>
              <Statistic
                title="Total Sales"
                value={35078}
                precision={0}
                prefix="$"
                valueStyle={{ color: '#3f8600' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <Text type="success">27.2%</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>You made an extra $20,395 this year</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Card>
              <Statistic
                title="Total Sales"
                value={35078}
                precision={0}
                prefix="$"
                valueStyle={{ color: '#3f8600' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <Text type="success">27.2%</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>You made an extra $20,395 this year</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Card>
              <Statistic
                title="Total Sales"
                value={35078}
                precision={0}
                prefix="$"
                valueStyle={{ color: '#3f8600' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <Text type="success">27.2%</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>You made an extra $20,395 this year</Text>
              </div>
            </Card>
          </Col> */}
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
