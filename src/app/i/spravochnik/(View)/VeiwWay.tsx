'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, FileMinus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IWayResponse } from '@/types/way.types'

import { useProfile } from '@/hooks/useProfile'

import { wayService } from '@/services/list-service/list-way.service'
import style from './../spravochnik.module.scss'

interface ICeh {
	data: IWayResponse[] | undefined
	current?: string
}

export function ViewWay({ current, data }: ICeh) {
	const { isLoading } = useProfile()
	const { register, handleSubmit, reset } = useForm<IWayResponse>()

	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['add way'],
		mutationFn: (data: IWayResponse) => wayService.create(data),
		onSuccess() {
			toast.success(`Путь добавлен в справочник!`)
			queryClient.invalidateQueries({
				queryKey: ['list way'],
			})
			reset()
		},
		onError: () => {
			toast.error(`Такой код уже существует!`)
		},
	})

	const delete_ceh = useMutation({
		mutationKey: ['delete way'],
		mutationFn: (kceh: string) => wayService.delete(kceh),
		onSuccess() {
			toast.success(`Путь удален!`)
			queryClient.invalidateQueries({
				queryKey: ['list way'],
			})
		},
	})

	const Delete = (kceh: string) => {
		let res = window.confirm(`Вы уверены что ходите удалить путь № ${kceh}`)
		if (res) {
			delete_ceh.mutate(kceh)
		}
	}

	const onSubmit: SubmitHandler<IWayResponse> = data => {
		mutate(data)
	}

	const [lenghtAll, setLengthAll] = useState(0)
	const [statusPlus, setStatusPlus] = useState(false)
	const [statusMinus, setStatusMinus] = useState(true)

	useEffect(() => {
		if (data) {
			if (data.length <= lenghtAll + 20) {
				setStatusPlus(true)
			} else {
				setStatusPlus(false)
			}
			if (lenghtAll - 20 >= 0) {
				setStatusMinus(false)
			} else {
				setStatusMinus(true)
			}
		}
	}, [lenghtAll])

	function slicePlus() {
		setLengthAll(lenghtAll + 20)
	}

	function sliceMinus() {
		setLengthAll(lenghtAll - 20)
	}

	return isLoading ? (
		<Loader />
	) : (
		<div>
			<div className='flex w flex-row gap-5'>
				<div className={style.table}>
					<div className={style.table}>
						<table>
							<thead>
								<tr>
									<th>#</th>
									<th>Путь</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{data?.map(
									(item, idx) =>
										idx + 1 > Number(lenghtAll) &&
										idx + 1 < Number(lenghtAll) + 21 && (
											<tr key={idx}>
												<td>{idx + 1}</td>
												<td>{item.way_code}</td>
												<td
													onClick={() => Delete(item.way_code)}
													className='cursor-pointer'
												>
													<FileMinus />
												</td>
											</tr>
										)
								)}
							</tbody>
						</table>
						<div className='flex flex-row pl-8 mt-2 w-24 gap-2'>
							<button type='button' onClick={sliceMinus} disabled={statusMinus}>
								<ArrowLeft />
							</button>
							<button type='button' onClick={slicePlus} disabled={statusPlus}>
								<ArrowRight />
							</button>
						</div>
					</div>
				</div>
				<div>
					<form onSubmit={handleSubmit(onSubmit)} className={style.add}>
						<Field
							id='way'
							label='Путь'
							placeholder='Введите путь'
							maxlength={4}
							{...register('way_code')}
						/>
						<Button disabled={isPending} children='Добавить' />
					</form>
				</div>
			</div>
		</div>
	)
}
