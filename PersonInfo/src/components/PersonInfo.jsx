import "./PersonInfo.css";
import { useState } from "react";

const PersonInfo = () => {
    const person = {
        name: "Altynai Munduzbaeva",
        position: "Frontend Developer",
        company: "CodeInfinity",
        age: 20,
        location: "Bishkek",
        email: "altynaimunduzbaeva@gmail.com",
    };

    const [message, setMessage] = useState("");

    const handleClick = () => {
        setMessage("Above the button");
    };

    return (
        <div>
            <h1>{person.name}</h1>
            <p>Position: {person.position}</p>
            <p>Company: {person.company}</p>
            <p>Age: {person.age}</p>
            <p>City: {person.location}</p>
            <p>Email: {person.email}</p>
            {message && <p className="message">{message}</p>}
            <button onClick={handleClick}>Promote</button>
        </div>
    );
};

export default PersonInfo;
