"use client"
import {useState, useEffect} from "react";
import Badge from "./Badge";

export default function BadgeList({points}) {
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5328/api/badges")
            .then((response) => response.json())
            .then((data) => setBadges(data.badges))
            .catch((error) => console.error("Error fetching badges:", error));
    }, []);

    console.log(points);

    return (
        <div className="grid grid-cols-4 gap-4 max-h-[50vh] my-auto overflow-y-auto">
            {badges.map((badge) => (
                <Badge key={badge.id} title={badge.name} points={badge.cost} bought={badge.cost < points} icon={badge.icon} />
            ))}
        </div>
    );
}