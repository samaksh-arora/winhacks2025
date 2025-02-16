"use client"
import WaterTank from "../../components/WaterTank"
import WaterBottle from "../../components/WaterBottle"
import { useState, useEffect } from "react";
import BadgeList from "../../components/BadgeList"

export default function DashboardPage() {
    const [fill, setFill] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [points, setPoints] = useState(0);

    useEffect(()=>{
        fetch("http://localhost:5328/api/get-points",{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(response => response.json())
        .then(data => {
            if (data.status !== "success") {
                // Handle error.
            }
            console.log("Points from backend: " + data.points)
            setPoints(data.points);
        })
    })
    return (
        <>
            <div className="grid grid-cols-3 gap-4 justify-items-center">
                <WaterTank fill={fill} multiplier={multiplier} points={points}/>
                <BadgeList points={points} />
                <WaterBottle fill={fill} setFill={setFill} multiplier={multiplier} setMultiplier={setMultiplier}/>
            </div>
        </>
    )
}