
import apiInstance from "../../shared_api/axios"


export const get_appointements_by_patient_id = async (id) => {


    
    try {
        const res = await apiInstance.get(
            `/get_appointements_by_patient_id/${id}`,
        )
        
        if (res.status === 200){
            return { resData: res, resError:null }
        }
    } catch (error) {
            return { resData: null, resError: error }

        
    }
}
