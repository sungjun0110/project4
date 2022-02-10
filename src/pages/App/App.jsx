import './App.css';
import { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import MainPage from '../MainPage/MainPage';
import MyItemsPage from '../MyItemsPage/MyItemsPage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  function ItemDetail() {
    let { itemId } = useParams();
    return <ItemDetailPage itemId={itemId} />;
  }

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/myitems" element={<MyItemsPage />} />
            <Route path="/items/:itemId" element={<ItemDetail />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

