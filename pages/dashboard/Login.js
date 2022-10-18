
import React from 'react';
import moment from 'moment';
// import document from 'document';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/layouts/Navbar';
import {onGetHistoryLoginList,onDetailHistoryLoginList} from '../../services/loginServices';


export default function Home() {

  const [ loginList, setLoginList ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ data, setData ] = useState("");
  const [ loopLM, setLoopLM ] = useState(0);

useEffect( () => {
  if (loopLM < 2) {
    onGetHistoryLoginList().then((response) => {
      // console.log(response)    
      setLoginList( response );
        });

        setLoopLM( loopLM + 1 )
      }
},)
const nextDataList = async () => {
  let pages = page + 1
  // console.log("data =",data)
  if ( pages != 1 && data != ""){
    onDetailHistoryLoginList(pages,data).then((response) => {    
    // console.log("Data",data)
    // console.log(pages)
    // console.log(response)
    if(response != ""){
      setPage(pages)
      setLoginList( response );
    }
  })
  
  }else if( pages != 1 && data == ""){
    onGetHistoryLoginList(pages,data).then((response) => {  
      // console.log(pages)
      // console.log(response)  
      if(response != ""){
        setPage(pages)
        setLoginList( response );
      }
    });
  }

}
const reverseDataList = async () => {
  let pages = page - 1
  // console.log("data =",data)
  if ( pages != 0 && data != ""){
    onDetailHistoryLoginList(pages,data).then((response) => {    
    // console.log("Data",data)
    // console.log(pages)
    // console.log(response)
    if(response != ""){
      setPage(pages)
      setLoginList( response );
    }
  })
  
  }else if( pages != 0 && data == ""){
    onGetHistoryLoginList(pages,data).then((response) => {  
      // console.log(pages)
    //   console.log(response)  
      if(response !== ""){
        setPage(pages)
        setLoginList( response );
      }
    });
  }
}
const searchList = async (e) => {
    // e.preventDefault()
    console.log(e)
    // console.log(name)
    let Data = e
    // console.log(Data)

    let pages = 1
    onDetailHistoryLoginList(pages,Data).then((response) => {
      setData(e)
      setPage(pages)
    //   console.log(e)
    //   console.log(response)  
      setLoginList( response );
        });
      }
const columns = [
  { id: 1, title: "ID", accessor: "id" },
  { id: 2, title: "user", accessor: "name" },
  { id: 3, title: "Login", accessor: "date_login" },
  { id: 4, title: "Logout", accessor: "date_logout" },
  { id: 5, title: "Period", accessor: "period" },
  { id: 6, title: "Date", accessor: "date_login" },
  { id: 7, title: "Status", accessor: "status" },
  
];
if (loginList !== undefined) {
return (
    <>
    <title> HistoryLogin | Chack-In-Man </title>
    <Navbar/>
    <h1 className='Title-dasboard : s-35px left-5p top-m-3p'> Record Login </h1>
    <p className='Title-data-text : s-20px left-5p top-5px'> # Login Users List </p>
    <br/>
    <div className='Div-Box-Div-main :padding-3p h-80px '>
    <div className='Div-Box-Table-list-data-check-in : left-m-5p right-m-5p border-5px h-55hv '>
        <table className='Box-table-data-check-in : center b-black fort-knit w-full border-5px box-shadow2 '>
            <thead>
              <tr className='Table-colums-data-check-in : border-collapse'>
                {columns.map((col) => (
                  <th className='Table-colums-data-check-in :s-20px p-10px white ' key= {col.id}>{col.title}</th>
                ))}
              </tr>
            </thead>
            <tbody className='Box-table-data-check-in-list : '>
              
            {loginList ?  loginList.map((x, i) => <tr className='Box-data-check-in-list : black b-white white-h b-black-h border-bottom-2px' key = {i}>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.id} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.name} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {moment(x.date_login).format('HH:mm:ss')} </td>                  
                  <td className='Table-data-check-in-list : p-1p s-15px'> {moment(x.date_logout).format('HH:mm:ss')} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {moment.utc(x.period*1000).format('HH:mm:ss')} </td> 
                  <td className='Table-data-check-in-list : p-1p s-15px'> {moment(x.date_login).format('DD/MM/YYYY')} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.status} </td>
              </tr>
            ) : ''}
            {/* {usersList.map((user, i) => (
              <tr key = {i}>
                {columns.map((col) => (
                  <td className='white' key={col.accessor}>{user.col}</td>
                  ))}
                  </tr>
              ))} */}
              
            </tbody>
        </table>
        
        </div>
        <div className='Box-titel-number-page : b-purple w-7p b-blue-l h-40px  border-10px box-shadow center left-m-5p right-m-5p top-m-2p'>
              <label className=' '>
                  <button onClick={reverseDataList} className='Box-titel-button : right-10p  fort-knit black white-h s-25px'> - </button>
                  <a className='Box-titel-run-number : left-3p fort-knit s-20px right-3p'>  {page}  </a>
                  <button onClick={nextDataList} className='Box-titel-button : left-10p fort-knit black white-h s-25px'> + </button>
              </label>
              </div>
              <div className=' left-m-5p right-m-5p'>
              <label className='Box-search-list-user-check-in : left-m-53p '>
              <input type = 'name' id='Name' name='Name' className='Box-search-list-user-check-in : left-m-14px b-blue-l w-13p left-3p right-1p s-15px h-40px black  b-white white fort-knit box-shadow border-5px' required placeholder  = 'Name'/>
                  <button onClick={() => searchList({name:Name.value})} className='Box-titel-button :  s-15px h-40px w-6p white fort-knit b-black border-5px box-shadow'>| search </button>
              </label>
              <label className='left-m-7p'>
                  <input type = 'date' id='Datetime' name='Datetime' className='Box-search-list-user-check-in : left-m-14px b-blue-l w-13p left-3p right-1p s-15px h-40px black  b-white white fort-knit box-shadow border-5px'/>
                  <button onClick={() => searchList({date:Datetime.value})} className='Box-titel-button :  s-15px h-40px w-6p white fort-knit b-black border-5px box-shadow'>| search </button>
              </label>
          </div>
          </div>
    </>
)
}
}

