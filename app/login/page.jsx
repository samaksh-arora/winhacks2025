"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const onSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5328/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                router.push('/dashboard');
                router.refresh();
            } else {
                console.error('Login failed:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        router.push('/dashboard');
        router.refresh();
    }
return (
    <form onSubmit={onSubmit}>
        <div className="text-white flex items-center justify-center min-h-screen drop-shadow-xl">
            <div className="bg-[var(--sky)] flex flex-col p-10 border-4 border-black rounded-lg">
                <div className="flex justify-center">
                    <h1 className="text-[3rem] m-2 textShadow">Login</h1>
                </div>
                <label className="textShadow text-xl">Email</label>
                <input type="text" className="border-2 border-black text-xl text-black" value={email} onChange={(e) => (setEmail(e.target.value))} required></input>
                <br></br>
                <label className="textShadow text-xl">Password</label>
                <input type="password" className="border-2 border-black text-xl text-black" onChange={(e) => (setPassword(e.target.value))} required></input>
                <br></br>
                <br></br>
                <div className="flex justify-center">
                    <button className='bg-[var(--background)] rounded-xl p-3'>Submit</button>
                </div>
            </div>
        </div>
    </form>
)
}