import { ApiResponse } from 'api/http-rest/apiResponses'
import Api from '../../api'
import { IFolder } from './folderType'

class FolderApi {
	static readonly FolderEndpoint = '/folders/'
	static readonly 
	static getFolderByUserId = ({userId}:{userId: string}): Promise<ApiResponse<IFolder[]>> => {
		return Api.get(this.FolderEndpoint, {
			userId,
		})
	}

	static createrFolderByUserId = ({
		userMeetingId,
		folderName,
	}: {
		userMeetingId: string
		folderName: string
	}) => {
		return Api.post(this.FolderEndpoint, {
			userMeetingId,
			folderName,
		})
	}
}

export default FolderApi
