"use client"
import WaterTank from "../../components/WaterTank"
import WaterBottle from "../../components/WaterBottle"
import { useState, useEffect } from "react";
import BadgeList from "../../components/BadgeList"

export default function DashboardPage() {
    const [fill, setFill] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [points, setPoints] = useState(0);
    const [checkPts, setCheckPts] = useState(false);
    useEffect(()=>{
        fetch("http://localhost:5328/api/get-points",{
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
              }
        }).then(response => response.json())
        .then(data => {
            if (data.status !== "success") {
                // Handle error.
            }
            setPoints(data.points);
            setMultiplier(data.multiplier);
            setFill(data.points / (1000 * multiplier));
        },)
    },[])
    useEffect(()=>{
        if(checkPts){
            fetch("http://localhost:5328/api/get-points",{
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                  }
            }).then(response => response.json())
            .then(data => {
                if (data.status !== "success") {
                    // Handle error.
                }
                setPoints(data.points);
                setMultiplier(data.multiplier);
                setCheckPts(false)
            }) 
        }
        
    },[checkPts])
    return (
        <>
            <div className="grid grid-cols-3 gap-4 justify-items-center">
                <WaterTank fill={fill} multiplier={multiplier} points={points}/>
                <BadgeList points={points} />
                <WaterBottle fill={fill} setFill={setFill} multiplier={multiplier} setMultiplier={setMultiplier} setCheck={setCheckPts}/>
            </div>
        </>
    )
}