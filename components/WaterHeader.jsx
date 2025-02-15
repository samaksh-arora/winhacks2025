"use client"

export default function WaterHeader({title}) {

    return (
        <div className="hero relative w-screen h-[100vh]">
            <div className="absolute h-[40vh] top-0 w-screen" style={{background: "var(--sky"}}>
                {title && (
                    <div className="absolute top-3/4 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-white text-4xl font-bold">{title}</h1>
                    </div>
                )}
            </div>
            <svg
                className="absolute top-[40vh] w-full"
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