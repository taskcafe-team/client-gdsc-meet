import React, { useState, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { motion } from 'framer-motion'
import { Animate } from 'utils/mockAnimation'
import Tag from 'components/Tag/Tag'
import FormInfomation from 'components/FormInfomation/FormInfomation'


const features = [
	{
		lable: 'Meeting',
		description:
			'A meeting is a gathering of individuals to discuss, make decisions, or exchange information. It can take place in person or online through various applications. Meetings are often planned with specific objectives.',
	},
	{
		lable: 'AI keywords',
		description:
			'This functional task is to generate important keywords from the meeting, creating a concise, easy-to-understand summary of the meeting content.',
	},
	{
		lable: 'Fouder',
		description:
			'feature that automatically stores important data after a meeting. Once the meeting concludes, it automatically records and stores the data on the cloud or a server, ensuring no loss of vital information, making it convenient for reference and sharing',
	},
]

const ConfirmPage: React.FC = () => {
	const DEFAUFT = features[0].lable
	const [feature, setFeature] = useState(DEFAUFT)
	const dispatch = useAppDispatch()
	const user = useAppSelector((s) => s.user)

	const handleContent = useMemo(() => {
		return features.find((s) => s.lable === feature)
	}, [feature])

	return (
		<main className="mt-[10vh] ">
			<div className="contianer  max-2xl:mt-[20vh] max-sm:mt-[10vh]  px-[53px] max-2xl:px-10  flex  gap-10 max-lg:flex-col-reverse">
				<div className="content w-[50%] max-2xl:w-full flex flex-col items-start">
					<div className="Review">
						<motion.h2
							{...Animate.getAnimationValues('opacity', 800)}
							className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]"
						>
							Welcome to GDSC meet
						</motion.h2>
						<motion.p
							{...Animate.getAnimationValues('opacity', 1000)}
							className="max-w-[800px] max-lg:max-w-[600px]  px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]"
						>
							GDSC Meet is a versatile video conferencing and meeting service
							that offers secure and high-quality video calling and
							collaboration features, catering to users across a wide range of
							devices and platforms for a seamless communication experience.
						</motion.p>
					</div>
					<div className="feature">
						<motion.h2
							{...Animate.getAnimationValues('opacity', 800)}
							className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]"
						>
							Feature
						</motion.h2>

						<motion.div
							className="feature-contianer"
							{...Animate.getAnimationValues('opacity', 1000)}
						>
							<div className="feature-contianer__header flex flex-wrap gap-6">
								{features &&
									features.map((item, index) => (
										<Tag
											key={`feature-${index}`}
											label={item.lable}
											active={Boolean(feature === item.lable)}
											onClick={() => setFeature(item.lable)}
										/>
									))}
							</div>
							<div className="feature-contianer__body py-20 min-h-[10vh]">
								<p className="max-w-[800px] max-lg:max-w-[600px]  px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
									{handleContent && handleContent.description}
								</p>
							</div>
							<div className="gap-2 mb-auto  w-full py-4 ml-2 text-18 text-gray-70  max-sm:text-xl text-gray-500 dark:text-gray-30  ">
								<span>Wish you have a good experience</span>
								<span className="text-primary font-bold ">Thank you</span>
							</div>
						</motion.div>
					</div>
				</div>
				<div className="from w-[50%]  max-2xl:w-full">
					<FormInfomation lable={"Next"}/>
				</div>
			</div>
		</main>
	)
}

export default ConfirmPage
