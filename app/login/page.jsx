export default function LoginPage() {
    return (
        <div className="text-white flex place-center justify-center">
            <div className="bg-[var(--sky)] flex flex-col p-10">
                <h1 className="text-[3rem]">Login</h1>
                <label>Email</label>
                <input type="text" className="m-2"></input>
                <label>Password</label>
                <input type="password" className="m-2"></input>
            </div>
            
        </div>
    )
}