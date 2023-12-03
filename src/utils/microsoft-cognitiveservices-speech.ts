	import * as sdk from 'microsoft-cognitiveservices-speech-sdk'

	const SPEECH_KEY: string = '3ee8ac5bef9c4ba181422b923dce6fa3'
	const SPEECH_REGION: string = 'southeastasia'
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
