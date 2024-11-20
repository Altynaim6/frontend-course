import "./PersonInfo.css";
import React, { useState } from 'react';

const PersonInfo = () => {
    const [person, setPerson] = useState({
        name: "Altynai Munduzbaeva",
        position: "Junior",
        company: "CodeInfinity",
        age: 20,
        location: "Bishkek",
        email: "altynaimunduzbaeva@gmail.com",
    });

    const [message, setMessage] = useState("");
    const [promoted, setPromoted] = useState(false);


    const handleClick = () => {
        setMessage("Position promoted");
        if (!promoted) {
            setPerson((prev) => ({
                ...prev,
                position: "Middle",
            }));
            setPromoted(true);
        }
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

            <button onClick={handleClick}>
                {promoted ? "Position promoted" : "Promote"}
            </button>
        </div>
    );
};

export default PersonInfo;
