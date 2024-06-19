'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FileMinus, SquarePen } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { IUser } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import style from '../../app/i/doc/doc.module.scss'

import { ICurrentUser } from '@/app/i/doc/Doc'
import { useVagn } from '@/app/i/doc/form/useVagn'
import { useSpravochnik } from '@/hooks/useSpravochnik'
import { docService } from '@/services/doc.service'
import { vagonService } from '@/services/vagon.service'
import { useState } from 'react'
import { DownloadShablon } from '../Shablon/DownloadShablon'

interface ITable {
	date: any
	user?: IUser
	currentUser?: ICurrentUser
	setCurrentUser?: any
	filter?: string | undefined
	sorse?: string
	lenghtAll?: number
}

export function Table({
	date,
	currentUser,
	setCurrentUser,
	user,
	filter,
	sorse,
	lenghtAll,
}: ITable) {
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['delete ndoc'],
		mutationFn: (data: string) => docService.deleteDoc(data),
		onSuccess() {
			toast.success(`Successfully delete doc!`)
			queryClient.invalidateQueries({
				queryKey: ['allDoc'],
			})
		},
	})

	const delete_vagn = useMutation({
		mutationKey: ['delete vagn docs'],
		mutationFn: (data: number) => vagonService.deleteVagons(data),
	})
	const { push } = useRouter()
	function onDelete(ndoc: string) {
		let res = window.confirm(`Вы уверены что ходите накладную №${ndoc}`)
		if (res) {
			mutate(ndoc)
			delete_vagn.mutate(+ndoc)
			push(DASHBOARD_PAGES.DOCS)
		}
	}
	const { data } = useVagn()
	const { tovar } = useSpravochnik()

	const [isActive, setIsActive] = useState(false)
	return date?.docs?.map((item: any, idx: number) =>
		idx + 1 > Number(lenghtAll) &&
		idx + 1 < Number(lenghtAll) + 11 &&
		(filter === 'Все' || filter === '') &&
		sorse === '' ? (
			<tr
				className={
					currentUser?.ndoc !== '' && currentUser?.ndoc === item.ndoc
						? style.active
						: 'relative'
				}
				key={item.ndoc}
				onClick={e =>
					setCurrentUser({
						...currentUser,
						ndoc:
							currentUser?.ndoc === e.currentTarget.firstChild?.textContent
								? ''
								: e.currentTarget.firstChild?.textContent,
						id: item.user_id,
					})
				}
				onMouseEnter={() => setIsActive(true)}
				onMouseLeave={() => setIsActive(false)}
			>
				<td>{item.ndoc}</td>
				<td>{item.station_otpr}</td>
				<td>{item.station_nazn}</td>
				<td>{item.notpr}</td>
				<td>{item.npol}</td>
				<td>{item.way_code}</td>
				<td>{item.usr_ceh_otpr}</td>
				<td>{item.dat_ceh_otpr}</td>
				<td>{item.dat_st_otpr}</td>
				<td>{item.dat_st_nazn === '' ? '-' : item.dat_st_nazn}</td>
				<td>{item.dat_ceh_nazn === '' ? '-' : item.dat_ceh_nazn}</td>
				<td>{item.status}</td>
				{user?.post !== 'client' && (
					<td className='cursor-pointer flex flex-row gap-2'>
						<Link
							href={{
								pathname: DASHBOARD_PAGES.UPDATE_DOC,
								query: {
									data: item.ndoc,
								},
							}}
						>
							<SquarePen />
						</Link>
						<DownloadShablon
							dataDoc={item}
							dataVagons={data?.data}
							allTovars={tovar.data?.data}
						/>

						<Link
							onClick={() => onDelete(item.ndoc)}
							href={{
								pathname: DASHBOARD_PAGES.DOCS,
							}}
						>
							<FileMinus />
						</Link>
					</td>
				)}
			</tr>
		) : filter === item.station_otpr ? (
			<tr
				className={
					currentUser?.ndoc !== '' && currentUser?.ndoc === item.ndoc
						? style.active
						: ''
				}
				key={item.ndoc}
				onClick={e =>
					setCurrentUser({
						...currentUser,
						ndoc:
							currentUser?.ndoc === e.currentTarget.firstChild?.textContent
								? ''
								: e.currentTarget.firstChild?.textContent,
						id: item.user_id,
					})
				}
			>
				<td>{item.ndoc}</td>
				<td>{item.station_otpr}</td>
				<td>{item.station_nazn}</td>
				<td>{item.notpr}</td>
				<td>{item.npol}</td>
				<td>{item.way_code}</td>
				<td>{item.usr_ceh_otpr}</td>
				<td>{item.dat_ceh_otpr}</td>
				<td>{item.dat_st_otpr}</td>
				<td>{item.dat_st_nazn === '' ? '-' : item.dat_st_nazn}</td>
				<td>{item.dat_ceh_nazn === '' ? '-' : item.dat_ceh_nazn}</td>
				{user?.post !== 'client' && (
					<td className='cursor-pointer flex flex-row gap-2'>
						<Link
							href={{
								pathname: DASHBOARD_PAGES.UPDATE_DOC,
								query: {
									data: item.ndoc,
								},
							}}
						>
							<SquarePen />
						</Link>
						<DownloadShablon
							dataDoc={item}
							dataVagons={data?.data}
							allTovars={tovar.data?.data}
						/>
						<Link
							onClick={() => onDelete(item.ndoc)}
							href={{
								pathname: DASHBOARD_PAGES.DOCS,
							}}
						>
							<FileMinus />
						</Link>
					</td>
				)}
			</tr>
		) : sorse === (item.ndoc as string) ? (
			<tr
				className={
					currentUser?.ndoc !== '' && currentUser?.ndoc === item.ndoc
						? style.active
						: ''
				}
				key={item.ndoc}
				onClick={e =>
					setCurrentUser({
						...currentUser,
						ndoc:
							currentUser?.ndoc === e.currentTarget.firstChild?.textContent
								? ''
								: e.currentTarget.firstChild?.textContent,
						id: item.user_id,
					})
				}
			>
				<td>{item.ndoc}</td>
				<td>{item.station_otpr}</td>
				<td>{item.station_nazn}</td>
				<td>{item.notpr}</td>
				<td>{item.npol}</td>
				<td>{item.way_code}</td>
				<td>{item.usr_ceh_otpr}</td>
				<td>{item.dat_ceh_otpr}</td>
				<td>{item.dat_st_otpr}</td>
				<td>{item.dat_st_nazn === '' ? '-' : item.dat_st_nazn}</td>
				<td>{item.dat_ceh_nazn === '' ? '-' : item.dat_ceh_nazn}</td>
				{user?.post !== 'client' && (
					<td className='cursor-pointer flex flex-row gap-2'>
						<Link
							href={{
								pathname: DASHBOARD_PAGES.UPDATE_DOC,
								query: {
									data: item.ndoc,
								},
							}}
						>
							<SquarePen />
						</Link>
						<DownloadShablon
							dataDoc={item}
							dataVagons={data?.data}
							allTovars={tovar.data?.data}
						/>
						<Link
							onClick={() => onDelete(item.ndoc)}
							href={{
								pathname: DASHBOARD_PAGES.DOCS,
							}}
						>
							<FileMinus />
						</Link>
					</td>
				)}
			</tr>
		) : (
			''
		)
	)
}
