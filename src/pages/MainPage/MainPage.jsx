import './MainPage.css';
import ItemsPage from '../ItemsPage/ItemsPage';

export default function MainPage({ user }) {
    return (
        <main id='MainPage'>
            <ItemsPage user={user} />
        </main>
    );
}