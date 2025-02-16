"use client"

import {useState, useEffect} from "react";

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5328/api/leaderboard", {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => setLeaderboard(data.leaderboard))
            .catch((error) => console.error("Error fetching leaderboard:", error));
    }, []);

    return (
        <>
            <h1 className="text-white text-center text-3xl py-2">Leaderboard</h1>
            <div className="w-100 px-10">
                <table className="table-auto overflow-x-auto w-full">
                    <thead>
                        <tr className="text-center text-white font-bold bg-blue-600 text-xl">
                            <th>User Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map(user => (
                            <tr className="text-center text-white even:bg-blue-400 odd:bg-blue-500 text-lg" key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}