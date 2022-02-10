import './MainPage.css';
import ItemsPage from '../ItemsPage/ItemsPage';
import MapPage from '../MapPage/MapPage';

export default function MainPage() {
    return (
        <main id='MainPage'>
            <MapPage />
            <ItemsPage />
        </main>
    );
}