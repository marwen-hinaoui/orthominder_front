import { Input } from "antd"
import styled, { css } from "styled-components"



const cssProps = css`
    padding: 8px;
    width: 100%;
    
`
const StyledInputDefault = styled(Input)`${cssProps}`
const StyledInputPassword = styled(Input.Password)`${cssProps}`


export default {StyledInputDefault, StyledInputPassword}