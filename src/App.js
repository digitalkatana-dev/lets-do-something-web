import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import NavMenu from './components/NavMenu';
import Main from './features/Main';
import Profile from './features/Profile';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<NavMenu />
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
