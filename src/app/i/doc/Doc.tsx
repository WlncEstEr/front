'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactSelect from 'react-select'

import ExportToExcel from '@/components/Export'
import Loader from '@/components/ui/Loader'
import { Table } from '@/components/ui/Table'

import { useProfile } from '@/hooks/useProfile'
import { useSpravochnik } from '@/hooks/useSpravochnik'

import style from '../doc/doc.module.scss'

import { userService } from '@/services/user.service'
import { IOptions } from './create/CreactDoc'
import { useVagn } from './form/useVagn'

export interface ICurrentUser {
	ndoc: string
	id: string
}

export interface IUserDoc {
	id: string
	email: string
	password: string
	name: string
	phone: number
	post: string
}

export function Doc() {
	const { data, isLoading } = useProfile()

	const { station } = useSpravochnik()

	let station_select: IOptions[] | undefined = station.data?.data.map(d => ({
		value: d.station_inside_name,
		label: d.station_inside_name,
	}))

	station_select?.unshift({ value: 'All', label: 'Все' })

	const { allDoc } = useSpravochnik()
	const [currentUser, setCurrentUser] = useState<ICurrentUser>({
		ndoc: '',
		id: '',
	})

	const vagn = useVagn()

	let listUserVagn: any = []
	const userVagn = data?.docs?.map(item => {
		const usVagn = vagn.data?.data.map(el => {
			if (item.ndoc === el.ndoc) {
				listUserVagn.push(el)
			}
		})
	})

	const allUsers = useQuery({
		queryKey: ['qwe'],
		queryFn: () => userService.getAllUsers(),
	})

	const res = allUsers?.data?.filter(
		(item: IUserDoc) => item.id === currentUser.id
	)

	function Switch(): any {
		switch (data?.user.post) {
			case 'client':
				return (
					<Table
						data={data}
						user={data.user}
						currentUser={currentUser}
						sorse={sorseDoc}
						filter={filterStation}
						setCurrentUser={setCurrentUser}
						lenghtAll={lenghtAll}
					/>
				)
			case 'admin':
				return (
					<Table
						data={allDoc.data?.data}
						user={data.user}
						currentUser={currentUser}
						sorse={sorseDoc}
						filter={filterStation}
						setCurrentUser={setCurrentUser}
						lenghtAll={lenghtAll}
					/>
				)
			case 'logist':
				return (
					<Table
						data={allDoc.data?.data}
						user={data.user}
						sorse={sorseDoc}
						currentUser={currentUser}
						filter={filterStation}
						setCurrentUser={setCurrentUser}
						lenghtAll={lenghtAll}
					/>
				)
		}
	}

	const [filterStation, setFilterStation] = useState('Все')
	const [sorseDoc, setSorseDoc] = useState('')

	function clearSorse() {
		setSorseDoc('')
	}

	function onChange(newValue: IOptions) {
		setFilterStation(
			(filterStation === newValue.label ? '' : newValue.label) as string
		)
	}
	const firstFilter = { value: 'Все', label: 'Все' }
	const isNumber = true

	const [lenghtAll, setLengthAll] = useState<number>(0)
	const [statusPlus, setStatusPlus] = useState<boolean>(false)
	const [statusMinus, setStatusMinus] = useState<boolean>(true)

	useEffect(() => {
		if (allDoc.data?.data.docs.length <= lenghtAll + 10) {
			setStatusPlus(true)
		} else {
			setStatusPlus(false)
		}
		if (lenghtAll - 10 >= 0) {
			setStatusMinus(false)
		} else {
			setStatusMinus(true)
		}
	}, [lenghtAll])

	function slicePlus() {
		setLengthAll(lenghtAll + 10)
		setCurrentUser({ ndoc: '', id: '' })
	}

	function sliceMinus() {
		setLengthAll(lenghtAll - 10)
		setCurrentUser({ ndoc: '', id: '' })
	}
	return isLoading ? (
		<Loader />
	) : (
		<div className={style.wrapper}>
			<div className='flex flex-row items-center mb-4 w-2/3 gap-3  h-14'>
				<div className='w-40'>
					<ReactSelect
						classNamePrefix='custom-select'
						placeholder='Фильтр'
						options={station_select as any}
						defaultValue={firstFilter}
						onChange={newValue => onChange(newValue as any)}
					/>
				</div>
				<input
					type='text'
					placeholder='Поиск'
					className={`h-11 flex w-36 items-center justify-center rounded-lg border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary  
					}`}
					maxLength={10}
					value={sorseDoc}
					onChange={e => setSorseDoc(e.target.value)}
					onKeyDown={event => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Tab' &&
							event.key !== 'Enter' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight'
						) {
							event.preventDefault()
						}
					}}
				/>
				{sorseDoc !== '' && (
					<button type='button' onClick={() => clearSorse()}>
						<XCircle size={30} />
					</button>
				)}
				<ExportToExcel
					doc={
						data?.user.post === 'client' ? data.docs : allDoc.data?.data.docs
					}
					vagons={data?.user.post === 'client' ? listUserVagn : vagn.data?.data}
					fileName='Nakladnaya'
				/>
			</div>
			<table>
				<thead>
					<tr>
						<th>Накладная</th>
						<th>Станция отпр.</th>
						<th>Станция назн.</th>
						<th>Отпр.</th>
						<th>Получ.</th>
						<th>Путь</th>
						<th>ФИО отпр-ля</th>
						<th>Дата цеха отпр.</th>
						<th>Дата ст.отпр.</th>
						<th>Дата ст.назн.</th>
						<th>Дата цеха назн.</th>
						<th>Статус</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{Switch()}</tbody>
			</table>
			<div className='flex flex-row pl-8 mb-2 w-24 gap-2'>
				<button type='button' onClick={sliceMinus} disabled={statusMinus}>
					<ArrowLeft />
				</button>
				<button type='button' onClick={slicePlus} disabled={statusPlus}>
					<ArrowRight />
				</button>
			</div>
			{(data?.user.post as string) !== 'client' &&
				currentUser.ndoc !== '' &&
				res && (
					<table>
						<thead>
							<tr>
								<th>Email</th>
								<th>Name</th>
								<th>Phone</th>
								<th>Post</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>{res[0].email}</th>
								<th>{res[0].name}</th>
								<th>{res[0].phone}</th>
								<th>{res[0].post}</th>
							</tr>
						</tbody>
					</table>
				)}
			<div className={style.scroll_table_body}>
				<table>
					<thead>
						<tr>
							<th>Вагон</th>
							<th>Груз</th>
							<th>Тип вагона</th>
							<th>Г/л, т</th>
							<th>Вес тары</th>
							<th>Вес груза нето</th>
							<th>Вес из провески</th>
							<th>Дата цеха-отпр.</th>
							<th>Дата станции назн.</th>
							<th>Дата цеха назн.</th>
							<th>Вес</th>
						</tr>
					</thead>
					<tbody>
						{vagn.data?.data.map(
							item =>
								item.ndoc === currentUser.ndoc && (
									<tr key={item.id}>
										<td>{item.nvag}</td>
										<td>{item.inside_load_code}</td>
										<td>{item.kodtvag}</td>
										<td>{item.gpod}</td>
										<td>{item.vesvag}</td>
										<td>{item.ves_grotp}</td>
										<td>{item.ves_proves}</td>
										<td>{item.dat_ceh_otpr}</td>
										<td>{item.dat_st_nazn === '' ? '-' : item.dat_st_nazn}</td>
										<td>
											{item.dat_ceh_nazn === '' ? '-' : item.dat_ceh_nazn}
										</td>
										<td>{item.vesvag}</td>
									</tr>
								)
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
