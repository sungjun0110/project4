import { useState, useEffect } from 'react';
import * as exchangesAPI from '../../utilities/exchanges-api';
import Exchange from '../../components/Exchange/Exchange';

export default function CompletedExchangePage({ user }) {
    const [exchanges, setExchange] = useState([]);
    
    useEffect(function() {
        async function getExchanges() {
            setExchange(await exchangesAPI.getAllCompleted(user._id));
        };
        getExchanges();
    }, []);

    return (<div className='NewExchangePage'>
            {exchanges.map((exchange, idx) => <Exchange exchange={exchange} key={idx}   user={user} idx={idx} />) 
            }
        </div>);
}