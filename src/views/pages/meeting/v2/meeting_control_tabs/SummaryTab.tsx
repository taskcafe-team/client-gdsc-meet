import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Badge } from '@mui/joy'
import { Chat } from '@mui/icons-material'
import { useMeetingSideBar } from '../MeetingSideBarProvider'
import { IMeetingControlTab } from 'pages/meeting/types'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'
import { IconButton, Stack, Typography } from '@mui/material'
import SummaryBox from 'views/containers/meeting/components/SummaryBox'
const SummaryKeywords = () => {
	const { unreadWaitingMessges, setUnreadWaitingMessges, hidden, currentTab } =
		useMeetingSideBar()
	return <SummaryBox title='Summary Keywords' />
}
const SummaryKeywordsIcon = () => {
	// const { unreadWaitingMessges } = useMeetingSideBar()
	return (
		<Badge badgeContent={0} color="primary">
			<ChromeReaderModeIcon />
		</Badge>
	)
}

const SummaryTab: IMeetingControlTab = {
	Icon: SummaryKeywordsIcon,
	Tab: SummaryKeywords,
}

export default SummaryTab
