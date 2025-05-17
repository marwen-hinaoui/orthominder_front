
import apiInstance from "../../shared_api/axios"


export const get_all_appointements = async () => {


    
    try {
        const res = await apiInstance.get(
            `/get_all_appointements`,
        )
        
        if (res.status === 200){
            return { resData: res, resError:null }
        }
    } catch (error) {
            return { resData: null, resError: error }

        
    }
}
