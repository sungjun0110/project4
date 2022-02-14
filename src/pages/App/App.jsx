import './App.css';
import { useState } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import MainPage from '../MainPage/MainPage';
import MyItemsPage from '../MyItemsPage/MyItemsPage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';
import NewExchangePage from '../NewExchangePage/NewExchangePage';
import CompletedExchangePage from '../ CompletedExchangePage/CompletedExchangePage';

export default function App() {
  const [user, setUser] = useState(getUser());

  function ItemDetail() {
    let { itemId } = useParams();
    return <ItemDetailPage itemId={itemId} user={user} />;
  }

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <div className='main-container'>
            <Routes>
              <Route path="/" element={<MainPage user={user} />} />
              <Route path="/myitems" element={<MyItemsPage user={user} />} />
              <Route path="/items/:itemId" element={<ItemDetail />} />
              <Route path="/exchange" element={<NewExchangePage user={user}/>} />
              <Route path="/completed" element={<CompletedExchangePage user={user} />} />
            </Routes>
          </div>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

