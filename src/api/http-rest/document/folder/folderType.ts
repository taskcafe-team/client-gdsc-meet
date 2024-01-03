interface IEntity {
	id: string
	name: string
	createdAt: Date
	updatedAt: Date
}

export interface IFolder extends IEntity {
	parent_folder_id: string | null
	userId: string
	subjectId: string
}