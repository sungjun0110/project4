import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemsAPI from '../../utilities/items-api';
import * as exchangesAPI from '../../utilities/exchanges-api';
import Item from '../../components/Item/Item';
import './ItemDetailPage.css';

export default function ItemDetailPage({ user, itemId }) {
    const [item, setItem] = useState({});
    const [myItems, setMyItems] = useState([]);
    const [exchange, setExchange] = useState({take: null, give: null});
    const navigate = useNavigate();

    useEffect(function() {
        async function getItem() {
            const item = await itemsAPI.getItem(itemId);
            setItem(item);
        }
        getItem();
    }, [itemId]);

    async function deleteHandler(e) {
        e.preventDefault();
        await itemsAPI.deleteItem(itemId);
        navigate('/myitems');
    }

    async function offerHandler(giveId, giver) {
        setExchange({give: giveId, giver: giver, take: itemId, taker: item.user})
    }

    useEffect(function() {
        function createExchange() {
            exchangesAPI.createExchange(exchange);
        }
        if (exchange.take) createExchange();
    }, [exchange]);

    async function myitemHandler() {
        setMyItems(await itemsAPI.getMyItems(user._id));
    }

    function selectHandler(myItem) {
        offerHandler(myItem._id, myItem.user);
    }

    return (
        <div>
            <div className='item-container'>
                <div className='img-container'>
                    <img src={item.photos} alt='item' />
                </div>
                <div className='item-description'>
                    {Object.keys(item).length > 0 
                        ?
                            <>
                                <div className='username'>{item.user.name}</div>
                                <div className='content'>
                                    <span className='title'>{item.name}</span>
                                    <br />
                                    {item.value}
                                </div>
                            </>
                        : ''
                    }
                </div>
            </div>
            {
                user._id === item.user
                ? <button onClick={deleteHandler}>Delete</button>
                : <button onClick={myitemHandler}>Offer an exchange</button>
            }
            <hr />
            {myItems.map((myItem, idx) => 
                <button onClick={() => selectHandler(myItem)} key={idx}>
                    <Item name={myItem.name} photos={myItem.photos} value={myItem.value} key={idx} />
                </button>
            )}
        </div>
    )
}