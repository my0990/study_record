import './App.css';
import {Route, Routes} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import PostPage from './pages/PostPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage/>}/>
      <Route path="/post" element={<PostPage/>}/>
    </Routes>
  );
}

export default App;
