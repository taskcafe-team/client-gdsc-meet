	import * as sdk from 'microsoft-cognitiveservices-speech-sdk'

	const SPEECH_KEY: string = '8413587b5f7a42dcba46239ed25e24ac'
	const SPEECH_REGION: string = 'eastasia'
	const speechConfig = sdk.SpeechConfig.fromSubscription(
		SPEECH_KEY,
		SPEECH_REGION
	)
	speechConfig.speechRecognitionLanguage = 'vi-VN'
	const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput()
	let recognizer: sdk.SpeechRecognizer
	let interimResults: string = ''
	let resultCallback: Function

	const startSpeechRecognition = (onResult: Function) => {
		resultCallback = onResult
		recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)
		recognizer.recognizing = (_, event) => {
			onResult(event.result.text)
		}
		recognizer.startContinuousRecognitionAsync(
			() => {},
			(error) => {
				console.log('Speech recognition error:', error)
			}
		)
	}

	const stopSpeechRecognition = () => {
		if (recognizer) {
			recognizer.stopContinuousRecognitionAsync(
				() => {},
				(error) => {
					console.error('Stop recognition error:', error)
				}
			)
		}
	}

	export { startSpeechRecognition, stopSpeechRecognition }
