import React, { useCallback, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import ImageFile from 'assets/static/images/backgrouds/File.svg'
import ImageFouder from 'assets/static/images/backgrouds/Fouder.svg'
import { Animate } from 'utils/mockAnimation'
import {
	IFile,
	IFolder,
	getFilesByFouderID,
	getFilesByUserId,
	getFoldersByUserId,
} from 'utils/mockFile'
import Tag from 'components/Tag/Tag'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RouterPath from 'views/routes/routesContants'

interface FilesMeetProps {}

const FilesMeet: React.FC<FilesMeetProps> = (props) => {
	const [fouder, setFouder] = useState<IFolder[]>([])
	const [file, setFile] = useState<IFile[]>([])
	const navigate = useNavigate()
	const [filterState, setFilterState] = useState({
		filterFile: false,
		filterFouder: false,
	})
	const [historyFouder, setHistoryFouder] = useState<boolean>(false)
	const handleFouder = useCallback((parent_folder_id) => {
		// Xử lý khi click vào thư mục
		const files = getFilesByFouderID(parent_folder_id)
		setHistoryFouder(true)
		setFile(files)
	}, [])

	const handleFile = useCallback((fileId: string) => {
		// Xử lý khi click vào tệp
		// window.open(`${RouterPath.DOCUMENT_URL}/${fileId}`, '_blank');
	}, [])

	const handleReset = useCallback(() => {
		setHistoryFouder(false)
	}, [])

	const Firter = useMemo(() => {
		return [
			{
				lable: 'My Fouder',
				active: Boolean(historyFouder == false),
				className: `${Boolean(historyFouder == false) ? 'flex' : 'hidden'}`,
			},
			{
				lable: 'My File',
				active: Boolean(historyFouder == true),
				className: `${Boolean(historyFouder == true) ? 'flex' : 'hidden'}`,
			},
		]
	}, [filterState, historyFouder])

	useLayoutEffect(() => {
		// call API
		const userFolders = getFoldersByUserId(userIdToRetrieve)
		setFouder(userFolders)
	}, [])

	return (
		<div className="FilesMeet">
			<div className="FilesMeet__header flex items-center gap-8 mb-4 h-30px max-h-[30px]">
				{historyFouder == true && (
					<motion.div
						onClick={handleReset}
						{...Animate.getAnimationValues('opacity', 800)}
						className="cursor-pointer max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px] flex items-center"
					>
						<ArrowBackIcon fontSize={'inherit'} />
					</motion.div>
				)}
				<div className="flex items-center gap-4">
					{Firter &&
						Firter.map((tag) => (
							<Tag
								active={tag.active}
								label={tag.lable}
								className={tag.className}
							/>
						))}
				</div>
			</div>
			<div className="FilesMeet__body p-10 flex gap-6 flex-wrap w-full max-h-[80vh] overflow-y-scroll max-sm:max-h-none max-sm:overflow-y-auto">
				{fouder &&
					historyFouder != true &&
					fouder.map((fouder: IFolder, index) => (
						<motion.div
							{...Animate.getAnimationValues('opacity', 1000)}
							key={index}
							onClick={() => {
								handleFouder(fouder.id)
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
					historyFouder == true &&
					file.map((file: IFile, index) => (
						<a href={`/${RouterPath.getDocumentPath(file.id)}`} target="_blank">
							<motion.div
								{...Animate.getAnimationValues('opacity', 1000)}
								key={index}
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
						</a>
					))}
			</div>
		</div>
	)
}

const userIdToRetrieve = '1c9b004f-4adc-4d6f-b704-73ba049739c6'

FilesMeet.propTypes = {}

export default FilesMeet
