import { axiosPost, axiosGet } from "./index";
    // Register Account Admin 
export const onAddAdminAccount = async (data) => {
    // console.log(data)
    return axiosPost('api/register/admin', {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        position: data.position,
        birthday: data.birthday,
        phone: data.phone,
        imge: data.imge
    })
}

    // Register Account User 
export const onAddUserAccount = async (data) => {
    // console.log(data)
    return axiosPost('api/register/user', {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        position: data.position,
        birthday: data.birthday,
        phone: data.phone,
        imge: data.imge
    })
}