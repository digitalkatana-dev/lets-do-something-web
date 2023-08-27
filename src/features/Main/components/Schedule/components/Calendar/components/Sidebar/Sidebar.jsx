import './sidebar.scss';
import ActionBtn from './components/ActionBtn';
import SmallCalendar from './components/SmallCalendar';

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<ActionBtn label='RSVP' actionType='rsvp' />
			<SmallCalendar />
		</div>
	);
};

export default Sidebar;
