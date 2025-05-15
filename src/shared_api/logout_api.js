import apiInstance from "./axios"

export const logout_api = async () =>  {

    try {
        const res = await apiInstance.post(
            '/logout',
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
