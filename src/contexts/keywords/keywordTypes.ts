import { CommonError, CommonState } from '../types';

interface IKeyword {
	endAt: Date;
	startAt: Date;
	keywords: string[];
}
  


export interface KeywordDetailState extends CommonState {
	value: IKeyword[];
	Sid: string;
	length: number;
  }

export interface KeywordFetch {
	keyword: string;
  }





