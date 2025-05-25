import { Link, useParams } from 'react-router'
import { set_loading_page } from '../../redux-toolkit/slices/user_slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { get_appointements_details } from '../doctor_api/get_appointements_details'
import { get_patient_by_id } from '../doctor_api/get_patient_by_id'
import { Empty, Spin, Card, Row, Col, Typography, Breadcrumb } from 'antd'
import dayjs from 'dayjs'
import TreatmentCalendar from '../components/calendar_treatment' 
import { AiTwotoneBank, AiTwotoneCalendar, AiTwotoneEnvironment, AiTwotoneFlag, AiTwotoneIdcard, AiTwotoneMail, AiTwotonePhone } from 'react-icons/ai'
import { LiaTeethOpenSolid } from "react-icons/lia";
import  styledCard  from '../dashboard_doctor.module.css'
import AlignerDetails from '../components/aligner_details'

const { Title, Text } = Typography


const PatientAppointmentDetails = () => {
  const dispatch = useDispatch()
  const isLoadingPage = useSelector(state => state.auth.isLoadingPage)
  const [appointmentData, setAppointmentData] = useState(null)
  const [patientData, setPatientData] = useState(null)
  const [noData, setNoData] = useState(false)
  const { appointement_id } = useParams()
  const [selectedDate, setSelectedDate] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedAlignerDay, setSelectedAlignerDay] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(set_loading_page(true))
      try {
        const res = await get_appointements_details(appointement_id)
        const appointment = res?.resData?.data?.[0]

        if (appointment) {
          setAppointmentData(appointment)
          setSelectedDate(dayjs(appointment.appointemnt_day))


          const patientRes = await get_patient_by_id(appointment.patient)
          if (patientRes?.resData?.data) {
            setPatientData(patientRes.resData.data)
          } else setNoData(true)
        } else setNoData(true)
      } catch (err) {
        setNoData(true)
      } finally {
        dispatch(set_loading_page(false))
      }
    }

    fetchDetails()
  }, [appointement_id, dispatch])

  if (appointmentData && patientData) {
    return (
      <div >
        <Breadcrumb
          style={{ marginBottom: '18px' }}
          items={[
            {
              title: <Link to={'/doctor/patients'} replace={true}> Patients </Link>,
            },
            {
              title: <Link to={`/doctor/patients/${patientData?.id}/appointement`} >Patient appointements list</Link>,
            },
            {
              title:'Appointements details',
            },
          ]}
        />
          
          <div style={{  width:"100%",display:"flex",flexDirection:'column', alignItems:"center", padding: "20px" }}>

                <Col>
                    <Title level={4} style={{ margin: 0 }}>
                        Mr {patientData?.full_name}
                    </Title>
                    <Text type="secondary">Patient ID. # {patientData?.id}</Text>
                </Col>
            

            <div style={{ marginTop: "2rem" }}>
                <Row align="middle" gutter={[16, 16]}>
                    <Col flex="none">
                        <AiTwotoneMail style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                        <Text>{patientData?.email}</Text>
                    </Col>
                </Row>
                <Row align="middle" gutter={[16, 16]} style={{ marginTop: 12 }}>
                    <Col flex="none">
                        <AiTwotonePhone style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                        <Text>{patientData?.phone_number} </Text>
                    </Col>
                </Row>

                <Row align="middle" gutter={[16, 16]} style={{ marginTop: 12 }}>
                    <Col flex="none">
                        <AiTwotoneBank style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                      <Text>{patientData?.state} </Text>
                    </Col>
                </Row>
                <Row align="middle" gutter={[16, 16]} style={{ marginTop: 12 }}>
                    <Col flex="none">
                        <AiTwotoneEnvironment style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                      <Text>{patientData?.patient_adress}, {patientData?.city}</Text>

                    </Col>
                </Row>

                <Row align="middle" gutter={[16, 16]} style={{ marginTop: 12 }}>
                    <Col flex="none">
                        <AiTwotoneIdcard style={{ fontSize: 16}} />
                    </Col>
                    <Col>
                      <Text>{patientData?.zip_code} </Text>

                    </Col>
                </Row>
            </div>
            
          <div>
            <Card type='inner' 
              style={{  marginTop: '40px' }}
              >
                <Text style={{ display:'flex', alignItems:'center'}}><AiTwotoneCalendar style={{ fontSize: 16, margin:'0 7px 0 0'}}/><Text><b>Appointment day : </b> { appointmentData.appointemnt_day}</Text></Text>
              </Card>
            <Card type='inner' 
              style={{  marginTop: '10px' }}
              >
                <Text style={{ display:'flex', alignItems:'center'}}><AiTwotoneCalendar style={{ fontSize: 16, margin:'0 7px 0 0'}}/><Text><b>Next appointment day : </b> { appointmentData.next_appointemnt_day}</Text></Text>
              </Card>
            <Card type='inner' 
              style={{  marginTop: '10px' }}
              >
                <Text style={{ display:'flex', alignItems:'center'}}><AiTwotoneFlag style={{ fontSize: 16, margin:'0 7px 0 0'}}/><Text><b>Treatment duration : </b> { appointmentData.treatment_duration} days</Text></Text>
              </Card>
            <Card type='inner'
              style={{  marginTop: '10px' }}
              >
                <Text style={{ display:'flex', alignItems:'center'}}><LiaTeethOpenSolid style={{ fontSize: 18, margin:'0 7px 0 0'}}/><Text><b>Aligner number : </b> { appointmentData.aligner_number} Aligners</Text></Text>
              </Card>

            <Card 
              className={styledCard.calendar_antd}
            type="inner" 
              title={
                <Title style={{margin:'0'}} level={5} >
                Treatment Calendar
              </Title>
              } 
              style={{  marginTop: '40px' }}
              
            >
   
                <TreatmentCalendar
                  startDate={appointmentData.appointemnt_day}
                  duration={appointmentData.treatment_duration}
                  selected={selectedDate}

                  onChange={(e) => {
                    setModalOpen(true)
                    setSelectedAlignerDay(`${e.$y}-${e.$M < 10 && e.$M > 0 ? `0${e.$M}` : e.$M}-${e.$D}`)
                  }}

                />
                <AlignerDetails isModalOpen={isModalOpen} selectedAlignerDay={selectedAlignerDay} setModalOpen={setModalOpen} />

            </Card>
          </div>


        </div>


        

       

      </div>
    )
  }

  if (noData && !isLoadingPage) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Spin />
    </div>
  )
}

export default PatientAppointmentDetails
