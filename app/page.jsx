import WaterHeader from "../components/WaterHeader"

export default function HomePage() {
  return (
    <>
      <WaterHeader title="Let's go!" />
      <div className="w-full flex flex-col mb-20">
        <h3 className="textShadow-dark text-8xl text-center text-white mt-[5vh]">We're talkin' water, of course!</h3>
        <br></br>
        <br></br>
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-center">
          <div className="flex flex-col justify-center items-center">
            <h3 className="textShadow-dark text-8xl text-center text-white">Drink!</h3>
            <br></br>
            <img src="drink.png" width={"300px"} className="rounded-xl"></img>
            <br></br>
            <p className="text-4xl text-center text-white">Log your daily drinking intake!</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="textShadow-dark text-8xl text-center text-white">Get Points!</h3>
            <br></br>
            <img src="leaderboard.png" width={"500px"} className="rounded-xl"></img>
            <br></br>
            <p className="text-4xl text-center text-white">Gain points and compete against others!</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="textShadow-dark text-8xl text-center text-white">Climb!</h3>
            <br></br>
            <img src="badge-best.png" width={"400px"} className="rounded-xl"></img>
            <br></br>
            <p className="text-4xl text-center text-white">Climb the ranks to achieve<br></br>the Master of Moisture badge!</p>
          </div>
        </div>
      </div>
    </>
  )
}
