import Header from './components/Header'
import React, { useState, useEffect } from 'react'
import FileViewer from 'react-file-viewer'
import { Animate } from 'utils/mockAnimation'
import { motion } from 'framer-motion'
import { saveAs } from 'file-saver'
import ImageErr from 'assets/static/images/backgrouds/Error TV 1.svg'
import FileApi from 'api/http-rest/document/file/fileApi'
const Document = () => {
	const [fileData, setFileData] = useState<any>(null)

	const { document } = useParams()

	useEffect(() => {
		const fetchFileData = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/files/${document}`
				)

				const blob = await response.blob()
				setFileData(blob)
			} catch (error) {
				console.error('Error fetching file:', error)
			}
		}

		fetchFileData()
	}, [])

	const handleFileChange = async (e) => {
		await setFileData(null)
		const file = e.target.files[0]
		await setFileData(file)
	}

	return (
		<div>
			<Header
				className="relative"
				handleFileChange={handleFileChange}
				file={fileData}
			/>

			{fileData ? (
				<div className=" mt-[10px] 80vh overflow-auto">
					<FileViewer
						fileType="docx"
						filePath={URL.createObjectURL(fileData)}
					/>
				</div>
			) : (
				<div className="min-h-[70vh]">
					<motion.div
						{...Animate.getAnimationValues('opacity', 1000)}
						className="flex items-center justify-center flex-col m-14 h-[55vh] rounded-md  "
					>
						<img src={ImageErr} alt="" />
						<Link
							to={'/'}
							className="text-16 text-center block my-14 rounded-sm border-b-2 text-gray-70  w-full dark:text-white"
						>
							No File
							<span className="text-primary font-bold "> Meeting now</span>
						</Link>
					</motion.div>
				</div>
			)}
		</div>
	)
}

export default Document
