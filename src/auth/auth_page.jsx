import { useState } from "react"
import { Alert, Form } from "antd"
import { Card, Flex } from "antd"
import authStyle from "./auth_page.module.css"
import StyledInput from "../components/styled_components/styled_input"
import { auth } from "../shared_api/auth_api"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import {
  set_authenticated,
  set_error,
  set_loading,
  set_redirection,
  set_token,
} from "../redux-toolkit/slices/user_slice"
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai"
import SharedButton from "../components/button"

const inputErrorMsg = {
  email: "Please input your email!",
  password: "Please input your password!",
}

const AuthPage = () => {
  var navigate = useNavigate()
  const [response, setResponse] = useState()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  //DISPATCH
  const dispatch = useDispatch()

  //SUBSCRIBE TO STORE
  const errroMsg = useSelector((state) => state.auth.errorMsg)
  const loading = useSelector((state) => state.auth.isLoading) //Loading testa3melha ken fl auth ----> arja3 lel user_slice
  

  //LOGIN ACTION
  const onFinish = async (form) => {
    dispatch(set_loading(true))
    const formData = {
      email: form.email,
      password: form.password,
    }
    const res = await auth(formData)

    if (res.resData) {
      dispatch(set_token(res.resData.access))
      dispatch(set_redirection(res.resData.redirect))
      navigate(res.resData.redirect, { replace: true })
      setResponse(res.resData)
      dispatch(set_authenticated(true))
    } else {
      if (res.resError.response) {
        dispatch(set_error(res.resError.response.data.error))
      } else {
        dispatch(set_error(res.resError.message))
      }
    }
  }

  //ERROR MSG RENDER
  const errorHandleMsg = () => {
    if (errroMsg) {
      return (
        <Form.Item>
          <Alert message={errroMsg} type="error" showIcon />
        </Form.Item>
      )
    }
  }

  //Display Loading (btn)
  const buttonDisplay = () => {

      return (
        <SharedButton
          padding={'17px'}
          width={'100%'}
          name={'LOGIN'}
          loading={loading}
        />
      )

  }
   return isAuthenticated === false && (
    <Flex align="center" justify="center" className={authStyle.authBody}>
      <Card
        className={authStyle.cardStyle}
        styles={{ body: { padding: 0 } }} // (body:) ----> ant-card-body class
      >
        <Flex>
          <div className={authStyle.imgStyle}></div>
          <Flex style={{ width: "100%" }} align="center" justify="center">
            <Form
              name="basic"
              variant="filled"
              initialValues={{ variant: 'filled' }}
              onFinish={onFinish}
              autoComplete="off"
              className={authStyle.formStyle}
            >
              {errorHandleMsg()}

              <Form.Item
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
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: inputErrorMsg.password }]}
              >
                <StyledInput.StyledInputPassword
                  prefix={<AiOutlineLock />}
                  placeholder="Password"
                  name="password"
                />
              </Form.Item>

              <Form.Item
                style={{ margin: "35px 0 0 0", flex: "none" }}
                label={null}
              >
                {buttonDisplay()}
              </Form.Item>

            </Form>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}

export default AuthPage
