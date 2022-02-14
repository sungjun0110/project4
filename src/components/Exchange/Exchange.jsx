import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from "../Item/Item";
import './Exchange.css';
import * as itemsAPI from '../../utilities/items-api';
import * as exchangesAPI from '../../utilities/exchanges-api';

export default function Exchange({ exchange, user, deleteHandler }) {
    const [giveItem, setGiveItem] = useState();
    const [takeItem, setTakeItem] = useState();
    const [giver, setGiver] = useState('');
    const [taker, setTaker] = useState('');
    const [giveItemUser, setGiveItemUser] = useState('');
    const Navigate = useNavigate();

    useEffect(function() {
        async function getGiveItems(give) {
            const item = await itemsAPI.getItem(give);
            setGiveItem(item);
            setGiveItemUser(item.user._id);
            setGiver(item.user.name);
        };
        async function getTakeItems(take) {
            const item = await itemsAPI.getItem(take);
            setTakeItem(item);
            setTaker(item.user.name);
        }
        getGiveItems(exchange.give);
        getTakeItems(exchange.take);
    }, []);

    function acceptHandler(e) {
        e.preventDefault();
        exchangesAPI.acceptExchange({giveItem: giveItem, takeItem: takeItem, exchangeId: exchange._id});
        Navigate('/completed');
    }

    function rejectHandler() {
        exchangesAPI.rejectExchange(exchange._id);
        deleteHandler(exchange._id);
    }

    return (
        <div className='exchange'>
            <div className='exchange-items'>
                <div className='exchange-item'>
                    <div className='username'>{giver}</div>
                    {giveItem ? <Item name={giveItem.name} photos={giveItem.photos} /> : ''}
                </div>
                <div className='exchange-item'>
                    <div className='username'>{taker}</div>
                    {takeItem ? <Item name={takeItem.name} photos={takeItem.photos} /> : ''}
                </div>
            </div>
            {exchange.isCompleted 
                ? `Exchanged on ${exchange.updatedAt.slice(0, 10)}`
                : user._id === giveItemUser
                    ? <>
                        <p>Waiting</p>
                        <button onClick={rejectHandler}>Cancel</button>
                    </>
                    : <div className='buttons'>
                        <button onClick={(e) => acceptHandler(e)}>Accept</button>
                        <button onClick={rejectHandler}>Reject</button>
                    </div>
            }

            
        </div>
    );
}