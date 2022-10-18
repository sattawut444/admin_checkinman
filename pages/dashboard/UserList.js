
import React from 'react';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/layouts/Navbar';
import {onGetUsersList,onDetailUsersList,onDeleteUsersList,onUpdateUsersList} from '../../services/userServices';
import {onAddUserAccount} from '../../services/register';


export default function Home() {

  const [ usersList, setUsersList ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ data, setData ] = useState("");

  
  const [ loopLM, setLoopLM ] = useState(0);
 
useEffect( () => {
  if (loopLM < 2) {
    onGetUsersList().then((response) => {
      // console.log(response)    
        setUsersList( response );
        });

        setLoopLM( loopLM + 1 )
      }
},)

  // Page Next + ***
const nextDataList = async () => {
  let pages = page + 1
  // console.log("data =",data)
  if ( pages != 1 && data != ""){
    onDetailUsersList(pages,data).then((response) => {    
    // console.log("Data",data)
    // console.log(pages)
    // console.log(response)
    if(response != ""){
      setPage(pages)
      setUsersList( response );
    }
  })
  
  }else if( pages != 1 && data == ""){
    onGetUsersList(pages,data).then((response) => {  
      // console.log(pages)
      // console.log(response)  
      if(response != ""){
        setPage(pages)
        setUsersList( response );
      }
    });
  }

}

  //  Page Reverse - ***
const reverseDataList = async () => {
  let pages = page - 1
  // console.log("data =",data)
  if ( pages != 0 && data != ""){
    onDetailUsersList(pages,data).then((response) => {    
    // console.log("Data",data)
    // console.log(pages)
    // console.log(response)
    if(response != ""){
      setPage(pages)
      setUsersList( response );
    }
  })
  
  }else if( pages != 0 && data == ""){
    onGetUsersList(pages,data).then((response) => {  
      // console.log(pages)
      // console.log(response)  
      if(response !== ""){
        setPage(pages)
        setUsersList( response );
      }
    });
  }
}

  // Search Name *** 
const searchlNameList = async (e) => {
    // e.preventDefault()
    // console.log(e)
    // console.log(name)
    let Data = e
    // console.log(Data)
    let pages = 1
    onDetailUsersList(pages,Data).then((response) => {
      setData(e)
      setPage(pages)
      setUsersList( response );
        });
}
  // Add Account User
const addAccount = async() =>{
  let inputStep = 0
  const { value: formValues } = await Swal.fire({
    // title: 'Add Admin',
    html:
    '<Image class="icon-user" src="/assets/images/icons/icon-user-80.png">'+
    '<input class="name" id="name" required placeholder  = "Name" >' +
    '<input class="email" type=email id="email" required placeholder  = "Email" >' +
    '<input class="password" id="password" required placeholder  = "Password"  >'+
    `<div class="age"><input type="range" id="range-input" min= 0, max= 100, value=1 step: ${inputStep}> 
    <input type="number" id="age" min="1" max="100" value= 1 step=${inputStep} ></div>` +
    '<input class="position" id="position" required placeholder  = "Position"  >'+
    '<input class="birthday" type=date id="birthday" required placeholder  = "Birthday"  >'+
    '<input class="phone" id="phone" required placeholder  = "Phone"  >'+
    '<input class="imge" type=file id="imge" required placeholder  = "Imge"  >',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Save',
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#E74C3C',
    showCloseButton: true,
    showLoaderOnConfirm: true,
    didOpen: () => {
      const inputRange = Swal.getHtmlContainer().querySelector('#range-input')
      const inputNumber = Swal.getHtmlContainer().querySelector('#age')
      inputRange.addEventListener('input', () => {
        inputNumber.value = inputRange.value
      })
      inputNumber.addEventListener('change', () => {
        inputRange.value = inputNumber.value
      })
    },
  preConfirm: () => {
    return {
      name:document.getElementById('name').value,
      email:document.getElementById('email').value,
      password:document.getElementById('password').value,
      age:document.getElementById('age').value,
      position:document.getElementById('position').value,
      birthday:document.getElementById('birthday').value,
      phone:document.getElementById('phone').value,
      imge:document.getElementById('imge').value,

  }
  }
})
  if (formValues) {
    // console.log(formValues)
    onAddUserAccount(formValues)
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
     Toast.fire({
      icon: 'success',
      title: 'Success'
    })
  }
}
// Edit Account Admin ***
const editAccount = async(e) => {
  // console.log(e)
  // console.log(edit)
  let inputValue = e.age
  let inputStep = 0
  const { value: formValues, } = await Swal.fire({
    // title: 'Edit Profile',
    html:
      '<Image class="icon-user" src="/assets/images/icons/icon-edit-80.png">'+
      `<input type ="name" class="name" id="name" value = ${e.name} required placeholder= 'Name' >` +
      `<div class="age"><input type="range" ${inputValue} id="range-input" min= 0, max= 100, step: ${inputStep}> 
       <input type="number" id="age" min="1" max="100" step=${inputStep} value= ${inputValue}></div>` +
      `<input type="position" class="position" id="position" value = ${e.position} required placeholder  = Position >`+
      `<input type = date class="birthday" id="birthday" value = ${e.birthday}  required placeholder  = Birthday >`+
      `<input type="phone" class="phone" id="phone" value = ${e.phone} required placeholder  = Phone >` ,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#E74C3C',
      showCloseButton: true,
      showLoaderOnConfirm: true,
    didOpen: () => {
      const inputRange = Swal.getHtmlContainer().querySelector('#range-input')
      const inputNumber = Swal.getHtmlContainer().querySelector('#age')
      inputRange.addEventListener('input', () => {
        inputNumber.value = inputRange.value
      })
      inputNumber.addEventListener('change', () => {
        inputRange.value = inputNumber.value
      })
    },
    preConfirm: () => {
      return {
        id:e.id,
        name:document.getElementById('name').value,
        age:document.getElementById('age').value,
        position:document.getElementById('position').value,
        birthday:document.getElementById('birthday').value,
        phone:document.getElementById('phone').value,
    }
    }
  })
  if (formValues) {
    onUpdateUsersList(formValues)
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
     Toast.fire({
      icon: 'success',
      title: 'Success'
    })
  }
}
  //  Delete Account User ***
const deleteAccount = async (e) => {
  // console.log(e)
  switch (e) {
    case "":
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: "กรุณาลองใหม่อีกครั้ง",
        icon: 'error',
        showConfirmButton: false,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#FFA688'
        })
      break;
    default:
      Swal.fire({
        title: 'Are you sure ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Delete!',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#E74C3C',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.isConfirmed){
          onDeleteUsersList(e)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          })
           Toast.fire({
            icon: 'success',
            title: 'Success'
          })
        }
      })
      // console.log(Swal)
      break;
  }
}

