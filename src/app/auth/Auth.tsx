'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export function Auth() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange',
	})

	const { push } = useRouter()

	const { data } = useQuery({
		queryKey: ['length user'],
		queryFn: () => authService.lenghtUser(),
	})

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLogin ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Авторизация прошла успешно!')
			reset()
			push(DASHBOARD_PAGES.DOCS)
		},
		onError: () => {
			toast.error('Не верный логин и пароль!')
		},
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}
	const [isLogin, setIsLogin] = useState<boolean>()
	return (
		<div className='flex min-h-screen'>
			<form
				className='w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title='Авторизация' />
				<Field
					id='email'
					label='Email:'
					placeholder='Введите email:'
					type='email'
					extra='mb-4'
					{...register('email', {
						required: 'Email is required!',
					})}
				/>

				<Field
					id='password'
					label='Password: '
					placeholder='Введите password: '
					type='password'
					{...register('password', {
						required: 'Password is required!',
					})}
					extra='mb-6'
				/>

				<div className='flex items-center gap-5 justify-center'>
					<Button onClick={() => setIsLogin(true)}>Авторизация</Button>
					<Button onClick={() => setIsLogin(false)}>Регистрация</Button>
				</div>
			</form>
		</div>
	)
}
