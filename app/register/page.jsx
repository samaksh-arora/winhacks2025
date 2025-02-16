"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const onSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match. Please try again.");
            return;
        }

        // Proceed with API request
        fetch('http://localhost:5328/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            })
        }).then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                router.push('/dashboard');
                router.refresh();
            } else {
                setErrorMessage(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="text-white flex items-center justify-center min-h-screen drop-shadow-xl">
                <div className="bg-[var(--sky)] flex flex-col p-10 border-4 border-black rounded-lg">
                    <div className="flex justify-center">
                        <h1 className="text-[3rem] m-2 textShadow">Register</h1>
                    </div>

                    <label className="textShadow text-xl">Name</label>
                    <input type="text" className="border-2 border-black text-xl text-black" value={name} onChange={(e) => setName(e.target.value)} required />

                    <br />

                    <label className="textShadow text-xl">Email</label>
                    <input type="text" className="border-2 border-black text-xl text-black" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <br />

                    <label className="textShadow text-xl">Password</label>
                    <input type="password" className="border-2 border-black text-xl text-black" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <br />

                    <label className="textShadow text-xl">Confirm Password</label>
                    <input type="password" className="border-2 border-black text-xl text-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    {/* Error Message */}
                    {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}
                    <br />

                    <div className="flex justify-center">
                        <button className="bg-[var(--background)] rounded-xl p-3">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
