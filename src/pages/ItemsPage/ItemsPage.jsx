import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as itemsAPI from '../../utilities/items-api';
import Item from "../../components/Item/Item"
import './ItemsPage.css';

export default function ItemsPage({ user }) {
    const [items, setItems] = useState([]);

    useEffect(function() {
        async function getItems() {
            const allItems = await itemsAPI.getAll(user._id);
            setItems(allItems);
        };
        getItems();
    }, [])

    return (
        <div id="ItemsPage">
            {items.map((item, idx) => (
                <Link to={`/items/${item._id}`} key={idx}>
                    <Item key={idx} name={item.name} photos={item.photos} value={item.value} />
                </Link>
            ))}
        </div>
    );
}