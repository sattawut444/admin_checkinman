
import { useEffect, useState } from 'react';
import { onLogout } from '../../services/auth'
import Swal from 'sweetalert2'
import Image from 'next/image';
import React from 'react';

export default function Home() {

  // New member list
const [ profile, setProfile] = useState();
const [loopLM, setLoopLM] = useState(0);
useEffect( () => {

  if (loopLM < 1) {

      setProfile(JSON.parse(window.localStorage.getItem('user_data')));

      // fetchNotification(option).then((response) => {
      //     setNotification( response.items );
      // });
      setLoopLM( loopLM+1 )

      // console.log(profileData);
  }
}, [])
const logOutProfile = () => {

  onLogout(profile).then((response) => {
    // console.log(response)

      switch (response.status) {
        case 0:
          Swal.fire({
              icon: 'success',
              title: 'ออกจากระบบสำเร็จ',
              showConfirmButton: false,
              timer: 3000
          }).then(() => {
              window.localStorage.removeItem('expires_in');
              window.localStorage.removeItem('users_data');
              window.localStorage.removeItem('token');
              window.open("/", "_self")
            })
          break;
        default:
          window.localStorage.removeItem('expires_in');
          window.localStorage.removeItem('users_data');
          window.localStorage.removeItem('token');
          window.open("/", "_self")
          Swal.fire({
              title: 'เกิดข้อผิดพลาด!',
              text: 'ไม่สามารถ ออกจากระบบได้',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          break;
        }
    });

    
}

if (profile === undefined) {
    return <></>;
}
return (
  <>
    <div className="Box-nav : w-full b-black h-45px ">
      <div className=' w-full h-45px p-5px '>
          <a className="Box-lolg : white s-20px left-70px " href="/dashboard/CheckinList"> Check in man </a>
          <div className="dropdown :  w-7p center left-m-18-5p">
          <a className='Box-menu : white-h grey left-m-7p s-13px' href='/dashboard/CheckinList'> Dashboard </a>
          </div>
      <div className="dropdown : left-m-3p w-7p center">
            <a className='Box-menu :  white-h grey left-m-7p s-13px' href='/dashboard/Admin'>Account admin </a>
      </div>
      <div className="dropdown : left-m-3p w-7p center">
            <a className='Box-menu :  white-h grey left-m-7p s-13px' href="/dashboard/UserList">Account User </a>
      </div>
      <div className="dropdown : left-m-3p w-7p center ">
            <a className='Box-menu :  white-h grey left-m-7p s-13px' href="/dashboard/Login">Record Login </a>
      </div>
      <div className="dropdown : left-m-18-5p w-6p center">
            <button onClick={logOutProfile} className='Box-menu :  white-h grey left-m-7p s-13px' href="/dashboard/Login"> Sign-out </button>
      </div>
      <div className="dropdown : top-5px right-3 top-m-3px float-right ">
          <a href={"/dashboard/Profile"}>
           <Image src="/assets/images/icons/icon-user.png" alt="Vercel Logo" width={27} height={27} />
          </a>
      </div>
      </div>
    </div>
  </>
)
}
