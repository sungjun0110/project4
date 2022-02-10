import './Item.css';

export default function Item({ name, photos, value }) {
    return (
        <div className="Item">
            <img src={photos} />
            <h4>name: {name}</h4>
            value: {value} &nbsp;
        </div>
    );
}