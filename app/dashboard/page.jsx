"use client"
import WaterTank from "../../components/WaterTank"
import WaterBottle from "../../components/WaterBottle"
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [fill, setFill] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [points, setPoints] = useState(0);
    return (
        <>
            <h1 className="text-white text-center text-3xl py-2">My Dashboard</h1>
            <div className="grid grid-cols-3 gap-4 justify-items-center">
                <WaterTank fill={fill} multiplier={multiplier}/>
                <WaterBottle fill={fill} setFill={setFill} multiplier={multiplier} setMultiplier={setMultiplier}/>
                <WaterBottle fill={fill} setFill={setFill} multiplier={multiplier} setMultiplier={setMultiplier}/>
            </div>

            
        </>
    )
}