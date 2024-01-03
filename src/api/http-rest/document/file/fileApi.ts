import Api from '../../api'

class FileApi {
	static readonly FolderEndpoint = '/files'

	static getFile = ({fileId}:{fileId: string}) => {
		return Api.get(`${this.FolderEndpoint}/${fileId}`,null,{
			responseType: 'blob',
		})
	}

	static getAllFileByFouderId = ({folder}:{folder: string}) => {
		return Api.get(`${this.FolderEndpoint}/a/${folder}`)
	}

}

export default FileApi
