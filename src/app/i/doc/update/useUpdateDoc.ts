import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ICreateDoc } from '../create/createDoc.types'

import { docService } from '@/services/doc.service'

export interface IUpdate {
	data: ICreateDoc
	num_doc: number
}

export function useUpdateDoc() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update doc'],
		mutationFn: (data: ICreateDoc) => docService.updateDoc(data),
		onSuccess() {
			toast.success('Накладная успешно обновлена!')
			queryClient.invalidateQueries({ queryKey: ['allDoc', 'vagns_user'] })
		},
		onError: () => {
			toast.success('Не удалось обновить накладную!')
		},
	})

	return { mutate, isPending }
}
