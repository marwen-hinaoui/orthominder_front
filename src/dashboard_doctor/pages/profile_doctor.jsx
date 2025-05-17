import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Typography, Spin, Empty } from "antd"
import { useRefreshAccessToken } from "../../shared_api/refresh"
import { get_doctor_data } from "../doctor_api/get_doctor"
import { AiTwotoneBank, AiTwotoneEnvironment, AiTwotoneIdcard, AiTwotoneMail, AiTwotonePhone } from "react-icons/ai"
import  profileStyle  from '../dashboard_doctor.module.css'


const { Title, Text } = Typography

const ProfileDoctor = () => {
    const dispatch = useDispatch()
    const refreshAccessToken = useRefreshAccessToken()
    const access_token = useSelector((state) => state.auth.tokenValue)
    const isLoading = useSelector((state) => state.auth.isLoading)
    const [doctor_data , setDoctorData] = useState()
    useEffect(() => {
        const fetch = async ()=>{
            const res = await get_doctor_data(refreshAccessToken, access_token, dispatch)
            console.log(res)
            setDoctorData(res)
        }
        fetch()
    }, [])
    // }, [doctor_data]) ken t7eb dima chouf wa7dah ken fama update f data raja3 hethy

    if (isLoading && !doctor_data) {
        return (
            <div style={{ width: "100%", textAlign: "center"}}>
                <Spin />
            </div>
        )
    }
    
    else if (!doctor_data && !isLoading) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }

    else if(doctor_data) return (
        <div style={{  width:"100%",display:"flex",flexDirection:'column', alignItems:"center", padding: "20px" }}>

                <Col >
                    <div className={profileStyle.profileImageCointainer}>
                        <div
                            className={profileStyle.profilePageStyle}
                            
                            />
                    </div>
                </Col>
                <Col>
                    <Title level={3} style={{ margin: 0 }}>
                        Dr {doctor_data.full_name}
                    </Title>
                    <Text type="secondary">Reg. # {doctor_data.registiration_number}</Text>
                </Col>
            

            <div style={{ marginTop: "2rem" }}>
                <Row align="middle" gutter={[16, 16]}>
                    <Col flex="none">
                        <AiTwotoneMail style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                        <Text>{doctor_data.email}</Text>
                    </Col>
                </Row>
                <Row align="middle" gutter={[16, 16]} style={{ marginTop: 12 }}>
                    <Col flex="none">
                        <AiTwotonePhone style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                        <Text>{doctor_data.phone_number}</Text>
                    </Col>
                </Row>

                <Row align="middle" gutter={[16, 16]} style={{ marginTop: 12 }}>
                    <Col flex="none">
                        <AiTwotoneBank style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                        <Text>
                            {doctor_data.office_adress}, {doctor_data.city}
                        </Text>
                    </Col>
                </Row>
                <Row align="middle" gutter={[16, 16]} style={{ marginTop: 12 }}>
                    <Col flex="none">
                        <AiTwotoneEnvironment style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                        <Text>
                            {doctor_data.state}
                        </Text>
                    </Col>
                </Row>

                <Row align="middle" gutter={[16, 16]} style={{ marginTop: 12 }}>
                    <Col flex="none">
                        <AiTwotoneIdcard style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                        <Text>ZIP Code: {doctor_data.zip_code}</Text>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ProfileDoctor