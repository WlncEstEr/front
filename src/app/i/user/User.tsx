'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { Posts } from '@/constants/posts.constant'

import { IRegistetForm, Post } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'
import { useSpravochnik } from '@/hooks/useSpravochnik'

import { IOptions } from '../doc/create/CreactDoc'

import { useEffect } from 'react'
import { useCreateUser } from './useCreateUser'
import style from './user.module.scss'

import { InputMask } from 'primereact/inputmask'
import { Nullable } from 'primereact/ts-helpers'

export function User() {
	const { register, handleSubmit, control, getValues, reset, setValue } =
		useForm<IRegistetForm>({
			mode: 'onChange',
		})
	useEffect(() => {
		reset({
			post: Post.client || undefined,
		})
	}, [])

	const { isPending, mutate } = useCreateUser(reset)
	const posts = Posts

	const { data, isLoading } = useProfile()

	function onCreate(data: IRegistetForm) {
		let res = window.confirm(
			`Вы уверены что ходите создать пользователя с правами - "${data.post}"`
		)
		if (res) {
			mutate(data)
		}
	}

	const onSubmit: SubmitHandler<IRegistetForm> = data => {
		if (data.post === 'admin' || data.post === 'logist') return onCreate(data)
		mutate(data)
	}

	function setPhone(value: Nullable<string>) {
		reset({
			phone: String(value),
		})
	}

	const { allUsers } = useSpravochnik()

	return isLoading ? (
		<Loader />
	) : (
		<div className='flex flex-row gap-5'>
			{data?.user.post === 'admin' && (
				<form className='w-2/4' onSubmit={handleSubmit(onSubmit)}>
					<div className='grid grid-cols-2 gap-10'>
						<div>
							<Field
								id='email'
								label='Email: '
								placeholder='Введите email: '
								type='email'
								{...register('email', {
									required: 'Email is required!',
								})}
								extra='mb-4'
							/>

							<Field
								id='name'
								label='Имя: '
								placeholder='Введите имя: '
								{...register('name')}
								extra='mb-4'
							/>

							<Field
								id='password'
								label='Password: '
								placeholder='Введите password: '
								type='password'
								{...register('password')}
								extra='mb-10'
							/>
						</div>

						<div>
							<label
								htmlFor='phone'
								className='text-sm text-white/60 dark:text-white ml-1.5 font-medium'
							>
								Телефон:
							</label>
							<InputMask
								className='mt-2 flex w-full items-center justify-center rounded-lg border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary'
								id='phone'
								mask='+7(999)999-99-99'
								placeholder='+7(___)___-__-__'
								defaultValue=''
								onChange={e => setPhone(e.target.value)}
							/>
							{/* <Field
								id='phone'
								label='Телефон: '
								placeholder='Введите телефон: '
								isNumber
								maxlength={11}
								{...register('phone', {
									valueAsNumber: true,
								})}
								extra='mb-4'
							/> */}
							<label
								className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
							>
								Должность:
							</label>
							<Controller
								name='post'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										options={posts}
										defaultValue={posts.at(-1)}
										onChange={newValue =>
											onChange((newValue as unknown as IOptions).value)
										}
									/>
								)}
							/>
						</div>
					</div>
					<div>
						<div className='mx-auto w-fit'>
							<Button type='submit' disabled={isPending}>
								Добавить
							</Button>
						</div>
					</div>
				</form>
			)}
			<div className={style.wrapper}>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Email</th>
							<th>Имя</th>
							<th>Телефон</th>
							<th>Должность</th>
						</tr>
					</thead>
					<tbody>
						{allUsers.data?.map((item, idx) => (
							<tr key={item.id}>
								<td>{idx + 1}</td>
								<td>{item.email}</td>
								<td>{item.name !== '' ? item.name : '-'}</td>
								<td>{item.phone !== null ? item.phone : '-'}</td>
								<td>{item.post}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
