import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { MeetingSideBarState, MeetingTabControl } from '../types'

export const MeetingSideBarContext = createContext<MeetingSideBarState>({
	hidden: false,
	currentTab: 'participant_control',
	unreadMeetingMessges: 0,
	unreadWaitingMessges: 0,
	setHidden: () => {},
	setCurrentTab: () => {},
	setUnreadMeetingMessges: () => {},
	setUnreadWaitingMessges: () => {},
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
	const [unreadWaitingMessges, setUnreadWaitingMessges] = useState(0)

	if (!meetingId) return <Navigate to="/" />
	return (
		<MeetingSideBarContext.Provider
			value={{
				hidden,
				currentTab,
				unreadMeetingMessges,
				unreadWaitingMessges,
				setCurrentTab,
				setHidden,
				setUnreadMeetingMessges,
				setUnreadWaitingMessges,
			}}
		>
			{children}
		</MeetingSideBarContext.Provider>
	)
}
