import './Item.css';

export default function Item({ name, photos }) {
    return (
        <div className="Item">
            <img src={photos} />
            <h4>{name}</h4>
        </div>
    );
}