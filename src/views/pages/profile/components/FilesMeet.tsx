import React, { useCallback, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import ImageFile from 'assets/static/images/backgrouds/File.svg'
import ImageFouder from 'assets/static/images/backgrouds/Fouder.svg'
import { Animate } from 'utils/mockAnimation'
import {
	IFile,
	IFolder,
	getFilesByUserId,
	getFoldersByUserId,
} from 'utils/mockFile'
import Tag from 'components/Tag/Tag'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface FilesMeetProps {}

const FilesMeet: React.FC<FilesMeetProps> = (props) => {
	const [fouder, setFouder] = useState<IFolder[]>([])
	const [file, setFile] = useState<IFile[]>([])
	const [filterState, setFilterState] = useState({
		filterFile: false,
		filterFouder: false,
	})
	const [historyFouder, setHistoryFouder] = useState<Array<string>>([])
	const handleFouder = useCallback((parent_folder_id) => {
		// Xử lý khi click vào thư mục
		
	}, [])

	const handleFile = useCallback(() => {
		// Xử lý khi click vào tệp
	}, [])

	const Firter = useMemo(() => {
		return [
			{
				lable: 'View All',
				active: Boolean(
					filterState.filterFile == false && filterState.filterFouder == false
				),
				onClick: () => {
					setFilterState({
						filterFile: false,
						filterFouder: false,
					})
				},
			},
			{
				lable: 'By Fouder',
				active: Boolean(
					filterState.filterFile == false && filterState.filterFouder == true
				),
				onClick: () => {
					setFilterState({
						filterFile: false,
						filterFouder: true,
					})
				},
			},
			{
				lable: 'By Fouder',
				active: Boolean(
					filterState.filterFile == true && filterState.filterFouder == false
				),
				onClick: () => {
					setFilterState({
						filterFile: true,
						filterFouder: false,
					})
				},
			},
		]
	}, [filterState])

	useLayoutEffect(() => {
		// call API
		const userFolders = getFoldersByUserId(userIdToRetrieve)
		const userFiles = getFilesByUserId(userIdToRetrieve)
		setFouder(userFolders)
		setFile(userFiles)
	}, [])

	return (
		<div className="FilesMeet">
			<div className="FilesMeet__header flex items-center gap-8 mb-4">
				{historyFouder.length != 0 && (
					<motion.div
						{...Animate.getAnimationValues('opacity', 800)}
						className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px] flex items-center"
					>
						<ArrowBackIcon fontSize={'inherit'} />
					</motion.div>
				)}
<motion.div
						{...Animate.getAnimationValues('opacity', 800)}
						className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px] flex items-center"
					>
						<ArrowBackIcon fontSize={'inherit'} />
					</motion.div>
				<div className="flex items-center gap-4">
					{Firter &&
						Firter.map((tag) => (
							<Tag
								active={tag.active}
								label={tag.lable}
								onClick={tag.onClick}
							/>
						))}
				</div>
			</div>
			<div className="FilesMeet__body p-10 flex gap-6 flex-wrap w-full max-h-[80vh] overflow-y-scroll max-sm:max-h-none max-sm:overflow-y-auto">
				{fouder &&
					filterState.filterFouder != true &&
					fouder.map((fouder: IFolder, index) => (
						<motion.div
							{...Animate.getAnimationValues('opacity', 1000)}
							key={index}
							onClick={() => {
								handleFouder(fouder.parent_folder_id)
							}}
							className="cursor-pointer w-[100px] max-w-[100px] file-item flex flex-col items-center justify-center"
						>
							{/* Hiển thị thông tin thư mục hoặc giao diện tại đây */}
							<img
								src={ImageFouder}
								alt=""
								className="h-60 w-60 object-contain"
							/>
							<motion.p
								{...Animate.getAnimationValues('opacity', 2000)}
								className="max-w-[200px] line-clamp-1 max-lg:max-w-[300px] px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]"
							>
								{fouder.name}
							</motion.p>
						</motion.div>
					))}
				{file &&
					filterState.filterFile != true &&
					file.map((file: IFile, index) => (
						<motion.div
							{...Animate.getAnimationValues('opacity', 1000)}
							key={index}
							onClick={handleFouder}
							className="cursor-pointer w-[100px] max-w-[100px] file-item flex flex-col items-center justify-center"
						>
							{/* Hiển thị thông tin thư mục hoặc giao diện tại đây */}
							<img
								src={ImageFile}
								alt=""
								className="h-60 w-60 object-contain"
							/>
							<motion.p
								{...Animate.getAnimationValues('opacity', 2000)}
								className="max-w-[200px] line-clamp-1 max-lg:max-w-[300px] px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]"
							>
								{file.name}
							</motion.p>
						</motion.div>
					))}
			</div>
		</div>
	)
}

const userIdToRetrieve = '1c9b004f-4adc-4d6f-b704-73ba049739c6'

FilesMeet.propTypes = {}

export default FilesMeet
