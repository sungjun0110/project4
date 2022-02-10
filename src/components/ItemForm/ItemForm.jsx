import { useState } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import UploadImageToS3 from '../UploadImageToS3/UploadImageToS3';

export default function ItemForm() {
    const [item, setItem] = useState({
        name: '',
        value: '',
        photos: '',
        // lat: 0,
        // lng: 0,
    })

    function handleChange(evt) {
        setItem({...item, [evt.target.name]: evt.target.value});
    }

    function handlePhotos(address) {
        console.log(address);
        setItem({...item, photos: address})
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        itemsAPI.createItem(item);
        setItem({name: '', value: '', photos: ''})
    }

    return (
        <div>
            <div onSubmit={handleSubmit}>
                <form>
                    <label>Name</label>
                    <input type="text" name="name" value={item.name} onChange={handleChange} required />
                    <label>Value</label>
                    <input type="text" name="value" value={item.value} onChange={handleChange} required />          
                    <UploadImageToS3 handlePhotos={handlePhotos} />
                </form>
            </div>
        </div>
    );
}