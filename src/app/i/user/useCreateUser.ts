import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { IRegistetForm } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

export function useCreateUser(reset: any) {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (data: IRegistetForm) => authService.main('register', data),
		onSuccess() {
			toast.success('Пользователь добавлен!')
			queryClient.invalidateQueries({ queryKey: ['list users'] })
			reset()
		},
		onError: () => {
			toast.error(
				'Не удалось добавить пользователя! Возможно такой email уже существует!'
			)
		},
	})

	return { mutate, isPending }
}
