
import { useEffect } from 'react';
import { RouterProvider} from "react-router-dom";
import router from './routes/router';
import './App.css'
import { Users } from './contexts/Users';
import { DeckProvider } from './contexts/DeckContext';

function App() {
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }, [])
  return (
      <Users>
        <DeckProvider>
          <RouterProvider router={router} />
        </DeckProvider>
      </Users>
  )
}

export default App;
