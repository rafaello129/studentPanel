
import { axiosWithToken } from "../helpers/axios";


export const apiGetAllRole = async () => {
    try {
        
        const { data } = await axiosWithToken(`/role`,null ,'GET');
        return data 
    } catch (error: any) {
        console.error('Error in apiGetAllRole:', error);
        throw error;
    }
};



export const apiAssingRole = async (idUser: number, idRol: number) => {


    try {
        return await axiosWithToken(`/user-role/assing/${idUser}/role/${idRol}`,null ,'POST');
    } catch (error:any) {
        console.log(error);
        return {
            status: false,
            message: error.message
        }
    }
}