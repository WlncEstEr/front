import { IAuthResponse, IRegistetForm } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: IRegistetForm) {
		const lengthUser: boolean = await this.lenghtUser()
		let date = {}
		if (lengthUser === false) {
			date = {
				email: data.email,
				password: data.password,
				post: 'admin',
				phone: '',
				name: '',
			}
		} else {
			date = {
				email: data.email,
				name: data.name,
				phone: String(data.phone),
				password: data.password,
				post: data.post,
			}
		}

		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			date
		)

		if (type === 'register' && response.data.accessToken)
			saveTokenStorage(response.data.accessToken)

		return response
	},

	async lenghtUser() {
		const response = await axiosClassic.get('user/lengthuser')

		return response.data
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	},
}
