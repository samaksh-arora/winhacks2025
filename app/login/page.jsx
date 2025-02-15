"use client"

import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const onSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cf60886 (debugging backend)
=======

    router.push('/dashboard');
    router.refresh();

>>>>>>> c7e0584 (login and register todo)
        fetch('http://localhost:5328/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    password: password,
  })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error); // Handle errors
  });
<<<<<<< HEAD
<<<<<<< HEAD
=======
  
>>>>>>> c7e0584 (login and register todo)
    }
    return (
<<<<<<< HEAD
=======
        fetch("localhost:5328/api/login",{
            method: "POST",
            body: {
                email: email,
                password: password
            }
        }).then((res)=>{console.log(res)})
=======
>>>>>>> cf60886 (debugging backend)
    }
    return (
>>>>>>> c85049c (Finished login page UI)
        <form onSubmit={onSubmit}>
            <div className="text-white flex items-center justify-center min-h-screen drop-shadow-xl">
                <div className="bg-[var(--sky)] flex flex-col p-10 border-4 border-black rounded-lg">
                        <div className="flex justify-center">
                            <h1 className="text-[3rem] m-2 textShadow">Login</h1>
                        </div>
                        <label className="textShadow text-xl">Email</label>
                        <input type="text" className="border-2 border-black text-xl text-black" value={email} onChange={(e)=>(setEmail(e.target.value))} required></input>
                        <br></br>
                        <label className="textShadow text-xl">Password</label>
                        <input type="password" className="border-2 border-black text-xl text-black" onChange={(e)=>(setPassword(e.target.value))} required></input>
                        <br></br>
                        <br></br>
                        <div className="flex justify-center">
                            <button className='bg-[var(--background)] rounded-xl p-3'>Submit</button>
                        </div>
                </div>
<<<<<<< HEAD
            </div>
        </form>
=======
        <div className="text-white flex place-center justify-center">
            <div className="bg-[var(--sky)] flex flex-col p-10">
                <h1 className="text-[3rem]">Login</h1>
                <label>Email</label>
                <input type="text" className="m-2"></input>
                <label>Password</label>
                <input type="password" className="m-2"></input>
            </div>
            
        </div>
>>>>>>> 35adb1a (Started basic login page)
=======
            </div>
        </form>
>>>>>>> c85049c (Finished login page UI)
    )
}