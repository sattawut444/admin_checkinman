import { axiosPost, axiosGet } from "./index";
    // List User Check-in
export const onGetUserCheckinList = async (page) => {
    return axiosPost('api/check/list', {
        page: page
    })
}
    // Search Check-in-out
export const onSetNameUserCheckinList = async (pages,data) => {
    return axiosPost('api/check/search', {
        page: pages,
        name: data.name,
        date: data.date,

    })
}
