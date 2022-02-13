import { useState, useEffect } from 'react';
import Item from "../Item/Item";
import './Exchange.css';
import * as itemsAPI from '../../utilities/items-api';
import * as exchangesAPI from '../../utilities/exchanges-api';

export default function Exchange({ exchange }) {
    const [giveItem, setGiveItem] = useState();
    const [takeItem, setTakeItem] = useState();

    useEffect(function() {
        async function getGiveItems(give) {
            const item = await itemsAPI.getItem(give);
            setGiveItem(item);
        };
        async function getTakeItems(take) {
            const item = await itemsAPI.getItem(take);
            setTakeItem(item);
        }
        getGiveItems(exchange.give);
        getTakeItems(exchange.take);
    }, []);

    function exchangeHandler() {
        console.log(exchange._id);
        exchangesAPI.acceptExchange({giveItem: giveItem, takeItem: takeItem, exchangeId: exchange._id});
    }

    return (
        <div className='exchange'>
            <div className='exchange-items'>
                {giveItem ? <Item name={giveItem.name} photos={giveItem.photos} value={giveItem.value} /> : ''}
                {takeItem ? <Item name={takeItem.name} photos={takeItem.photos} value={takeItem.value} /> : ''}
            </div>
            <button onClick={exchangeHandler}>Accept</button>
        </div>
    );
}