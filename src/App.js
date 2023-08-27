import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import PostData from './screens/PostData';


function App() {
  return (
      <BrowserRouter>
        <main>
          <Routes>
                         
            <Route path='/' element={<PostData />} />
          
          </Routes>
        </main>
    </BrowserRouter>
  );
}

export default App;
