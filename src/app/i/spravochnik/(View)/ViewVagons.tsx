'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, FileMinus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IListVagon } from '@/types/list-vagon.types'

import { useProfile } from '@/hooks/useProfile'

import { IOptions } from '../../doc/create/CreactDoc'
import { typeVagon } from '../constans.typevagon'

import { vagonService } from '@/services/list-service/list-vagon.service'
import style from './../spravochnik.module.scss'

interface ICeh {
	data: IListVagon[] | undefined
	current?: string
}

export function ViewVagon({ current, data }: ICeh) {
	const { register, handleSubmit, reset, control, setValue, getValues } =
		useForm<IListVagon>({
			mode: 'onChange',
		})
	const dataForm = getValues()
	const { isLoading } = useProfile()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['add vagon'],
		mutationFn: (data: IListVagon) => vagonService.create(data),
		onSuccess() {
			toast.success(`Вагон добавлен в справочник!`)
			queryClient.invalidateQueries({
				queryKey: ['list vagon'],
			})
			reset()
		},
		onError: () => {
			toast.error(`Такой код уже существует!`)
		},
	})

	const delete_ceh = useMutation({
		mutationKey: ['delete vagon'],
		mutationFn: (kceh: number) => vagonService.delete(kceh),
		onSuccess() {
			toast.success(`Вагон удален!`)
			queryClient.invalidateQueries({
				queryKey: ['list vagon'],
			})
		},
	})

	const typeVagon_select = typeVagon?.map(d => ({
		value: d.kodtvag,
		label: d.kodtvag,
	}))

	const Delete = (kceh: number) => {
		let res = window.confirm(`Вы уверены что ходите удалить вагон №${kceh}`)
		if (res) {
			delete_ceh.mutate(kceh)
		}
	}

	const onSubmit: SubmitHandler<IListVagon> = data => {
		mutate(data)
	}

	const sorseType = (newValue: string | null) => {
		const res = typeVagon.find(item => item.kodtvag === newValue)
		return res?.gpod
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
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Код вагона</th>
								<th>Тип вагона</th>
								<th>Вес вагона</th>
								<th>Макс. вес</th>
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
											<td>{item.nvag}</td>
											<td>{item.kodtvag}</td>
											<td>{item.vesvag}</td>
											<td>{item.ves_grotp}</td>
											<td
												onClick={() => Delete(item.nvag)}
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
				<div>
					<form onSubmit={handleSubmit(onSubmit)} className={style.add}>
						<div className={style.inputs}>
							<div className='h-52 flex flex-col justify-between'>
								<Field
									id='nvag'
									label='Код вагона'
									placeholder='Введите код'
									isNumber
									maxlength={4}
									{...register('nvag', { valueAsNumber: true })}
								/>
								<Field
									id='vesvag'
									label='Вес вагона'
									placeholder='Введите вес'
									maxlength={6}
									isNumber
									{...register('vesvag')}
								/>
							</div>
							<div className='h-52 flex flex-col justify-between'>
								<div>
									<label
										className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
									>
										Тип вагона
									</label>
									<Controller
										name='kodtvag'
										control={control}
										render={({ field: { onChange, value } }) => (
											<ReactSelect
												className='mt-3'
												classNamePrefix='custom-select'
												value={dataForm.kodtvag as any}
												options={typeVagon_select}
												onChange={newValue => {
													onChange((newValue as unknown as IOptions).value)
													setValue(
														'gpod',
														sorseType(
															(newValue as unknown as IOptions).value
														) as string
													)
												}}
											/>
										)}
									/>
								</div>
								<Field
									id='ves_grotp'
									label='Макс. вес'
									placeholder='Введите вес'
									maxlength={6}
									isNumber
									{...register('ves_grotp')}
								/>
							</div>
						</div>
						<div className='text-center'>
							<Button disabled={isPending} children='Добавить' />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
