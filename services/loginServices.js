import { axiosPost, axiosGet } from "./index";
    // List User 
export const onGetHistoryLoginList = async (pages,data) => {
    return axiosPost('api/history/list', {
        page: pages,
        data: data
    })
}
    // Detail User
export const onDetailHistoryLoginList = async (pages,data) => {
    // console.log(data)
    return axiosPost('api/history/logtime', {
        page: pages,
        name: data.name,
        date: data.date
    })
}