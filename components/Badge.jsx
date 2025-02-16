"use client"
import Image from "next/image"

var icons = [
    "badge-blank",
    "badge-new",
    "badge-one",
    "badge-heart",
    "badge-check",
    "badge-diamonds",
    "badge-money",
    "badge-thumbs-up",
    "badge-lightning",
    "badge-star",
    "badge-best"
]

export default function Badge({title, points, bought, icon}) {
    let color = bought ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    return (
        <>
            <div style={{background: color}}>
                <Image className={"mx-auto" + (bought ? "" : " grayscale")} src={`/${icons[icon]}.png`} alt={icons[icon]} width={64} height={64} />
                <h2 className="text-center text-white text-lg/6">{title}</h2>
                <h3 className="text-center text-white text-md">{points}</h3>
            </div>
        </>
    )
}