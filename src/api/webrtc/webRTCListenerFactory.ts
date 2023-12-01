import { EventEmitter } from 'events'
import { Room, RoomEvent } from 'livekit-client'
import { RegisterActionsType } from './webRTCActions'
import { createSendDataMessageAction } from './webRTCService'

export class WebRTCListenerFactory<T extends RegisterActionsType> {
	private readonly event: EventEmitter

	constructor(room: Room, event?: EventEmitter | WebRTCListenerFactory<T>) {
		if (event) {
			if (event instanceof EventEmitter) this.event = event
			else if (event instanceof WebRTCListenerFactory) this.event = event.event
			else this.event = new EventEmitter()
		} else this.event = new EventEmitter()
		try {
			room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
				const decoder = new TextDecoder()
				const strData = decoder.decode(payload)
				const action = JSON.parse(strData)
				if ('type' in action && 'payload' in action) {
					const type = action.type
					const _payload = action.payload
					this.event.emit(type, _payload)
				} else
					console.warn(
						WebRTCListenerFactory.name,
						'Format of action is not correct'
					)
			})
		} catch (err) {
			console.error(err)
		}
	}

	public on<key extends keyof T>(type: key, cb: (payload: T[key]) => void) {
		this.event.on(type as string, cb)
	}

	public removeAllListeners() {
		this.event.removeAllListeners()
	}
}
