import { useState, useEffect } from 'react';
import $ from 'jquery';
import * as exchangesAPI from '../../utilities/exchanges-api';
import Exchange from '../../components/Exchange/Exchange';
import './NewExchangePage.css';

export default function NewExchangerPage({ user }) {
    const [exchanges, setExchange] = useState([]);
    const [exchangesMap, setExchangesMap] = useState([]);
    
    useEffect(function() {
        async function getExchanges() {
            setExchange(await exchangesAPI.getAll(user._id));
        };
        getExchanges();
    }, []);

    useEffect(function() {
        setExchangesMap(exchanges.map((exchange, idx) => <Exchange exchange={exchange} key={idx}   user={user} idx={idx} deleteHandler={deleteHandler} />));
    }, [exchanges])

    function deleteHandler(exchangeId) {
        setExchangesMap([]);
        setExchange(exchanges.filter((exchange) =>  exchange._id !== exchangeId));
    }

    return (
        <div className='NewExchangePage'>
            {exchangesMap.length > 0 ? exchangesMap : 'No exchanges'}
        </div>
    );
}