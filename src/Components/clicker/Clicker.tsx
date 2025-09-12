import {useState} from "react";
import "./clicker.css";
import logo from "/monster-nobg.png";
import {usePointsStore} from "../../utils/pointsStore";

export default function Clicker() {
    const addPoint = usePointsStore((state) => state.addPoint);

    const [isPulsing, setIsPulsing] = useState(false);

    const handleClick = () => {
        addPoint();
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 200);
    };

    return (
        <div className="clicker-container">
            <div
                style={{
                    height: "150px",
                    width: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <img
                    src={logo}
                    alt="logo"
                    className={`clicker-logo ${isPulsing ? "pulse" : ""}`}
                    onClick={handleClick}
                    style={{width: "150px", cursor: "pointer", margin: "auto"}}
                />
            </div>
        </div>
    );
}
