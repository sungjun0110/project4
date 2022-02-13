import { useState } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import UploadImageToS3 from '../UploadImageToS3/UploadImageToS3';
import './ItemForm.css';

export default function ItemForm({ user, itemHandler }) {
    const [item, setItem] = useState({
        user: user,
        name: '',
        value: '',
        photos: '',
    })

    function handleChange(evt) {
        setItem({...item, [evt.target.name]: evt.target.value});
    }

    function handlePhotos(address) {
        setItem({...item, photos: address})
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const newItem = await itemsAPI.createItem(item);
        itemHandler(newItem);
        setItem({user: user, name: '', value: '', photos: ''})
    }

    return (
        <form className='ItemForm' onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={item.name} onChange={handleChange} required />
            <label>Value</label>
            <input type="text" name="value" value={item.value} onChange={handleChange} required />          
            <UploadImageToS3 handlePhotos={handlePhotos} />
        </form>
    );
}