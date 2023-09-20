import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('/api/items/')
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Our Front Page</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;