const columns = [
  { id: 1, title: "ID", accessor: "id" },
  { id: 2, title: "Name", accessor: "name" },
  { id: 3, title: "Email", accessor: "email" },
  { id: 4, title: "Age", accessor: "age" },
  { id: 5, title: "Position", accessor: "position" },
  { id: 6, title: "Birthday", accessor: "birthday" },
  { id: 7, title: "Phone", accessor: "phone" },
  // { id: 8, title: "Status", accessor: "status" },
  { id: 8, title: "Action", accessor: "" },
];
if (usersList !== undefined) {
return (
    <>
    <title> UserList | Chack-In-Man </title>
    <Navbar/>
    <h1 className='Title-dasboard : s-35px left-5p top-m-2p'>User ID </h1>
    <p className='Title-data-text : s-20px left-5p top-5px'> # Account Users  </p>
    <button onClick={addAccount} className='Box-titel-button : left-m-91p bottom-m-2px'>
       <Image src='/assets/images/icons/icon-adds-100.png' alt='Varcel Password' width={40} height={40} /></button>
    <br/>
    <div className='Div-Box-Div-main :padding-3p h-80px '>
    <div className='Div-Box-Table-list-data-check-in : left-m-5p right-m-5p border-5px h-55hv  '>
        <table className='Box-table-data-check-in : center b-black fort-knit w-full border-5px box-shadow2'>
            <thead>
              <tr className='Table-colums-data-check-in : border-collapse'>
                {columns.map((col) => (
                  <th className='Table-colums-data-check-in :s-20px p-10px white ' key= {col.id}>{col.title}</th>
                ))}
              </tr>
            </thead>
            <tbody className='Box-table-data-check-in-list : '>
              
            {usersList ?  usersList.map((x, i) => <tr className='Box-data-check-in-list : black b-white white-h b-black-h border-bottom-2px' key = {i}>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.id} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.name} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.email} </td>                  
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.age} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.position} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.birthday} </td>
                  <td className='Table-data-check-in-list : p-1p s-15px'> {x.phone} </td>
                  {/* <td className='Table-data-check-in-list : p-1p s-15px'> {x.status} </td> */}
                  <td className='Table-data-check-in-list : '> 
                  <button onClick={() => editAccount(x)}>
                  {/* <button onClick={() => editAccount(setEdit(x))}> */}
                    <Image src='/assets/images/icons/icon-edited.png' alt='Varcel Password' width={25} height={25} /></button>
                  <button onClick={() => deleteAccount({id:x.id})} className='left-m-10p'>
                    <Image src='/assets/images/icons/icon-deleted.png' alt='Varcel Password' width={25} height={25} />
                  </button>
                  </td>
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
                  <button onClick={() => searchlNameList({name:Name.value})} className='Box-titel-button :  s-15px h-40px w-6p white fort-knit b-black border-5px box-shadow'>| search </button>
              </label>
              <label className='left-m-7p'>
                  <input type = 'email' id='email' name='email' className='Box-search-list-user-check-in : left-m-14px b-blue-l w-13p left-3p right-1p s-15px h-40px black  b-white white fort-knit box-shadow border-5px' required placeholder  = 'Email'/>
                  <button onClick={() => searchlNameList({email:email.value})} className='Box-titel-button :  s-15px h-40px w-6p white fort-knit b-black border-5px box-shadow'>| search </button>
              </label>
          </div>
          </div>
    </>
)
}
}

