'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, FileMinus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IListCeh } from '@/types/ceh.types'

import { useProfile } from '@/hooks/useProfile'

import { cehService } from '@/services/list-service/list-ceh.service'
import style from './../spravochnik.module.scss'

interface ICeh {
	data: IListCeh[] | undefined
	current?: string
}

export function ViewTableCeh({ current, data }: ICeh) {
	const { register, handleSubmit, reset } = useForm<IListCeh>()
	const { isLoading } = useProfile()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['add ceh'],
		mutationFn: (data: IListCeh) => cehService.create(data),
		onSuccess() {
			toast.success(`Цех добавлен в справочник!`)
			queryClient.invalidateQueries({
				queryKey: ['list ceh'],
			})
			reset()
		},
		onError: () => {
			toast.error(`Такой код уже существует!`)
		},
	})

	const delete_ceh = useMutation({
		mutationKey: ['delete ceh'],
		mutationFn: (kceh: number) => cehService.delete(kceh),
		onSuccess() {
			toast.success(`Цех удален!`)
			queryClient.invalidateQueries({
				queryKey: ['list ceh'],
			})
		},
	})

	const Delete = (kceh: number) => {
		let res = window.confirm(`Вы уверены что ходите удалить цех №${kceh}`)
		if (res) {
			delete_ceh.mutate(kceh)
		}
	}

	const onSubmit: SubmitHandler<IListCeh> = data => {
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
									<th>Код цеха</th>
									<th>Название цеха</th>
									<th>Сокращение цеха</th>
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
												<td>{item.kceh}</td>
												<td>{item.nceh}</td>
												<td>{item.shceh}</td>
												<td
													onClick={() => Delete(item.kceh)}
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
							id='kceh'
							label='Код цеха'
							placeholder='Введите цех'
							isNumber
							maxlength={4}
							{...register('kceh', { valueAsNumber: true })}
						/>
						<Field
							id='nceh'
							label='Название цеха'
							placeholder='Введите название'
							{...register('nceh')}
						/>
						<Field
							id='shceh'
							label='Сокращение цеха'
							placeholder='Введите сокращение'
							{...register('shceh')}
						/>
						<Button disabled={isPending} children='Добавить' />
					</form>
				</div>
			</div>
		</div>
	)
}
