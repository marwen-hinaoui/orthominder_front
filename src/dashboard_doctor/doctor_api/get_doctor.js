import { useSelector } from "react-redux"
import apiInstance from "../../shared_api/axios"
import { useRefreshAccessToken } from "../../shared_api/refresh"

export const get_doctor_dat = async (doctor_id) =>  {
    const access_token = useSelector((state) => state.auth.tokenValue)
    const refreshAccessToken = useRefreshAccessToken()

    try {
        const res = await apiInstance.post(
            `/api/get_doctor/${doctor_id}`,
            {
                headers: {
                  'Authorization': `Bearer ${access_token}`,
                },
            }
        )
        if(res.status == 200)
            return { resData: res.data, resError:null }
    } catch (error) {
        if(error.status === 401){

            refreshAccessToken()
            return {resData: null, resError:error}
        }
    }    
}
