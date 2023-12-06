import { CommonError, CommonState } from '../types';

interface IKeyword {
	sid: string;
	keywords: string[];
}
interface IKeywordClient {
	clientResult:string,
}
export interface KeywordDetailState extends IKeyword,IKeywordClient,CommonState {}

export interface KeywordFetch {
	keyword: string;
  }



