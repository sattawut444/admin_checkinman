
import React from 'react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/layouts/Navbar';
import {onGetUserCheckinList, onSetNameUserCheckinList} from '../../services/dashboard';


export default function Home() {

  const [ userCheckinList, setUserCheckinList ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ data, setData ] = useState("");
  const [ loopLM, setLoopLM ] = useState(0);
 
useEffect( () => {
  if (loopLM < 2) {
    onGetUserCheckinList().then((response) => {    
      setUserCheckinList(response);
        });

        setLoopLM( loopLM + 1 )
      }
},)
const nextDataCheckinList = async () => {
  let pages = page + 1
  // console.log("data =",data)
  if ( pages != 1 && data != ""){
    onSetNameUserCheckinList(pages,data).then((response) => {    
    // console.log("Data",data)
    // console.log(pages)
    // console.log(response)
    if(response.data != ""){
      setPage(pages)
      setUserCheckinList( response.data );
    }
  })
  
  }else if( pages != 1 && data == ""){
    onGetUserCheckinList(pages,data).then((response) => {  
      // console.log(pages)
      // console.log(response)  
      if(response != ""){
        setPage(pages)
        setUserCheckinList( response );
      }
    });
  }

}
const reverseDataCheckinList = async () => {
  let pages = page - 1
  // console.log("data =",data)
  if ( pages != 0 && data != ""){
    onSetNameUserCheckinList(pages,data).then((response) => {    
    // console.log("Data",data)
    // console.log(pages)
    // console.log(response)
    if(response.data != ""){
      setPage(pages)
      setUserCheckinList( response.data );
    }
  })
  
  }else if( pages != 0 && data == ""){
    onGetUserCheckinList(pages,data).then((response) => {  
      // console.log(pages)
      // console.log(response)  
      if(response !== ""){
        setPage(pages)
        setUserCheckinList( response );
      }
    });
  }
}
const searchlNameCheckinList = async (e) => {
    // e.preventDefault()
    console.log(e)
    // console.log(name)
    let Data = e
    console.log(Data.name)

    let pages = 1
    onSetNameUserCheckinList(pages,Data).then((response) => {
      setData(e)
      setPage(pages)
      setUserCheckinList( response.data );
        });
      }
const columns = [
  { id: 1, title: "ID", accessor: "user_id" },
  { id: 2, title: "Name", accessor: "name" },
  { id: 3, title: "Check-in", accessor: "time_in" },
  { id: 4, title: "Check-out", accessor: "time_out" },
  { id: 5, title: "Date", accessor: "time_in" },
];
if (userCheckinList !== undefined) {
return (
    <>
    <title> CheckinList | Chack-In-Man </title>
    <Navbar/>
    <h1 className='Title-dasboard : s-35px left-5p top-m-3p'>Dashboard</h1>
    <p className='Title-data-text : s-20px left-5p top-5px'> # History Check-in / out User </p>
    <br/>
    <div className='Div-Box-Div-main :padding-3p h-80px '>
    <div className='Div-Box-Table-list-data-check-in : left-m-5p right-m-5p border-5px h-55hv '>
        <table className='Box-table-data-check-in : center b-black fort-knit w-full border-5px box-shadow2'>
            <thead>
              <tr className='Table-colums-data-check-in :  border-collapse'>
                {columns.map((col) => (
                  <th className='Table-colums-data-check-in :s-20px p-10px white ' key= {col.id}>{col.title}</th>
                ))}
              </tr>
            </thead>
            <tbody className='Box-table-data-check-in-list : '>
              
            {userCheckinList ?  userCheckinList.map((x, i) => <tr className='Box-data-check-in-list : black b-white white-h b-black-h border-bottom-2px' key = {i}>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.id} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.name} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {moment(x.time_in).format('HH:mm:ss')} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {moment(x.time_out).format('HH:mm:ss')} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {moment(x.time_in).format('DD/MM/YYYY')} </td>
              </tr>
            ) : ''}
            {/* {userCheckinList.map((user, i) => (
              <tr key = {i}>
                {columns.map((col) => (
                  <td className='white' key={col.id}>{user.id}</td>
                  ))}
                  </tr>
              ))} */}
              
            </tbody>
        </table>
        
        </div>
              <div className='Box-titel-number-page : b-purple w-7p b-blue-l h-40px  border-10px box-shadow center left-m-5p right-m-5p top-m-2p'>
              <label className=' '>
                  <button onClick={reverseDataCheckinList} className='Box-titel-button : right-10p  fort-knit black white-h s-25px'> - </button>
                  <a className='Box-titel-run-number : left-3p fort-knit s-20px right-3p'>  {page}  </a>
                  <button onClick={nextDataCheckinList} className='Box-titel-button : left-10p fort-knit black white-h s-25px'> + </button>
              </label>
              </div>
              <div className=' left-m-5p right-m-5p'>
              <label className='Box-search-list-user-check-in : left-m-53p '>
                  <input type = 'name' id='searchName' name='searchName' className='Box-search-list-user-check-in :  left-m-14px b-blue-l w-13p left-3p right-1p s-15px h-40px black  b-white white fort-knit box-shadow border-5px' required placeholder  =' Name '/>
                  <button onClick={() => searchlNameCheckinList({name:searchName.value})} className='Box-titel-button : s-15px h-40px w-6p white fort-knit b-black border-5px box-shadow'>| search </button>
              </label>
              <label className='left-m-7p'>
                  <input type = 'date' id='searchDate' name='searchDate' className='Box-search-list-user-check-in : left-m-14px b-blue-l w-13p left-3p right-1p s-15px h-40px black fort-knit box-shadow border-5px '/>
                  <button onClick={() => searchlNameCheckinList({date:searchDate.value})} className='Box-titel-button :  s-15px h-40px w-6p white fort-knit b-black border-5px box-shadow'>| search </button>
              </label>
          </div>
          </div>
    </>
)
}
}

