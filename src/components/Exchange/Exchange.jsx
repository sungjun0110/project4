import { useState, useEffect } from 'react';
import Item from "../Item/Item";
import './Exchange.css';
import * as itemsAPI from '../../utilities/items-api';
import * as exchangesAPI from '../../utilities/exchanges-api';

export default function Exchange({ exchange, user, deleteHandler }) {
    const [giveItem, setGiveItem] = useState();
    const [takeItem, setTakeItem] = useState();
    const [giveItemUser, setGiveItemUser] = useState('');

    useEffect(function() {
        async function getGiveItems(give) {
            const item = await itemsAPI.getItem(give);
            setGiveItem(item);
            setGiveItemUser(item.user._id);
        };
        async function getTakeItems(take) {
            const item = await itemsAPI.getItem(take);
            setTakeItem(item);
        }
        getGiveItems(exchange.give);
        getTakeItems(exchange.take);
    }, []);

    function exchangeHandler() {
        exchangesAPI.acceptExchange({giveItem: giveItem, takeItem: takeItem, exchangeId: exchange._id});
    }

    function rejectHandler() {
        exchangesAPI.rejectExchange(exchange._id);
        deleteHandler(exchange._id);
    }

    return (
        <div className='exchange'>
            <div className='exchange-items'>
                {giveItem ? <Item name={giveItem.name} photos={giveItem.photos} value={giveItem.value} /> : ''}
                {takeItem ? <Item name={takeItem.name} photos={takeItem.photos} value={takeItem.value} /> : ''}
            </div>
            {exchange.isCompleted 
                ? `Exchanged on ${exchange.updatedAt.slice(0, 10)}`
                : user._id === giveItemUser
                    ? <>
                        <p>Waiting</p>
                        <button onClick={rejectHandler}>Cancel</button>
                    </>
                    : <div className='buttons'>
                        <button onClick={exchangeHandler}>Accept</button>
                        <button onClick={rejectHandler}>Reject</button>
                    </div>
            }

            
        </div>
    );
}