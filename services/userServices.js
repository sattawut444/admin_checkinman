import { axiosPost, axiosGet } from "./index";
    // List User 
export const onGetUsersList = async (pages,data) => {
    return axiosPost('api/user/list', {
        page: pages,
        data: data
    })
}
    // Detail User
export const onDetailUsersList = async (pages,data) => {
    return axiosPost('api/user/detail', {
        page: pages,
        name: data.name,
        email: data.email
    })
}
    // Update User
export const onUpdateUsersList = async (data) => {
    return axiosPost('api/user/update', {
        id: data.id,
        name: data.name,
        age: data.age,
        position: data.position,
        birthday: data.birthday,
        phone: data.phone
    })
}
    //  Delete User
export const onDeleteUsersList = async (data) => {
    return axiosPost('api/user/delete', {
        id: data.id
    })
}