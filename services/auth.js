import { axiosPost, axiosGet } from "./index";

export const onLogin = async(data) => {
    // console.log(data.email.value)
    return axiosPost("api/login/admin", {
        email: data.email.value,
        password: data.password.value,
    })
};

export const onLogout = async(data) => {
    // console.log(data)
    return axiosPost('api/login/logout',{
        id: data.id
    })
};