// ProfilePage.tsx

import { Avatar, Box, Button, Input } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { userFetchUpdateMe } from 'contexts/user'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Tag from 'components/Tag/Tag'
import CustomButton from 'components/Button'
import { motion } from 'framer-motion'
import { Animate } from 'utils/mockAnimation'
import HistoryMeet from './components/HistoryMeet'
import Idea from 'assets/static/images/backgrouds/idea.svg'

import FormInfomation from 'components/FormInfomation/FormInfomation'
import FilesMeet from './components/FilesMeet'
import { meetingRecords } from 'utils/mockHistoryRoom'

export interface IFeature {
	label: string
	description: string
	component: JSX.Element
}
const features: IFeature[] = [
	{
		label: 'History',
		description: 'The room is open you can click on the tag to join.',
		component: <HistoryMeet historys={meetingRecords} />,
	},
	{
		label: 'Folder',
		description: 'Keep track of Folders and their details.',
		component: <FilesMeet></FilesMeet>,
	},
	{
		label: 'Information',
		description: 'Effortlessly organize and manage information with a form.',
		component: <FormInfomation lable="Save" />,
	},
]

const DEFAUFTQUERY = 'role'

const ProfilePage: React.FC = () => {
	const dispatch = useAppDispatch()

	const { role: roleParam } = useParams<{ role?: string }>()
	let [searchParams, setSearchParams] = useSearchParams()
	const DEFAUFT = searchParams.get(DEFAUFTQUERY)
	let [query, setQuery] = useState('')

	const handleQueryParam = (key: string, value: string) => {
		searchParams.set(key, value)
		setSearchParams(searchParams)
		setQuery(value)
	}

	useLayoutEffect(() => {
		if (
			DEFAUFT !== features[0].label &&
			DEFAUFT !== features[1].label &&
			DEFAUFT !== features[2].label
		) {
			handleQueryParam(DEFAUFTQUERY, features[0].label)
			setQuery(features[0].label)
		} else {
			setQuery(`${DEFAUFT}`)
		}
	}, [roleParam, query, DEFAUFT])

	const currentComponent: IFeature | undefined = useMemo(() => {
		return features.find((s) => s.label === query)
	}, [query, roleParam])

	return (
		<main className="mt-[10vh] max-lg:mt-[10vh] max-sm:mt-[5vh]">
			<div className="container mx-auto w-full mt-[10vh] px-[53px] max-2xl:px-10  flex gap-10 max-lg:flex-col">
				<div className="content w-[30%] max-lg:w-full">
					<div className="Review">
						<motion.h2
							{...Animate.getAnimationValues('opacity', 800)}
							className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]"
						>
							{query}
						</motion.h2>
						<motion.p
							{...Animate.getAnimationValues('opacity', 1000)}
							className="max-w-[800px] max-lg:max-w-[600px]  px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]"
						></motion.p>
					</div>
					<motion.div
						className="feature-contianer"
						{...Animate.getAnimationValues('opacity', 1000)}
					>
						<div className="feature-contianer__header flex flex-wrap gap-6">
							{features &&
								features.map((item, index) => (
									<Tag
										key={`feature-${index}`}
										label={item.label}
										active={Boolean(query === item.label)}
										onClick={() => handleQueryParam(DEFAUFTQUERY, item.label)}
									/>
								))}
						</div>
						<div className="feature-contianer__body py-10">
							<div className="flex items-center my-6 gap-4 max-lg:max-w-[600px] px-10 text-gray-700 text-[20px] font-bold text-gray-70 dark:text-white max-sm:text-[18px]">
								<p>Hi Tip for you</p>
								<img src={Idea} className="w-20 h-20" alt="" />
							</div>
							<p className=" max-lg:max-w-[600px] px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
								{currentComponent && currentComponent.description}
							</p>
						</div>
					</motion.div>
				</div>
				<div className="form w-[70%]  max-lg:w-full ">
					{currentComponent && currentComponent.component}
				</div>
			</div>
		</main>
	)
}

export default ProfilePage
