import {
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { TimeField } from '@mui/x-date-pickers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setIsPublic,
	setRSVPOpen,
	setEventType,
	setEventTypeInput,
	setEventTime,
	setEventLoc,
	setInvitedGuestInput,
	setHeadcount,
	setSelectedLabel,
} from '../../../../../../../../../../redux/slices/calendarSlice';
import { createMemory } from '../../../../../../../../../../redux/slices/memorySlice';
import {
	formattedTime,
	tagStyle,
} from '../../../../../../../../../../util/helpers';
import { labelClasses } from '../../../../../../../../../../util/data';
import Cropper from 'react-cropper';
import dayjs from 'dayjs';
import DetailsIcon from '@mui/icons-material/Details';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';

const EventTab = () => {
	const {
		daySelected,
		selectedEvent,
		isPublic,
		rsvpOpen,
		eventType,
		eventTypeInput,
		eventTime,
		eventLoc,
		selectedLabel,
		errors,
	} = useSelector((state) => state.calendar);
	const { success } = useSelector((state) => state.memory);
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [cropped, setCropped] = useState(null);
	const cropperRef = useRef(null);
	const dispatch = useDispatch();

	const onCrop = () => {
		const cropper = cropperRef.current?.cropper;
		// console.log(cropper.getCroppedCanvas().toDataURL());
		setCropped(cropper.getCroppedCanvas());
	};

	const handleChange = (input, value) => {
		const actionMap = {
			public: setIsPublic,
			available: setRSVPOpen,
			type: setEventType,
			other: setEventTypeInput,
			time: (v) => setEventTime(formattedTime(v)),
			loc: setEventLoc,
			label: setSelectedLabel,
			guest: setInvitedGuestInput,
			count: setHeadcount,
		};

		const action = actionMap[input];

		if (action) {
			dispatch(action(value));
		}
	};

	const handleFileChange = (selectedFile) => {
		setFile(selectedFile);

		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			setPreview(null);
			setCropped(null);
		}
	};

	const handleAddMemory = () => {
		const fileName = `${file.name.split('.')[0]}--${
			new Date().toISOString().split('T')[0]
		}`;

		cropped.toBlob((blob) => {
			let memory = new FormData();
			memory.append('memory', blob, fileName);
			memory.append('date', selectedEvent?.date);
			memory.append('location', selectedEvent?.location);
			memory.append('eventId', selectedEvent._id);
			dispatch(createMemory(memory));
		});
	};

	const handleSuccess = useCallback(() => {
		if (success) {
			setFile(null);
			setPreview(null);
			setCropped(null);
		}
	}, [success]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	return (
		<>
			<div className='event-section alt'>
				<Stack direction='row' spacing={1} alignItems='center'>
					<Typography>Private</Typography>
					<Switch
						checked={isPublic}
						onChange={() => handleChange('public', !isPublic)}
						color='secondary'
					/>
					<Typography>Public</Typography>
				</Stack>
			</div>
			<div className='event-section alt'>
				<Stack direction='row' spacing={1} alignItems='center'>
					<Typography>RSVP Closed</Typography>
					<Switch
						checked={rsvpOpen}
						onChange={() => handleChange('available', !rsvpOpen)}
						color='secondary'
					/>
					<Typography>RSVP Open</Typography>
				</Stack>
			</div>
			<div className='event-section alt'>
				<FormControl variant='standard' size='small' fullWidth>
					<InputLabel id='event-type'>Event Type</InputLabel>
					<Select
						labelId='event-type'
						value={eventType}
						onChange={(e) => handleChange('type', e.target.value)}
						fullWidth
					>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						<MenuItem value='Brunch'>Brunch</MenuItem>
						<MenuItem value='Dinner'>Dinner</MenuItem>
						<MenuItem value='Movies'>Movies</MenuItem>
						<MenuItem value='Game Night'>Game Night</MenuItem>
						<MenuItem value='Party'>Party</MenuItem>
						<MenuItem value='other'>Other</MenuItem>
					</Select>
				</FormControl>
				{eventType === 'other' && (
					<TextField
						label='Go on...'
						size='small'
						margin='dense'
						variant='standard'
						fullWidth
						value={eventTypeInput}
						onChange={(e) => handleChange('other', e.target.value)}
						sx={{ mt: '15px' }}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<DetailsIcon className='icon' />
								</InputAdornment>
							),
						}}
					/>
				)}
			</div>
			<div className='event-section'>
				<EventIcon className='icon space' />
				<h5>
					{selectedEvent ? (
						<>{dayjs(selectedEvent.date).format('dddd, MMMM DD')}</>
					) : (
						<>{dayjs(daySelected)?.format('dddd, MMMM DD')}</>
					)}
				</h5>
			</div>
			<div className='event-section'>
				<TimeField
					label='Time'
					size='small'
					margin='dense'
					variant='standard'
					fullWidth
					value={dayjs(eventTime)}
					onChange={(value) => handleChange('time', value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<ScheduleIcon className='icon' />
							</InputAdornment>
						),
					}}
				/>
				{errors?.time && <h6 className='error'>{errors?.time}</h6>}
			</div>
			<div className='event-section'>
				<TextField
					label='Location'
					size='small'
					margin='dense'
					variant='standard'
					fullWidth
					value={eventLoc}
					onChange={(e) => handleChange('loc', e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<MyLocationIcon className='icon' />
							</InputAdornment>
						),
					}}
				/>
				{errors?.location && <h6 className='error'>{errors?.location}</h6>}
			</div>
			<div className='event-section'>
				<BookmarkBorderIcon className='icon space' />
				<div className='tag-swatch'>
					{labelClasses.map((item, i) => (
						<span
							key={i}
							onClick={() => handleChange('label', item)}
							style={tagStyle(item)}
						>
							{selectedLabel === item && <CheckIcon fontSize='4' />}
						</span>
					))}
				</div>
			</div>
			{selectedEvent &&
				dayjs(selectedEvent?.date).isSameOrBefore(new Date(), 'day') && (
					<div className='event-section alt'>
						<MuiFileInput
							placeholder='Click to Upload Memory'
							size='small'
							margin='dense'
							variant='standard'
							fullWidth
							value={file}
							onChange={handleFileChange}
						/>
						<div className='image-preview-container'>
							{preview && (
								<Cropper
									src={preview}
									initialAspectRatio={16 / 9}
									guides={false}
									background={false}
									crop={onCrop}
									ref={cropperRef}
								/>
							)}
						</div>
						<Button disabled={!cropped} onClick={handleAddMemory}>
							Create Memory
						</Button>
					</div>
				)}
		</>
	);
};

export default EventTab;
