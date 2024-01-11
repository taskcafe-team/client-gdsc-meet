import SocketIOManager from 'contexts/keywords/socket'
import io from 'socket.io-client'

const sdk = require('microsoft-cognitiveservices-speech-sdk')
const SPEECH_KEY = '8413587b5f7a42dcba46239ed25e24ac'
const SPEECH_REGION = 'eastasia'
const speechConfig = sdk.SpeechConfig.fromSubscription(
	SPEECH_KEY,
	SPEECH_REGION
)
speechConfig.speechRecognitionLanguage = 'vi-VN'
const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput()
let recognizer
let interimResults = ''
let resultCallback

const startSpeechRecognition = (onResult) => {
	resultCallback = onResult
	recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)
	recognizer.recognizing = (_, event) => {
		console.log(event.result.text)
		interimResults += ` ${event.result.text}`
	}
	recognizer.recognized = (_, event) => {
		const finalResult = event.result.text
		interimResults += ` ${finalResult}`
		resultCallback(event.result.text)
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
