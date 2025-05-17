import apiInstance from "../../shared_api/axios";

export const create_patient = async (useData) => {
    try {
        const res = await apiInstance.post(
            '/patient/register',
            useData,
            {
                headers: {
                  'Content-Type': 'application/json',
                },
            }   

        )
        return { resData: res, resError:null }
        
        
        
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        return { resData: null, resError: error }

        
    }
}
