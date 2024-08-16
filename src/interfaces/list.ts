import { Attendance } from "./attendance"

export interface studenList{
    id:number,
    name:string,
    lastName:string, 
    motherLastName:string, 
    isActive:boolean
}
export interface List{
    student:studenList,
    attendances: Attendance[]

}