import { useState, useEffect } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import './ItemDetailPage.css';

export default function ItemDetailPage({ itemId }) {
    const [item, setItem] = useState({});

    useEffect(function() {
        async function getItem() {
            const item = await itemsAPI.getItem(itemId);
            setItem(item);
        }
        getItem();
    }, []);

    function deleteHandler() {
        
    }

    return (
        <div>
            <img src={item.photos} />
            {item.name}
            {item.value}
            <button onClick={deleteHandler}>Delete</button>
        </div>
    )
}