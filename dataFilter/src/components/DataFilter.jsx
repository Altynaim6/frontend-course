import React, { useState, useEffect } from 'react';
import './DataFilter.css'

const DataFilter = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const sampleData = [
                { id: 1, name: 'Altynai' },
                { id: 2, name: 'Zhanetta' },
                { id: 3, name: 'Aisuluu' },
                { id: 4, name: 'Roza' },
                { id: 5, name: 'Sasha' },
                { id: 6, name: 'Bermet' },
                { id: 7, name: 'Dilnaz' },
                { id: 8, name: 'Aikan' },
                { id: 9, name: 'Anjelika' },
                { id: 10, name: 'Aijan' },
            ];
            setData(sampleData);
        };

        fetchData();
    }, []);

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1>Data filter</h1>
            <input
                type="text"
                placeholder="Enter text to search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {filteredData.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DataFilter;
