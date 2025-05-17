import { Input, InputNumber } from "antd"
import styled, { css } from "styled-components"



const cssProps = css`
    padding: 8px;
    width: 100%;
    
`

const cssPropsInputNumber = css`
    padding: 5px;
    width: 100%;
    
`
const StyledInputDefault = styled(Input)`${cssProps}`
const StyledInputPassword = styled(Input.Password)`${cssProps}`
const StyledInputNumber = styled(InputNumber)`${cssPropsInputNumber}`


export default {StyledInputDefault, StyledInputPassword, StyledInputNumber}