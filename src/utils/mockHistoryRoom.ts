import { MeetingType } from "api/http-rest/meeting/meetingApiType";
import { MeetingInfo } from "contexts/meeting";


export const meetingRecords = [
	{
	  id: 'meeting1',
	  friendlyId: 'm1',
	  title: 'Team Sync-up',
	  startTime: '2023-11-15T09:00:00Z',
	  endTime: '2023-11-15T10:00:00Z',
	  description: 'Discuss current projects and blockers.',
	  status: MeetingType.PUBLIC,
	},
	{
	  id: 'meeting2',
	  friendlyId: 'm2',
	  title: 'Client Presentation',
	  startTime: '2023-11-16T14:30:00Z',
	  endTime: '2023-11-16T16:00:00Z',
	  description: 'Present the latest project updates to the client.',
	  status: MeetingType.PUBLIC,
	},
	{
	  id: 'meeting3',
	  friendlyId: 'm3',
	  title: 'Past Meeting',
	  startTime: '2023-11-14T08:00:00Z',
	  endTime: '2023-11-14T09:00:00Z',
	  description: 'This meeting has already ended.',
	  status: MeetingType.PUBLIC,
	},
	// Thêm 10 bản ghi mới
	{
	  id: 'meeting4',
	  friendlyId: 'm4',
	  title: 'Planning Session',
	  startTime: '2023-11-20T11:00:00Z',
	  endTime: '2023-11-20T12:30:00Z',
	  description: 'Discuss plans for the upcoming quarter.',
	  status: MeetingType.PUBLIC,
	},
	{
	  id: 'meeting5',
	  friendlyId: 'm5',
	  title: 'Code Review',
	  startTime: '2023-11-21T15:00:00Z',
	  endTime: '2023-11-21T16:30:00Z',
	  description: 'Review and discuss recent code changes.',
	  status: MeetingType.PUBLIC,
	},
	{
	  id: 'meeting6',
	  friendlyId: 'm6',
	  title: 'Product Roadmap',
	  startTime: '2023-11-22T10:00:00Z',
	  endTime: '2023-11-22T11:30:00Z',
	  description: 'Discuss the roadmap for the product.',
	  status: MeetingType.PUBLIC,
	},
	{
	  id: 'meeting7',
	  friendlyId: 'm7',
	  title: 'Marketing Strategy',
	  startTime: '2023-11-23T13:00:00Z',
	  endTime: '2023-11-23T14:30:00Z',
	  description: 'Plan marketing strategies for the next campaign.',
	  status: MeetingType.PUBLIC,
	},
	{
	  id: 'meeting8',
	  friendlyId: 'm8',
	  title: 'QA Testing',
	  startTime: '2023-11-24T09:00:00Z',
	  endTime: '2023-11-24T10:30:00Z',
	  description: 'Review and test the latest software updates.',
	  status: MeetingType.PUBLIC,
	},
	{
	  id: 'meeting9',
	  friendlyId: 'm9',
	  title: 'Team Building',
	  startTime: '2023-11-25T14:00:00Z',
	  endTime: '2023-11-25T15:30:00Z',
	  description: 'Engage in team-building activities.',
	  status: MeetingType.PUBLIC,
	},
	{
	  id: 'meeting10',
	  friendlyId: 'm10',
	  title: 'Budget Review',
	  startTime: '2023-11-26T11:30:00Z',
	  endTime: '2023-11-26T13:00:00Z',
	  description: 'Review and discuss the budget for the next quarter.',
	  status: MeetingType.PUBLIC,
	},
	{
		id: 'meeting13',
		friendlyId: 'm13',
		title: 'Technical Training',
		startTime: '2023-11-29T10:00:00Z',
		endTime: '2023-11-29T12:00:00Z',
		description: 'Provide technical training to the development team.',
		status: MeetingType.PUBLIC,
	  },
	  {
		id: 'meeting14',
		friendlyId: 'm14',
		title: 'Product Demo',
		startTime: '2023-11-30T15:30:00Z',
		endTime: '2023-11-30T17:00:00Z',
		description: 'Demo the latest product features to stakeholders.',
		status: MeetingType.PUBLIC,
	  },
	  {
		id: 'meeting15',
		friendlyId: 'm15',
		title: 'Client Feedback',
		startTime: '2023-12-01T11:00:00Z',
		endTime: '2023-12-01T12:30:00Z',
		description: 'Gather feedback from clients on the current projects.',
		status: MeetingType.PUBLIC,
	  },
	  {
		id: 'meeting16',
		friendlyId: 'm16',
		title: 'Bug Bash',
		startTime: '2023-12-02T09:30:00Z',
		endTime: '2023-12-02T11:00:00Z',
		description: 'Coordinate a bug bash to identify and fix software bugs.',
		status: MeetingType.PUBLIC,
	  },
	  {
		id: 'meeting17',
		friendlyId: 'm17',
		title: 'Team Retrospective',
		startTime: '2023-12-03T14:00:00Z',
		endTime: '2023-12-03T15:30:00Z',
		description: 'Reflect on the team\'s performance and discuss improvements.',
		status: MeetingType.PUBLIC,
	  },
	  {
		id: 'meeting18',
		friendlyId: 'm18',
		title: 'Project Kickoff',
		startTime: '2023-12-04T10:30:00Z',
		endTime: '2023-12-04T12:00:00Z',
		description: 'Kickoff a new project with the project team.',
		status: MeetingType.PUBLIC,
	  },
	  {
		id: 'meeting19',
		friendlyId: 'm19',
		title: 'Sales Strategy',
		startTime: '2023-12-05T13:30:00Z',
		endTime: '2023-12-05T15:00:00Z',
		description: 'Discuss and plan the sales strategy for the upcoming quarter.',
		status: MeetingType.PUBLIC,
	  },
	  {
		id: 'meeting20',
		friendlyId: 'm20',
		title: 'Company All-Hands',
		startTime: '2023-12-06T09:00:00Z',
		endTime: '2023-12-06T10:30:00Z',
		description: 'Host an all-hands meeting to update the entire company.',
		status: MeetingType.PUBLIC,
	  },
	// Các hội nghị khác
  ];
