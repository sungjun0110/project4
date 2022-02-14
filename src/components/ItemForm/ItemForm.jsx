import { useState, useEffect } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import UploadImageToS3 from '../UploadImageToS3/UploadImageToS3';
import './ItemForm.css';

export default function ItemForm({ user, itemHandler }) {
    const [item, setItem] = useState({
        user: user,
        name: '',
        description: '',
        photos: '',
        condition: 'Like New',
    })
    const [fileName, setFileName] = useState('');

    useEffect(function() {
        setItem({...item, photos: fileName});
    }, [fileName])

    function handleChange(evt) {
        setItem({...item, [evt.target.name]: evt.target.value});
    }

    function conditionHandler(newCondition) {
        setItem({...item, condition: newCondition});
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const newItem = await itemsAPI.createItem(item);
        itemHandler(newItem);
        setItem({user: user, name: '', description: '', photos: '', condition: 'Like New'})
    }

    return (
        <form className='ItemForm' onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={item.name} onChange={handleChange} required />
            <label>Description</label>
            <textarea name="description" value={item.value} onChange={handleChange} required />
            <select value={item.condition} onChange={(evt) => conditionHandler(evt.target.value)} name="condition">
                <option value='Like New'>Like New</option>
                <option value='Good Condition'>Good Condition</option>
                <option value='Little Scratches'>Little Scratches</option>
                <option value='Damaged But Functioning'>Damaged But Functioning</option>
                <option value='NotWorking'>Not Working</option>
            </select>        
            <UploadImageToS3 setFileName={setFileName} />
        </form>
    );
}