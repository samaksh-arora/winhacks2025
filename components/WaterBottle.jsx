"use client"
import { useState } from 'react'
export default function WaterBottle({fill, setFill, multiplier, setMultiplier, setCheck}){
    const [option, setOption] = useState("Cup (250ml)")
    const [customMl, setCustomMl] = useState(0)
    const [showLevelUp, setShowLevelUp] = useState(false);
    const options = {
        "Cup (250ml)": "cup.png",
        "Bottle (500ml)": "water.png",
        "Stanley (1200ml)": "stanley.png",
        "Custom (Enter ml)": "custom.png"
    }
    function addPoints(pts,multiplier){
        fetch("http://localhost:5328/api/drink",{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                amount:pts,
                multiplier: multiplier
              })
        }).then(response=>response.json())
        .then(data=>{
            console.log(data.message)
            setCheck(true)
        });
    }
    function addWater(ml){
        const percent = fill+((ml/(1000*multiplier))*100)
        if(percent>=100){
            var existingMl = (fill/100)*1000*multiplier
            var originalModifierPts = ((1000*multiplier) - existingMl)*multiplier
            setFill(100);
            const remainingMl = (ml - ((1000*multiplier) - existingMl));
            setShowLevelUp(true);
            setTimeout(() => {
                setShowLevelUp(false);
            }, 3000);
            setTimeout(() => {
                setFill((remainingMl/(1000*(multiplier+1)))*100)
            }, "1500");
            const pts = originalModifierPts + (remainingMl * (multiplier + 1))
            addPoints(pts,multiplier+1)
        }
        else{
            setFill(percent);
            addPoints(ml*multiplier,multiplier)
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
        addWater(ml);
    }
    return(
        <form onSubmit={onSubmit}>
        <div className="flex flex-col justify-center items-center h-screen">
                <img src={options[option]} width={"300px"} height={"300px"}></img>
                <select className="w-[200px]" onChange={(e) => setOption(e.target.value)}>
                    <option>Cup (250ml)</option>
                    <option>Bottle (500ml)</option>
                    <option>Stanley (1200ml)</option>
                    <option>Custom (Enter ml)</option>
                </select>
                {option=="Custom (Enter ml)" && 
                <input className="border-2 border-black text-xl text-black w-[200px] rounded pl-2 mt-2" type="number" placeholder='ml' value={customMl} min="1" max="1000" onChange={(e) => setCustomMl(parseInt(e.target.value))}></input>
                }
                <br></br>
                <button className="text-2xl textShadow text-white border border-black p-2 rounded-md bg-[var(--sky)]">Drink</button>
        </div>
        {showLevelUp && (
            <div className="fixed top-[10vh] left-[40vw] transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xl font-bold py-3 px-6 rounded-lg shadow-lg animate-bounce">
                🎉 Congratulations! You leveled up! 🚀
            </div>
        )}
        </form>
    )
}