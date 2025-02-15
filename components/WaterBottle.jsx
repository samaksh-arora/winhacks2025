"use client"
import { useState } from 'react'
export default function WaterBottle({fill, setFill, multiplier, setMultiplier, setPoints}){
    const [option, setOption] = useState("Cup (250ml)")
    const [customMl, setCustomMl] = useState(0)
    const options = {
        "Cup (250ml)": "cup.png",
        "Bottle (500ml)": "water.png",
        "Stanley (1200ml)": "stanley.png",
        "Custom (Enter ml)": "custom.png"
    }
    function addWater(ml){
        const percent = fill+((ml/(1000*multiplier))*100)
        if(percent>=100){
            setMultiplier((prev)=>(prev+1));
            setFill(100);
            setTimeout(() => {
                const remainingMl = (ml - (1000*(multiplier)))
                setFill((200/(1000*(multiplier+1)))*100)
            }, "1500");
            
        }
        else{
            setFill(percent);
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        var ml = 0;
        if(option != "Custom (Enter ml)"){
            const match = option.match(/\((\d+)\D*\)/);
            ml = match[1];
        }
        else{
            ml = customMl;
        }
        console.log(ml);
        addWater(ml);
    }
    return(
        <form onSubmit={onSubmit}>
        <div className="flex flex-col justify-center items-center h-screen">
                <img src={options[option]} width={"300px"} height={"300px"}></img>
                <select onChange={(e) => setOption(e.target.value)}>
                    <option>Cup (250ml)</option>
                    <option>Bottle (500ml)</option>
                    <option>Stanley (1200ml)</option>
                    <option>Custom (Enter ml)</option>
                </select>
                {option=="Custom (Enter ml)" && 
                <input type="number" placeholder='ml' value={customMl} min="1" max="1000" onChange={(e) => setCustomMl(parseInt(e.target.value))}></input>
                }
                <button className="text-2xl text-white border border-black p-2 rounded-md bg-black">Drink</button>
        </div>
        </form>
    )
}