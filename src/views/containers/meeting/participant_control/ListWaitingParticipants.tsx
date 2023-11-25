import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
	ListItemContent,
	ListItemDecorator,
	Sheet,
	Avatar,
	Button,
	ListItem,
	Stack,
	Typography,
	List,
	ListSubheader,
	Checkbox,
} from '@mui/joy'
import { Collapse } from '@mui/material'
import React from 'react'
import { useMeetingState } from '../MeetingContext'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { Loading } from 'views/routes/routes'
import ParticipantApi, {
	RespondJoinStatus,
} from 'api/http-rest/participant/participantApi'
import useToastily from 'hooks/useToastily'

export default function ListWaitingParticipants() {
	const { roomConnecteds } = useMeetingState()
	const waitingRoom = roomConnecteds.get(RoomType.WAITING)
	const participants = waitingRoom?.remoteParticipants
	const toast = useToastily()

	const [open, setOpen] = useState(true)
	const [selected, setSelected] = useState<Map<string, boolean>>(new Map())
	const [fetching, setFetching] = useState(false)

	const respondRequestJoin = useCallback(
		async (status: RespondJoinStatus) => {
			if (!waitingRoom || fetching) return
			setFetching(true)
			const participantIds = Array.from(selected.keys())
			const res = await ParticipantApi.respondRequestJoinMeeting({
				meetingId: waitingRoom.roomId,
				participantIds,
				status,
			})
				.catch(() => toast({ content: 'Respond Fail', type: 'error' }))
				.finally(() => setFetching(false))
		},
		[waitingRoom, fetching]
	)

	const toggleSelected = useCallback((id: string) => {
		setSelected((p) => {
			const newSelected = new Map(p)
			if (p.get(id) ?? false) newSelected.delete(id)
			else newSelected.set(id, true)
			return newSelected
		})
	}, [])

	const toggleSelectedAll = useCallback(
		(c: boolean) => {
			if (!waitingRoom) return
			setSelected((prev) => {
				if (!c) return new Map()
				else {
					const newSelected = new Map()
					waitingRoom.remoteParticipants.forEach((p) =>
						newSelected.set(p.id, true)
					)
					return newSelected
				}
			})
		},
		[waitingRoom]
	)

	if (!waitingRoom || !participants) return <Loading />
	return (
		<Sheet sx={{ maxHeight: 300, overflowY: 'auto' }}>
			<List sx={{ p: 0, '--ListItemDecorator-size': '56px' }}>
				<ListItem sx={{ p: 0, my: 0.5 }}>
					<ListSubheader
						sx={{ p: 0, my: 0.5 }}
						onClick={() => setOpen((p) => !p)}
					>
						Waiting Participant
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListSubheader>
				</ListItem>
				{participants.size > 0 && (
					<Collapse in={open} timeout="auto" unmountOnExit>
						<ListItem sx={{ p: 0, my: 0.5 }}>
							<ListItemContent></ListItemContent>
							<ListItemDecorator sx={{ m: 0 }}>
								<Button
									loading={fetching}
									onClick={() => respondRequestJoin(RespondJoinStatus.ACCEPTED)}
									disabled={selected.size === 0}
									size="sm"
									sx={{ borderRadius: 50 }}
									variant="soft"
								>
									accepts
								</Button>
								<Button
									loading={fetching}
									onClick={() => respondRequestJoin(RespondJoinStatus.REJECTED)}
									disabled={selected.size === 0}
									size="sm"
									sx={{ borderRadius: 50 }}
									variant="soft"
									color="warning"
								>
									rejects
								</Button>
							</ListItemDecorator>
							<ListItemDecorator sx={{ m: 0 }}>
								<Checkbox
									onChange={(e) => toggleSelectedAll(e.target.checked)}
								/>
							</ListItemDecorator>
						</ListItem>
						{Array.from(participants.entries()).map(
							([participantId, participant], i) => (
								<ListItem key={i} sx={{ p: 0, my: 0.5 }}>
									<ListItemDecorator>
										{/* {//TODO: Chua add src} */}
										<Avatar variant="solid" src={''} />
									</ListItemDecorator>
									<ListItemContent>
										<Typography level="title-md" noWrap>
											{participant.name}
										</Typography>
									</ListItemContent>
									<ListItemDecorator sx={{ m: 0 }}>
										<Checkbox
											checked={selected.get(participantId) ?? false}
											onChange={(e) => toggleSelected(participantId)}
										/>
									</ListItemDecorator>
								</ListItem>
							)
						)}
					</Collapse>
				)}
			</List>
		</Sheet>
	)
}
