import apiInstance from "../../shared_api/axios";

export const add_appointement = async (appointementData) => {
    try {
        const res = await apiInstance.post(
            '/add_appointement',
            appointementData,
            {
                headers: {
                  'Content-Type': 'application/json',
                },
            }   

        )
        return { resData: res, resError:null }
        
        
        
    } catch (error) {

        return { resData: null, resError: error }

        
    }
}
