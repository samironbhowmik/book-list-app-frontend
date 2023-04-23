import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './components/signup';
import Signin from './components/signin';
import Home from './components/home';
import AddBook from './components/addBook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Signin/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/addbook' element={<AddBook/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
