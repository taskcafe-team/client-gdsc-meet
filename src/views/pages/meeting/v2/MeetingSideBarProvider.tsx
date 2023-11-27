import ParticipantApi, {
	RespondJoinStatus,
} from 'api/http-rest/participant/participantApi'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { MeetingSideBarState, MeetingTabControl } from '../types'

export const MeetingSideBarContext = createContext<MeetingSideBarState>({
	hidden: false,
	currentTab: 'participant_control',
	unreadMeetingMessges: 0,
	setHidden: () => {},
	setCurrentTab: () => {},
	setUnreadMeetingMessges: () => {},
})
export const useMeetingSideBar = () => React.useContext(MeetingSideBarContext)

export default function MeetingSideBarProvider({
	children,
}: React.PropsWithChildren) {
	const { meetingId } = useMeeting()

	const [hidden, setHidden] = useState(false)
	const [currentTab, setCurrentTab] = useState<MeetingTabControl>(
		'participant_control'
	)
	const [unreadMeetingMessges, setUnreadMeetingMessges] = useState(0)

	if (!meetingId) return <Navigate to="/" />
	return (
		<MeetingSideBarContext.Provider
			value={{
				hidden,
				currentTab,
				unreadMeetingMessges,
				setCurrentTab,
				setHidden,
				setUnreadMeetingMessges,
			}}
		>
			{children}
		</MeetingSideBarContext.Provider>
	)
}
