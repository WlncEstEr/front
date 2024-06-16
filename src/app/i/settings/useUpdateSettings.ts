import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeUserForm } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export function useUpdateSettings() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess() {
			toast.success('Профиль обновлен!')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
		onError: () => {
			toast.success('Не удалось обносить профиль!')
		},
	})

	return { mutate, isPending }
}
