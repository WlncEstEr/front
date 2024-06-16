'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { TypeUserForm } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

import { InputMask } from 'primereact/inputmask'
import { Nullable } from 'primereact/ts-helpers'
import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

export function Settings() {
	const { isLoading } = useProfile()

	const { register, handleSubmit, reset, control, getValues } =
		useForm<TypeUserForm>({
			mode: 'onChange',
		})
	const res = getValues()

	useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data
		mutate({
			...rest,
			password: password || undefined,
		})
	}

	function setPhone(value: Nullable<string>) {
		reset({
			phone: String(value),
		})
	}

	return isLoading ? (
		<Loader />
	) : (
		<div>
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
							extra='mb-4'
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
							value={res.phone}
							onChange={e => setPhone(e.target.value)}
						/>
						{/* <Field
							id='phone'
							label='Телефон: '
							placeholder='Введите телефон:'
							isNumber
							{...register('phone', {
								valueAsNumber: true,
							})}
							extra='mb-4'
						/> */}
					</div>
				</div>
				<div>
					<div className='w-fit mx-auto'>
						<Button type='submit' disabled={isPending}>
							Сохранить
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}
