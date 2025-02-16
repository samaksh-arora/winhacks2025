"use client"
import Image from "next/image"

export default function WaterHeader({title}) {

    return (
        <div className="hero relative w-screen h-[100vh] lg:h-[70vh]">
            <div className="absolute h-[60vh] lg:h-[40vh] top-0 w-screen" style={{background: "var(--sky"}}>
                <Image src="/logo-time.png" className="mx-auto mt-[2vh]" style={{zIndex: 10000}} width={512} height={400} alt="logo" />
            </div>
            <svg
                className="absolute top-[60vh] lg:top-[40vh] w-full"
                viewBox="0 0 1440 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                style={{ fill: "var(--sky)" }}
                d="M0,160L60,144C120,128,240,96,360,101.3C480,107,600,149,720,170.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96V0H0Z"
                />
            </svg>
        </div>
    )
}