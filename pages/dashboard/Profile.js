
import React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import Image from 'next/image';
import Navbar from '../../components/layouts/Navbar';
import {onUpdateAdminList, onDetailAdminList} from '../../services/adminServices';
export default function Home() {

  // New member list
const [profile, setProfile] = useState();
const [loopLM, setLoopLM] = useState(0);
useEffect( () => {

  if (loopLM < 1) {
      const Data = JSON.parse(window.localStorage.getItem('user_data'));
      onDetailAdminList("",{id:Data.id}).then((response) => {
        setProfile(response[0]);
        });
      setLoopLM( loopLM+1 )
  }
  // console.log(profile)
}, [])
  // Size Image ***
// function sizeImage(imgs) {
//   var expandImg = document.getElementById("expandedImg");
//   var imgText = document.getElementById("imgtext");
//   expandImg.src = imgs.src;
//   imgText.innerHTML = imgs.alt;
//   expandImg.parentElement.style.display = "block";
// }
  // Edit Image ***
const editImage = async (e) => {
  const { value: file } = await Swal.fire({
    title: 'Profile image',
    input: 'file',
    inputAttributes: {
      'accept': 'image/*',
      'aria-label': 'Upload your image picture'
    }
  })
  
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      Swal.fire({
        title: 'Your uploaded proflie',
        imageUrl: e.target.result,
        imageAlt: 'The uploaded profile',
        
      })
    }
    await reader.readAsDataURL(file)
    console.log(file)
    let data = {}
    data.imge = file.name
    data.id = profile.id
    if (file) {
     await onUpdateAdminList(data).then((response) => {
        setProfile(response);
        // console.log(response)
        });
      const Toast = await Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true
      })
      await Toast.fire({
        icon: 'success',
        title: 'Success'
      })
      await window.open("/dashboard/Profile", "_self")
    }
  }
}
  // Edit Account Admin ***
const editAccount = async() => {
  // console.log(e)
  // console.log(edit)
  let inputValue = profile.age
  let inputStep = 0
  const { value: formValues, } = await Swal.fire({
    // title: 'Edit Profile',
    html:
      '<Image class="icon-user" src="/assets/images/icons/icon-edit-80.png">'+
      `<input type ="name" class="name" id="name" value = ${profile.name} required placeholder= 'Name' >` +
      `<div class="age"><input type="range" ${inputValue} id="range-input" min= 0, max= 100, step: ${inputStep}> 
       <input type="number" id="age" min="1" max="100" step=${inputStep} value= ${inputValue}></div>` +
      `<input type="position" class="position" id="position" value = ${profile.position} required placeholder  = Position >`+
      `<input type = date class="birthday" id="birthday" value = ${profile.birthday}  required placeholder  = Birthday >`+
      `<input type="phone" class="phone" id="phone" value = ${profile.phone} required placeholder  = Phone >` ,
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
        id:profile.id,
        name:document.getElementById('name').value,
        age:document.getElementById('age').value,
        position:document.getElementById('position').value,
        birthday:document.getElementById('birthday').value,
        phone:document.getElementById('phone').value,
    }
    }
  })
  if (formValues) {
    onUpdateAdminList(formValues)
    const Toast = await Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Success'
    })
   await window.open("/dashboard/Profile", "_self")
  }
}
  //  check Data Profile *** https://www.w3schools.com/images/w3schools_green.jpg
if(profile == undefined){
    return(<></>)
}
return (
  <>
  <title> Profile | Chack-In-Man </title>
       <Navbar/>
    <div className='Box-div-1'>
      <div className='Box-div-2'> 
        <div className='Box-profile-image'> 
          <div className='Box-image'><img src= {profile.imge} alt="Profile"/></div>
        </div>
        <div className='Box-edit-image : center p-5px'> 
          <button onClick={editImage} class='Box-image'><Image src='/assets/images/icons/icon-camera-35.png' alt='camera' width={30} height={30} /></button>
        </div>
        <div className='Box-profile-logo'>
          <div className='Box-logo-google : '><Image src='/assets/images/icons/icon-google-100.png' alt='google' width={43} height={43} /></div>
          <div className='Box-logo-facebook : '><Image src='/assets/images/icons/icon-facebook-100.png' alt='facebook' width={45} height={45} /></div>
          <div className='Box-logo-phone : '><Image src='/assets/images/icons/icon-ig-100.png' alt='phone' width={45} height={45} /></div>
        </div>
        <div className='Box-profile-email'>
          <image class='title-email'>{profile.email}</image>
          <tr></tr>
          <image class='title-phones'>{profile.phone}</image>
        </div>
        <div className='Box-profile-anme'>
          <h1 class='title-name'>{profile.name}</h1>
        </div>
        <div className='Box-profile-data'>
          <image class='title-age :'>{profile.age}</image>
          <image class='title-position :'>{profile.position}</image>
          <image class='title-birthday :'>{profile.birthday}</image>
          <image class='title-phone :'>{profile.phone}</image>
        </div>
        <div className='Box-edit-data'>
          <div className='Box-image :'><button onClick={editAccount}><Image src='/assets/images/icons/icon-edit.png' alt='Varcel Password' width={35} height={35}/></button></div>
        </div>
      </div>
        
    </div>

  </>
)
}