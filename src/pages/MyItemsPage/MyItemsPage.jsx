import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
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
        const formDiv = $('.form-div');
        if (formDiv.css('height') === '500px') $('.form-div').css('height', '0px');
        else $('.form-div').css('height', '500px')
    }

    return (
        <>
            <div className='items-container'>
                {items.map((item, idx) => (
                    <Link to={`/items/${item._id}`} key={idx}>
                        <Item key={idx} name={item.name} photos={item.photos} value={item.value} />
                    </Link>
                ))}
            </div>

            <div className='form-div'>
                {isFormActive ? <ItemForm user={user} itemHandler={itemHandler} /> : ''}
            </div>
            <button className='form-btn' onClick={formButtonHandler}>{isFormActive ? 'Close' : 'Add an item'}</button>
        </>
    );
}