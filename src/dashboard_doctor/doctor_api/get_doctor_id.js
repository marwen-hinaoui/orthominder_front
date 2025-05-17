
import apiInstance from "../../shared_api/axios"


export const get_doctor_id = async () => {


    
    try {
        const res = await apiInstance.get(
            `/get_doctor_id_from_refresh`,
        )
        
        if (res.status === 200){
            return res.data.doctor_id
        }
    } catch (error) {
        console.log(error);
        
    }
}
