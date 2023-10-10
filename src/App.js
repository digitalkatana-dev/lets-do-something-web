import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import NavMenu from './components/NavMenu';
import ProtectedRoute from './components/ProtectedRoute';
import Main from './features/Main';
import Profile from './features/Profile';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<NavMenu />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/reset-password/:id' element={<Main />} />
					<Route
						path='/profile'
						element={<ProtectedRoute element={<Profile />} />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
