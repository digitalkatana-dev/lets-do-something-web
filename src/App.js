import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import NavMenu from './components/NavMenu';
import Main from './features/Main';
import Profile from './features/Profile';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
	const { user } = useSelector((state) => state.user);

	return (
		<div className='App'>
			<Router>
				<Navbar />
				<NavMenu />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/profile' element={user ? <Profile /> : <Main />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
