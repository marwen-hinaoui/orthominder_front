import { Card, Typography } from 'antd'
const { Title, Text } = Typography

const StatCard = ({ title, value, icon, color }) => (
  <Card
    hoverable
    style={{  textAlign: 'center', borderRadius: 12 }}
  >
    <div style={{ fontSize: 35, color: color, marginBottom: 10 }}>
      {icon}
    </div>
    <Title level={5}>{title}</Title>
    <Text strong style={{ fontSize: 18 }}>{value}</Text>
  </Card>
)

export default StatCard