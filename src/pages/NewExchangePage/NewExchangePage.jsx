import { useState, useEffect } from 'react';
import * as exchangesAPI from '../../utilities/exchanges-api';
import Exchange from '../../components/Exchange/Exchange';
import './NewExchangePage.css';

export default function NewExchangerPage({ user }) {
    const [exchanges, setExchange] = useState([]);
    
    useEffect(function() {
        async function getExchanges() {
            setExchange(await exchangesAPI.getAll(user._id));
        };
        getExchanges();
    }, []);

    return (
        <div className='NewExchangePage'>
            {exchanges.length > 0 
                ? exchanges.map((exchange, idx) => <Exchange exchange={exchange} key={idx} />) 
                : <p>There is no open exchange.</p>
            }
        </div>
    );
}