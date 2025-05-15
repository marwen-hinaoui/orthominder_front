
import apiInstance from "../../shared_api/axios"
import { set_doctor_data, set_loading } from "../../redux-toolkit/slices/user_slice"

export const create_patient = async () => {

    try {
        const res = await apiInstance.get(
            `/get_doctor`,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            }
        )
            console.log('try');
            dispatch(set_loading(false))
        if (res.status === 200){
            return res.data
        }
    } catch (error) {
            console.log('catch');
            dispatch(set_loading(false))
        if (error.status === 401) {

            await refreshAccessToken()

        }
        return error
    } finally {
        console.log('finally');
        dispatch(set_loading(false)) 
    }
}
