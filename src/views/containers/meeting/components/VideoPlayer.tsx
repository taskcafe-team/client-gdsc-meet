export default function VideoPlayer({
	videoAllowed = false,
	// audioAllowed = false,
	flipX = false,
	flipY = false,
	...props
}) {
	const videoRef = useRef<HTMLVideoElement>(null)

	const startCamera = () => {
		if (navigator.mediaDevices)
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((stream) => {
					if (videoRef.current) {
						videoRef.current.srcObject = stream
						videoRef.current.volume = 0
					}
				})
				.catch((error) => console.log('Something went wrong! ', error))
	}

	const stopCamera = () => {
		if (!videoRef.current) return
		const stream = videoRef.current.srcObject
		if (stream) {
			const tracks = stream as MediaStream
			tracks.getTracks().forEach((track) => track.stop())
			videoRef.current.srcObject = null
		}
	}

	useEffect(() => {
		if (!videoRef.current) return
		let transform = ''
		if (flipX) transform += 'scaleX(-1)'
		if (flipY) transform += ' scaleY(-1)'

		videoRef.current.style.transform = transform.trim()
	}, [flipX, flipY])

	useLayoutEffect(() => {
		if (videoAllowed) startCamera()
		else stopCamera()
	}, [videoAllowed])

	useLayoutEffect(() => {
		return () => {
			if (navigator.mediaDevices)
				navigator.mediaDevices
					.getUserMedia({ video: false, audio: false })
					.catch(() => {})
					.finally(() => stopCamera)
		}
	}, [])

	return (
		<video
			playsInline
			ref={videoRef}
			autoPlay={true}
			style={{ display: 'block', height: '100%', objectFit: 'cover' }}
			{...props}
		/>
	)
}
