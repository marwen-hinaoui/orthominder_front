import { useParams } from 'react-router'
import { set_loading_page } from '../../redux-toolkit/slices/user_slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { get_appointements_details } from '../doctor_api/get_appointements_details'
import { get_patient_by_id } from '../doctor_api/get_patient_by_id'
import { Empty, Spin } from 'antd'

const PatientAppointementDetails = () => {
    const dispatch = useDispatch()
    const isLoadingPage = useSelector(state => state.auth.isLoadingPage)
    const [appointementssData, setAppointementssData] = useState(null)
    const [patientData, setPatientData] = useState(null)
    const [noData, setNoData] = useState(false)

    const { appointement_id } = useParams()

    useEffect(() => {
        const get_appointements = async () => {
            dispatch(set_loading_page(true))
            try {
                const res = await get_appointements_details(appointement_id)
                if (res.resData && res.resData.data && res.resData.data.length > 0) {
                    setAppointementssData(res.resData.data)
                    
                    const patient_res = await get_patient_by_id(res.resData.data[0].patient)

                    if (patient_res.resData && patient_res.resData.data) {
                      
                        setPatientData(patient_res.resData.data)
                    } else {
                        setNoData(true)
                    }
                } else {
                    setNoData(true)
                }
            } catch (error) {
                setNoData(true)
            } finally {
                dispatch(set_loading_page(false))
            }
        }
        get_appointements()
    }, [appointement_id])

    if (appointementssData && patientData) {
        return (
            <div>
                appointementssData : {appointementssData[0].id}
                <br />
                patient : {patientData[0].id}
            </div>
        )
    }

    if (noData && !isLoadingPage) {
        return (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
    }

    return (
        <div style={{ width: "100%", textAlign: "center" }}>
            <Spin />
        </div>
    )
}

export default PatientAppointementDetails
