import apiInstance from "./axios"

export const auth = async (userData) =>  {

    try {
        const res = await apiInstance.post(
            '/doctor/login',
            userData,
            {
                headers: {
                  'Content-Type': 'application/json',
                },
            }
        )
        return { resData: res.data, resError:null }
    } catch (error) {
        return {resData: null, resError:error}
    }
}
