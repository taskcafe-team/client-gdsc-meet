import {
	Avatar,
	Box,
	Dropdown,
	IconButton,
	Input,
	List,
	ListItem,
	ListItemContent,
	ListItemDecorator,
	Menu,
	MenuButton,
	MenuItem,
	Stack,
	Typography,
} from '@mui/joy'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { MoreVert } from '@mui/icons-material'
import { MeetingContext } from '../MeetingContext'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'
import { RoomType } from 'api/webrtc/webRTCTypes'

type ParticipantControlTab = {
	hidden?: boolean
}
export default function ParticipantControlTab({
	hidden = false,
}: ParticipantControlTab) {
	const { roomConnections } = useContext(MeetingContext)
	const meetingRoom = useMemo(() => {
		const room = roomConnections.get(RoomType.MEETING)
		const localParticipantId = room?.localParticipantId ?? ''
		const participants = room?.participants
		const localParticipant = participants?.get(localParticipantId)
		if (!room || !participants || !localParticipant) return null
		return {
			roomType: RoomType.MEETING,
			room: room.room,
			localParticipantId,
			localParticipant,
			participants,
		}
	}, [roomConnections.get(RoomType.MEETING)])
	if (!meetingRoom) return <Navigate to="/" />

	return (
		<Box height={1} overflow="hidden" display={hidden ? 'none' : undefined}>
			<Stack spacing={1} p={1}>
				<Stack>
					<Typography
						variant="outlined"
						textAlign="center"
						sx={{ m: 0, borderRadius: 10, p: 1 }}
						level="body-md"
						fontWeight="bold"
					>
						All Participant
					</Typography>
				</Stack>
				<Stack>
					<Input
						sx={{ borderRadius: 10 }}
						size="lg"
						startDecorator={<SearchIcon />}
						placeholder="Find Participant"
					/>
				</Stack>
				<Stack>
					<Typography level="body-sm">Online Participant</Typography>
					<List sx={{ '--ListItemDecorator-size': '56px' }}>
						<ListItem sx={{ p: 0, my: 0.5 }}>
							<ListItemDecorator>
								<Avatar variant="solid" src="/static/images/avatar/1.jpg" />
							</ListItemDecorator>
							<ListItemContent>
								<Typography level="title-md" noWrap>
									<span>(You) </span>
									{meetingRoom.localParticipant.name}
								</Typography>
							</ListItemContent>
							<ListItemDecorator sx={{ m: 0, justifyContent: 'end' }}>
								{/* <DropDown /> */}
							</ListItemDecorator>
						</ListItem>
						{Array.from(meetingRoom.participants.entries()).map(
							([participantId, participant], i) => {
								if (participantId == meetingRoom.localParticipantId) return
								return (
									<ListItem key={i} sx={{ p: 0, my: 0.5 }}>
										<ListItemDecorator>
											<Avatar
												variant="solid"
												src="/static/images/avatar/1.jpg"
											/>
										</ListItemDecorator>
										<ListItemContent>
											<Typography level="title-md" noWrap>
												{participant.name}
											</Typography>
										</ListItemContent>
										<ListItemDecorator sx={{ m: 0, justifyContent: 'end' }}>
											{/* <DropDown /> */}
										</ListItemDecorator>
									</ListItem>
								)
							}
						)}
					</List>
				</Stack>
			</Stack>
		</Box>
	)
}

const DropDown = () => {
	return (
		<Dropdown>
			<MenuButton
				slots={{ root: IconButton }}
				slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
			>
				<MoreVert />
			</MenuButton>
			<Menu>
				<MenuItem>Kick</MenuItem>
			</Menu>
		</Dropdown>
	)
}
