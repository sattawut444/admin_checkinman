import { axiosPost, axiosGet } from "./index";
    // List Admin 
export const onGetAdminList = async (pages,data) => {
    return axiosPost('api/admin/list', {
        page: pages,
        data: data
    })
}
    // Detail Admin
export const onDetailAdminList = async (pages,data) => {
    // console.log(data)
    return axiosPost('api/admin/detail', {
        page: pages,
        id: data.id,
        name: data.name,
        email: data.email
    })
}
export const onUpdateAdminList = async (data) => {
    return axiosPost('api/admin/update', {
        id: data.id,
        name: data.name,
        age: data.age,
        position: data.position,
        birthday: data.birthday,
        phone: data.phone,
        imge: data.imge
    })
}
    // Delete Admin
export const onDeleteAdminList = async (data) => {
   return axiosPost('api/admin/delete', {
       id : data.id
   })
}