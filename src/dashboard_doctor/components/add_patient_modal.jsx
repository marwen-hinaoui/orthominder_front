import { Flex, FloatButton, Form, Modal } from 'antd'
import { AiFillBank, AiOutlineEnvironment, AiOutlineIdcard, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import StyledInput from '../../components/styled_components/styled_input'
import StyledForm from '../../components/styled_components/styled_form_item'
import { BsPersonPlusFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { set_modal } from '../../redux-toolkit/slices/user_slice';
import SharedButton from '../../components/button';


const inputErrorMsg = {
    email: "Please input your email!",
    full_name: "Please input your full name!",
    state: "Please input your state!",
    city: "Please input your city!",
    zip_code: "Please input your zip code!",
    adress: "Please input your Adress!",
};

const AddPatientModal = () => {
    const isModalOpen = useSelector(state => state.auth.isModalOpen)
    const dispatch = useDispatch()
    const showModal = () => {
        dispatch(set_modal(true))
    };
    
    const onCreatePatient = () => {
        
    };

    const handleCancel = () => {
        dispatch(set_modal(false))
    };
    

    const displayButton = () => {
        var loading = false
            return (
                <SharedButton
                    padding={'17px'}
                    width={'100%'}
                    name={'CREATE'}
                    loading={loading}
                />
            )
        }
    return (
        <div>
            <FloatButton icon={<BsPersonPlusFill />} onClick={showModal} type="primary" style={{ insetInlineEnd: 24 }} />
            <Modal
                title="Create Patient"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Flex style={{ width: "100%" }} align="center" justify="center">
                    <Form
                        variant='filled'
                        name="basic"
                        onFinish={onCreatePatient}
                        autoComplete="off"
                        style={{ width: "70%", margin:"15px 0", }}
                    >


                        {/* {errorHandleMsg()} */}


                        <StyledForm.StyledFormItem
                            name="full_name"
                            rules={[
                                {
                                    required: true,
                                    message: inputErrorMsg.full_name,
                                    type: "string",
                                },
                            ]}
                        >
                            <StyledInput.StyledInputDefault
                                prefix={<AiOutlineUser style={{ fontSize: "15px" }} />}
                                placeholder='Full name'
                                name="full_name"
                            />
                        </StyledForm.StyledFormItem>


                        <StyledForm.StyledFormItem
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: inputErrorMsg.email,
                                    type: "email",
                                },
                            ]}
                        >
                            <StyledInput.StyledInputDefault
                                prefix={<AiOutlineMail style={{ fontSize: "15px" }} />}
                                placeholder="Email"
                                name="email"
                            />
                        </StyledForm.StyledFormItem>
                        <StyledForm.StyledFormItem
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: inputErrorMsg.state,
                                    type: "string",
                                },
                            ]}
                        >
                            <StyledInput.StyledInputDefault
                                prefix={<AiOutlineEnvironment style={{ fontSize: "15px" }} />}
                                placeholder='State'
                                name="state"
                            />
                        </StyledForm.StyledFormItem>

                        <StyledForm.StyledFormItem
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: inputErrorMsg.city,
                                    type: "string",
                                },
                            ]}
                        >
                            <StyledInput.StyledInputDefault
                                prefix={<AiFillBank style={{ fontSize: "15px" }} />}
                                placeholder='City'
                                name="city"
                            />
                        </StyledForm.StyledFormItem>


                        <StyledForm.StyledFormItem
                            name="zip_code"
                            rules={[
                                {
                                    required: true,
                                    message: inputErrorMsg.zip_code,
                                    type: "number",
                                },
                            ]}
                        >
                            <StyledInput.StyledInputDefault
                                prefix={<AiOutlineIdcard style={{ fontSize: "15px" }} />}
                                placeholder='Zip code'
                                name="zip_code"
                            />
                        </StyledForm.StyledFormItem>
                        <StyledForm.StyledFormItem
                            name="patient_adress"
                            rules={[
                                {
                                    required: true,
                                    message: inputErrorMsg.adress,
                                    type: "string",
                                },
                            ]}
                        >
                            <StyledInput.StyledInputDefault
                                prefix={<AiOutlineEnvironment style={{ fontSize: "15px" }} />}
                                placeholder='Adress'
                                name="patient_adress"
                            />
                        </StyledForm.StyledFormItem>
                         <div>
                        {displayButton()}
                                
                        </div>
                    </Form>
                </Flex>
            </Modal>

        </div>
    )
}

export default AddPatientModal
