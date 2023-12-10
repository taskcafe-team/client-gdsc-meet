import { CommonState } from '../types'

export interface INotificationKeyword {
	title: string;
	extract: string;
}

export interface INotificationKeywordState extends INotificationKeyword,CommonState {
	visible: boolean;
}

export interface noitificationKeywordFetchDTO {
	keyword: string;
}