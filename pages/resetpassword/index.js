import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { onLogin } from '../../services/auth'
import { useState } from 'react';

export default function Home() {
  const router = useRouter()
  
  const [vistPassword, setVisPassword] = useState(false)
  
const submitLogin = async (e) => {
  console.log(e)
  e.preventDefault()
  let data = e.target
  console.log(data)
  onLogin(data).then((response) => {
    console.log(response)
    switch (response.status_code) {
      case 200:
        const data = response.items.data;
        window.localStorage.setIten('access_token', response.items.access_token);
        window.localStorage.setItem('users_data', JSON.stringify(response.items.data));
        window.localStorage.setItem('expires_in', JSON.stringify(response.items.expires_in));
        router.replace("/dashboard");
        break;
      case 402:
        Swal.fire({
          title: 'เข้าสู่ระบบ ไม่สำเร็จ!',
          text: JSON.stringify(response.message.Message),
          icon: 'Error',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#CCCCFF'
        })
        break;

      default:
        Swal.fire({
          titel: 'เข้าสู่ระบบ ไม่สำเร็จ!',
          text: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
          icon: 'error',
          showConfirmButton: false,
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#CCCCFF'
        })
        break;
    }
  })
};

const visibledPassword = () => {
  if (vistPassword == true) {
    setVisPassword(false);
    document.getElementById('password').type = 'password';
  } else {
    setVisPassword(true);
    document.getElementById('password').type = 'text';
  }
};

return (
  <div>
    <Head>
      <title> Log in | Chack-In-Man </title>
      <meta name = "description" content='Generated by create next app' />
    </Head>

    <main>

        <div className='div1'>
        <h1 className='block text-center text-5xl fort-knit'>resetpassword <br/> Home </h1>

            <form id='form-login' onSubmit={submitLogin} className="relative">
            </form>

      </div>
    </main>

    <footer>

    </footer>
  </div>
)
}