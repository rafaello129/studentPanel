import {  axiosWithToken } from "../helpers/axios";
import { CreateClass } from "../interfaces/class";
import { ClassQueryParams } from "../services/api/providers/classApi";


export const apiGetAllClass = async (queryParams:ClassQueryParams) =>{
    try {
        const searchParams = new URLSearchParams();

        if (queryParams.page !== undefined) {
          searchParams.append('page', queryParams.page.toString());
        }
      
        if (queryParams.limit !== undefined) {
          searchParams.append('pageSize', queryParams.limit.toString());
        }
      
        if (queryParams.teacherId !== undefined) {
          searchParams.append('teacherId', queryParams.teacherId.toString());
        }
        if (queryParams.idCareer !== undefined) {
          searchParams.append('idCareer', queryParams.idCareer.toString());
        }
        if (queryParams.semester !== undefined) {
          searchParams.append('semester', queryParams.semester.toString());
        }
        if (queryParams.isDeleted !== undefined) {
          searchParams.append('isDeleted', queryParams.isDeleted.toString());
        }
      
        if (queryParams.isCurrent !== undefined) {
          searchParams.append('isCurrent', queryParams.isCurrent.toString());
        }
      
        if (queryParams.packageId !== undefined) {
          searchParams.append('packageId', queryParams.packageId.toString());
        }
      
        if (queryParams.subjectId !== undefined) {
          searchParams.append('subjectId', queryParams.subjectId.toString());
        }
        if (queryParams.relationCheck !== undefined) {
          searchParams.append('relationCheck', queryParams.relationCheck.toString());
        }

        return await axiosWithToken(`/class/findAll?${searchParams.toString()}`);
    } catch (error:any) {
        console.log(error);
        return{
            status: false,
            message:error.message,
        };
    }
}

export const apiCreateClass=  async(formData: CreateClass)=>{
  try{
    return await axiosWithToken(`/class/create`, formData, 'POST');
  }catch(error:any){
    console.log(error);
        console.log(error);
        return{
          status: false,
          message:error.message,
      };
  }
}

export const apiGetOneClass=  async(id:number)=>{
  try{
    return await axiosWithToken(`/class/find/`+id, 'POST');
  }catch(error:any){
    console.log(error);
        console.log(error);
        return{
          status: false,
          message:error.message,
      };
  }
}




export const apiAssignStudent = async (studentId: number | undefined, idClass: number) => {
  try {
    const formData = { studentId, classId: idClass }
      return await axiosWithToken(`/class/assign-student`, formData, 'POST');
  } catch (error:any) {
      return {
          status: false,
          message: error
      }
  }
}

export const apiUpdateClass = async (algo: any, algo2: any) => {
  return{
    status: false,
    message: algo,
    data: algo
  }
}