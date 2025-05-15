
import apiInstance from "../../shared_api/axios"
import { set_loading } from "../../redux-toolkit/slices/user_slice"

export const get_doctor_data = async (refreshAccessToken, access_token, dispatch) => {
    dispatch(set_loading(true))


    
    try {
        const res = await apiInstance.get(
            `/get_doctor`,
        )
            dispatch(set_loading(false))
        if (res.status === 200){
            return res.data
        }
    } catch (error) {
            dispatch(set_loading(false))
        if (error.status === 401) {

            await refreshAccessToken()
            
        }
        return error
    } finally {
        dispatch(set_loading(false)) 
    }
}
