export interface User {
	createdAt: string | null
	updatedAt: string | null
	firstName: string
	lastName: string
	email: string
	roles: string[]
	status: string
	id: number
}
