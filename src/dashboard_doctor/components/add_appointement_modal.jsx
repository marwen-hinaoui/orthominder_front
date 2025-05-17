import { Flex, FloatButton, Form, App, Modal } from 'antd'
import { AiTwotoneCalendar } from 'react-icons/ai'
import StyledInput from '../../components/styled_components/styled_input'
import StyledForm from '../../components/styled_components/styled_form_item'
import { useDispatch, useSelector } from 'react-redux'
import { set_loading, set_modal } from '../../redux-toolkit/slices/user_slice'
import SharedButton from '../../components/button'
import { get_doctor_id } from '../doctor_api/get_doctor_id'
import { FaCalendarPlus } from 'react-icons/fa'
import { LiaTeethOpenSolid } from 'react-icons/lia'
import { add_appointement } from '../doctor_api/add_appointement'
import { PiTimerDuotone } from "react-icons/pi"
import { useState } from 'react'

const inputErrorMsg = {
    treatment_duration: "Please input treatment duration!",
    aligner_number: "Please input your aligner number!",
    next_appointemnt_day: "Please input next appointemnt day!",
}

const AddAppointementModal = ({ id }) => {
    const isModalOpen = useSelector(state => state.auth.isModalOpen)
    const dispatch = useDispatch()
    const { message } = App.useApp()
    const [date, setDate] = useState('')
    const loading = useSelector((state) => state.auth.isLoading)
    const today = new Date()
    const appointemnt_day = today.toISOString().split('T')[0]

    const [form] = Form.useForm()

    const success = (successMsg) => {
        message.success(successMsg)
    }

    const error = (errorMsg) => {
        message.error(errorMsg)
    }

    const showModal = () => {
        dispatch(set_modal(true))
    }

    const handleCancel = () => {
        dispatch(set_modal(false))
    }

    const getDateFromCalendar = (date, dateString) => {
        setDate(dateString)
        const selectedDate = new Date(dateString)
        const todayDate = new Date(appointemnt_day)

        const diffTime = selectedDate - todayDate
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays >= 0) {
            form.setFieldsValue({ treatment_duration: diffDays })
        } else {
            form.setFieldsValue({ treatment_duration: 0 })
        }
    }

    const addAppointment = async (formValues) => {
        dispatch(set_loading(true))
        const doctor_id = await get_doctor_id()

        const patientData = {
            doctor: doctor_id,
            treatment_duration: formValues.treatment_duration,
            next_appointemnt_day: date,
            appointemnt_day: appointemnt_day,
            aligner_number: formValues.aligner_number,
            patient: id
        }
        
        const res = await add_appointement(patientData)

        if (res.resData) {
            success(res.resData.data.message)
            dispatch(set_loading(false))
            handleCancel()
        } else {
            error(res.resError.response.data.error)
            dispatch(set_loading(false))
        }
    }

    const displayButton = () => (
        <SharedButton
            padding={'17px'}
            width={'100%'}
            name={'CREATE'}
            loading={loading}
        />
    )

    return (
        <div>
            <FloatButton icon={<FaCalendarPlus />} onClick={showModal} type="primary" style={{ insetInlineEnd: 24 }} />
            <Modal
                title="Create appointment"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Flex style={{ width: "100%" }} align="center" justify="center">
                    <Form
                        form={form}
                        variant='filled'
                        name="basic"
                        onFinish={addAppointment}
                        autoComplete="off"
                        style={{ width: "70%", margin: "15px 0" }}
                    >
                        <StyledForm.StyledFormItem
                            name="next_appointemnt_day"
                            rules={[
                                {
                                    required: true,
                                    message: inputErrorMsg.next_appointemnt_day,
                                },
                            ]}
                        >
                            <StyledInput.StyledDatePicker
                                placeholder='Next appointment day'
                                name="next_appointemnt_day"
                                onChange={getDateFromCalendar}
                            />
                        </StyledForm.StyledFormItem>

                        <StyledForm.StyledFormItem
                            name="treatment_duration"
                            rules={[
                                {
                                    required: true,
                                    message: inputErrorMsg.treatment_duration,
                                    type: "number",
                                },
                            ]}
                        >
                            <StyledInput.StyledInputNumber
                                prefix={<PiTimerDuotone style={{ fontSize: "15px" }} />}
                                placeholder='Treatment duration'
                                name="treatment_duration"
                            />
                        </StyledForm.StyledFormItem>

                        <StyledForm.StyledFormItem
                            name="aligner_number"
                            rules={[
                                {
                                    required: true,
                                    message: inputErrorMsg.aligner_number,
                                    type: "number",
                                },
                            ]}
                        >
                            <StyledInput.StyledInputNumber
                                prefix={<LiaTeethOpenSolid style={{ fontSize: "15px" }} />}
                                placeholder='Aligner number'
                                name="aligner_number"
                            />
                        </StyledForm.StyledFormItem>

                        <div>{displayButton()}</div>
                    </Form>
                </Flex>
            </Modal>
        </div>
    )
}

export default AddAppointementModal
