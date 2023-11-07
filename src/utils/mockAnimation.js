export class Animate {
	static getAnimationValues = (animationName, damping) => {
		const animations = {
			opacity: {
				initial: { opacity: 0, translateY: '20%' },
				animate: { opacity: 1, translateY: '0%' },
				transition: {
					type: 'keyframes',
					stiffness: 260,
					damping: damping, // Sử dụng giá trị damping ở đây
				},
			},
			// Thêm các loại animation khác nếu cần
		}

		return animations[animationName] || {}
	}
}
