import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Item from '../../components/Item/Item';
import * as itemsAPI from '../../utilities/items-api';
import ItemForm from "../../components/ItemForm/ItemForm";
import './MyItemsPage.css';

export default function MyItemsPage({ user }) {
    const [items, setItems] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);

    useEffect(function () {
        async function getMyItems() {
            setItems(await itemsAPI.getMyItems(user._id));
        }
        getMyItems();
    }, []);

    function itemHandler(newItem) {
        setItems([...items, newItem]);
    }

    function formButtonHandler() {
        setIsFormActive(!isFormActive);
    }

    return (
        <>
            {isFormActive ? <ItemForm user={user} itemHandler={itemHandler} /> : ''}
            <button className='form-btn' onClick={formButtonHandler}>{isFormActive ? 'Close' : 'Add an item'}</button>
            <div className='items-container'>
                {items.map((item, idx) => (
                    <Link to={`/items/${item._id}`} key={idx}>
                        <Item key={idx} name={item.name} photos={item.photos} value={item.value} />
                    </Link>
                ))}
            </div>
        </>
    );
}