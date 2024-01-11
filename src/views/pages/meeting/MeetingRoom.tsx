import { Box, Stack } from '@mui/joy'
import React from 'react'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { RoomType } from 'api/webrtc/webRTCTypes'
import {
	LiveKitRoom,
	VideoConference,
	useTracks,
	useIsMuted,
	useSpeakingParticipants,
} from '@livekit/components-react'
import { Loading } from 'views/routes/routes'
import { RoomApi } from 'api/http-rest/room/roomApi'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'
import { ParticipantEvent, Track } from 'livekit-client'
import {
	getTrackReferenceId,
	isLocal,
	isMobileBrowser,
} from '@livekit/components-core'
import { useAppSelector } from 'contexts/hooks'
import SocketIOManager from 'contexts/keywords/socket'
import {
	startSpeechRecognition,
	stopSpeechRecognition,
} from 'utils/microsoft-cognitiveservices-speech'
import { useDispatch } from 'react-redux'
import { IKeyword, keywordFetch, keywordPost } from 'contexts/keywords'

const MeetingSidebar = lazy(() => import('./v2/MeetingSideBar'))

type KeyResType = {
	endAt: Date
	startAt: Date
	keywords: string[]
}

export default function MeetingRoom() {
	const navigate = useNavigate()
	const user = useAppSelector((s) => s.meeting.meetings)
	const { localParticipant, meetingId, roomList } = useMeeting()
	const meetingRoom = roomList.get(RoomType.MEETING)
	const waitingRoom = roomList.get(RoomType.WAITING)
	const ditpatch = useDispatch();

	if (!meetingRoom || !waitingRoom) throw new Error('MeetingRoom error')
	if (!localParticipant) throw new Error('Local participant is null')
	const [keywords, setKeyWords] = useState<KeyResType[]>([])

	const sendContentMeetingOfHost = (content: string) => {
		console.log(content);
		SocketIOManager.getSocket.emit('send_data', content)
	}

	const listeneKeyGen = () => {
		SocketIOManager.getSocket.on('speechToKeywords', (data: KeyResType) => {
			console.log("Key", data)

			ditpatch(keywordFetch(data as IKeyword)) 
			setKeyWords((pre) => {
				const updated = [...pre]
				updated.push(data)

				return updated
			})
		})
	}

	const listnerPartSpeed = () => {
		meetingRoom.originalRoom.localParticipant.on(
			ParticipantEvent.IsSpeakingChanged,
			(speaking: boolean) => {
				speaking
					? startSpeechRecognition(async (text) => {
						sendContentMeetingOfHost(text);
					  })
					: stopSpeechRecognition()
			}
		)
	}

	const connectKeyGenAI = async () => {
		await SocketIOManager.connect()
		await SocketIOManager.ping((e) => {
console.log("ping" ,e)
		})
		const partInf = {
			ID: localParticipant.id,
			NAME: localParticipant.name,
			USERID: localParticipant.userId,
			ROLE: localParticipant.role,
			MEETINGID: localParticipant.meetingId,
		}
		await SocketIOManager?.getSocket.emit('send_user_info', partInf)
		listnerPartSpeed()
		listeneKeyGen()
	
	}

	const connectRoom = () => {
		//Connect meeting room
		RoomApi.getAccessToken(meetingId, meetingRoom.roomId)
			.then((res) => {
				meetingRoom.connect(res.data.token)
				connectKeyGenAI()
			})
			.catch(() => navigate('/'))
	}



	useLayoutEffect(() => {
		connectRoom()
		return () => {
			// Todo: bug join room
			meetingRoom.disconnect()
		}
	}, [])
	if (meetingRoom.state === 'disconnected') return <Loading />
	return (
		<Box sx={{ display: 'flex', minHeight: '100dvh' }} bgcolor={'black'}>
			<MeetingSidebar />
			<Box
				width={1}
				height={1}
				component="main"
				className="MainContent"
				sx={{ flex: 1 }}
			>
				<Stack
					width={1}
					height={1}
					overflow="hidden"
					sx={{ '& button.lk-chat-toggle': { display: 'none' } }}
				>
					<LiveKitRoom
						style={{ width: '100%', height: '100%' }}
						data-lk-theme="default"
						room={meetingRoom.originalRoom}
						onDisconnected={() => navigate('/')}
						connectOptions={{ autoSubscribe: false }}
						token={undefined}
						serverUrl={undefined}
					>
						<VideoConference />
					</LiveKitRoom>
				</Stack>
			</Box>
		</Box>
	)
}
