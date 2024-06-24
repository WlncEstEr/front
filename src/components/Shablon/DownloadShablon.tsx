import { IDocResponse } from '@/types/doc.types'
import { IListTovar } from '@/types/tovar.types'
import { IVagonResponse } from '@/types/vagonsr.types'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import { getBinaryContent } from 'jszip-utils'
import { FileDown } from 'lucide-react'
import PizZip from 'pizzip'

interface IDownload {
	dataDoc: IDocResponse
	dataVagons?: IVagonResponse[] | undefined
	allTovars: IListTovar[] | undefined
}

export function DownloadShablon({ dataDoc, dataVagons, allTovars }: IDownload) {
	const handleDownload = () => {
		const docVagons = dataVagons?.filter(item => item.ndoc === dataDoc.ndoc)

		getBinaryContent(
			docVagons && docVagons?.length <= 5
				? '/shablon_for_5_vagons.docx'
				: docVagons && docVagons?.length <= 10
					? '/shablon_for_10_vagons.docx'
					: docVagons && docVagons?.length <= 15
						? '/shablon_for_15_vagons.docx'
						: '/shablon_for_20_vagons.docx',
			(error, content) => {
				if (error) {
					throw error
				}
				function SwitchAllVes() {
					switch (docVagons?.length) {
						case 1:
							return Number(
								docVagons?.at(0)?.ves_proves.replace(',', '.')
							).toFixed(2)

						case 2:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.'))
							).toFixed(2)

						case 3:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.'))
							).toFixed(2)

						case 4:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.'))
							).toFixed(2)

						case 5:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.'))
							).toFixed(2)

						case 6:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.'))
							).toFixed(2)

						case 7:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.'))
							).toFixed(2)

						case 8:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.'))
							).toFixed(2)

						case 9:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.'))
							).toFixed(2)

						case 10:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 11:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 12:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(11)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 13:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(11)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(12)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 14:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(11)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(12)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(13)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 15:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(11)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(12)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(13)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(14)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 16:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(11)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(12)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(13)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(14)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(15)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 17:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(11)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(12)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(13)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(14)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(15)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(16)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 18:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(11)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(12)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(13)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(14)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(15)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(16)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(17)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 19:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(11)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(12)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(13)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(14)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(15)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(16)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(17)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(18)?.ves_proves.replace(',', '.'))
							).toFixed(2)
						case 20:
							return (
								Number(docVagons?.at(0)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(1)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(2)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(3)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(4)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(5)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(6)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(7)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(8)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(9)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(10)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(11)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(12)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(13)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(14)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(15)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(16)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(17)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(18)?.ves_proves.replace(',', '.')) +
								Number(docVagons?.at(19)?.ves_proves.replace(',', '.'))
							).toFixed(2)
					}
				}

				function CodeGrus(name: string | undefined) {
					const tovar = allTovars?.find(item => item.inside_load_name === name)
					return tovar?.inside_load_code
				}

				if (content) {
					const zip = new PizZip(content)
					const doc = new Docxtemplater(zip, {
						paragraphLoop: true,
						linebreaks: true,
					})

					doc.setData({
						ndoc: dataDoc.ndoc,
						station_otpr: dataDoc.station_otpr,
						station_nazn: dataDoc.station_nazn,
						lehghtVagons: docVagons?.length,
						code_grus_1: CodeGrus(docVagons?.at(0)?.inside_load_code) || '-',
						code_grus_2: CodeGrus(docVagons?.at(1)?.inside_load_code) || '-',
						code_grus_3: CodeGrus(docVagons?.at(2)?.inside_load_code) || '-',
						code_grus_4: CodeGrus(docVagons?.at(3)?.inside_load_code) || '-',
						code_grus_5: CodeGrus(docVagons?.at(4)?.inside_load_code) || '-',
						code_grus_6: CodeGrus(docVagons?.at(5)?.inside_load_code) || '-',
						code_grus_7: CodeGrus(docVagons?.at(6)?.inside_load_code) || '-',
						code_grus_8: CodeGrus(docVagons?.at(7)?.inside_load_code) || '-',
						code_grus_9: CodeGrus(docVagons?.at(8)?.inside_load_code) || '-',
						code_grus_10: CodeGrus(docVagons?.at(9)?.inside_load_code) || '-',
						code_grus_11: CodeGrus(docVagons?.at(10)?.inside_load_code) || '-',
						code_grus_12: CodeGrus(docVagons?.at(11)?.inside_load_code) || '-',
						code_grus_13: CodeGrus(docVagons?.at(12)?.inside_load_code) || '-',
						code_grus_14: CodeGrus(docVagons?.at(13)?.inside_load_code) || '-',
						code_grus_15: CodeGrus(docVagons?.at(14)?.inside_load_code) || '-',
						code_grus_16: CodeGrus(docVagons?.at(15)?.inside_load_code) || '-',
						code_grus_17: CodeGrus(docVagons?.at(16)?.inside_load_code) || '-',
						code_grus_18: CodeGrus(docVagons?.at(17)?.inside_load_code) || '-',
						code_grus_19: CodeGrus(docVagons?.at(18)?.inside_load_code) || '-',
						code_grus_20: CodeGrus(docVagons?.at(19)?.inside_load_code) || '-',

						name_grus_1: docVagons?.at(0)?.inside_load_code || '-',
						name_grus_2: docVagons?.at(1)?.inside_load_code || '-',
						name_grus_3: docVagons?.at(2)?.inside_load_code || '-',
						name_grus_4: docVagons?.at(3)?.inside_load_code || '-',
						name_grus_5: docVagons?.at(4)?.inside_load_code || '-',
						name_grus_6: docVagons?.at(5)?.inside_load_code || '-',
						name_grus_7: docVagons?.at(6)?.inside_load_code || '-',
						name_grus_8: docVagons?.at(7)?.inside_load_code || '-',
						name_grus_9: docVagons?.at(8)?.inside_load_code || '-',
						name_grus_10: docVagons?.at(9)?.inside_load_code || '-',
						name_grus_11: docVagons?.at(10)?.inside_load_code || '-',
						name_grus_12: docVagons?.at(11)?.inside_load_code || '-',
						name_grus_13: docVagons?.at(12)?.inside_load_code || '-',
						name_grus_14: docVagons?.at(13)?.inside_load_code || '-',
						name_grus_15: docVagons?.at(14)?.inside_load_code || '-',
						name_grus_16: docVagons?.at(15)?.inside_load_code || '-',
						name_grus_17: docVagons?.at(16)?.inside_load_code || '-',
						name_grus_18: docVagons?.at(17)?.inside_load_code || '-',
						name_grus_19: docVagons?.at(18)?.inside_load_code || '-',
						name_grus_20: docVagons?.at(19)?.inside_load_code || '-',

						ves_grus_1: docVagons?.at(0)?.ves_proves || '-',
						ves_grus_2: docVagons?.at(1)?.ves_proves || '-',
						ves_grus_3: docVagons?.at(2)?.ves_proves || '-',
						ves_grus_4: docVagons?.at(3)?.ves_proves || '-',
						ves_grus_5: docVagons?.at(4)?.ves_proves || '-',
						ves_grus_6: docVagons?.at(5)?.ves_proves || '-',
						ves_grus_7: docVagons?.at(6)?.ves_proves || '-',
						ves_grus_8: docVagons?.at(7)?.ves_proves || '-',
						ves_grus_9: docVagons?.at(8)?.ves_proves || '-',
						ves_grus_10: docVagons?.at(9)?.ves_proves || '-',
						ves_grus_11: docVagons?.at(10)?.ves_proves || '-',
						ves_grus_12: docVagons?.at(11)?.ves_proves || '-',
						ves_grus_13: docVagons?.at(12)?.ves_proves || '-',
						ves_grus_14: docVagons?.at(13)?.ves_proves || '-',
						ves_grus_15: docVagons?.at(14)?.ves_proves || '-',
						ves_grus_16: docVagons?.at(15)?.ves_proves || '-',
						ves_grus_17: docVagons?.at(16)?.ves_proves || '-',
						ves_grus_18: docVagons?.at(17)?.ves_proves || '-',
						ves_grus_19: docVagons?.at(18)?.ves_proves || '-',
						ves_grus_20: docVagons?.at(19)?.ves_proves || '-',
						all_ves_grus: SwitchAllVes(),

						kodtvag_1: docVagons?.at(0)?.kodtvag || '-',
						kodtvag_2: docVagons?.at(1)?.kodtvag || '-',
						kodtvag_3: docVagons?.at(2)?.kodtvag || '-',
						kodtvag_4: docVagons?.at(3)?.kodtvag || '-',
						kodtvag_5: docVagons?.at(4)?.kodtvag || '-',
						kodtvag_6: docVagons?.at(5)?.kodtvag || '-',
						kodtvag_7: docVagons?.at(6)?.kodtvag || '-',
						kodtvag_8: docVagons?.at(7)?.kodtvag || '-',
						kodtvag_9: docVagons?.at(8)?.kodtvag || '-',
						kodtvag_10: docVagons?.at(9)?.kodtvag || '-',
						kodtvag_11: docVagons?.at(10)?.kodtvag || '-',
						kodtvag_12: docVagons?.at(11)?.kodtvag || '-',
						kodtvag_13: docVagons?.at(12)?.kodtvag || '-',
						kodtvag_14: docVagons?.at(13)?.kodtvag || '-',
						kodtvag_15: docVagons?.at(14)?.kodtvag || '-',
						kodtvag_16: docVagons?.at(15)?.kodtvag || '-',
						kodtvag_17: docVagons?.at(16)?.kodtvag || '-',
						kodtvag_18: docVagons?.at(17)?.kodtvag || '-',
						kodtvag_19: docVagons?.at(18)?.kodtvag || '-',
						kodtvag_20: docVagons?.at(19)?.kodtvag || '-',

						nvag_1: docVagons?.at(0)?.nvag || '-',
						nvag_2: docVagons?.at(1)?.nvag || '-',
						nvag_3: docVagons?.at(2)?.nvag || '-',
						nvag_4: docVagons?.at(3)?.nvag || '-',
						nvag_5: docVagons?.at(4)?.nvag || '-',
						nvag_6: docVagons?.at(5)?.nvag || '-',
						nvag_7: docVagons?.at(6)?.nvag || '-',
						nvag_8: docVagons?.at(7)?.nvag || '-',
						nvag_9: docVagons?.at(8)?.nvag || '-',
						nvag_10: docVagons?.at(9)?.nvag || '-',
						nvag_11: docVagons?.at(10)?.nvag || '-',
						nvag_12: docVagons?.at(11)?.nvag || '-',
						nvag_13: docVagons?.at(12)?.nvag || '-',
						nvag_14: docVagons?.at(13)?.nvag || '-',
						nvag_15: docVagons?.at(14)?.nvag || '-',
						nvag_16: docVagons?.at(15)?.nvag || '-',
						nvag_17: docVagons?.at(16)?.nvag || '-',
						nvag_18: docVagons?.at(17)?.nvag || '-',
						nvag_19: docVagons?.at(18)?.nvag || '-',
						nvag_20: docVagons?.at(19)?.nvag || '-',

						max_grus_1: docVagons?.at(0)?.ves_grotp || '-',
						max_grus_2: docVagons?.at(1)?.ves_grotp || '-',
						max_grus_3: docVagons?.at(2)?.ves_grotp || '-',
						max_grus_4: docVagons?.at(3)?.ves_grotp || '-',
						max_grus_5: docVagons?.at(4)?.ves_grotp || '-',
						max_grus_6: docVagons?.at(5)?.ves_grotp || '-',
						max_grus_7: docVagons?.at(6)?.ves_grotp || '-',
						max_grus_8: docVagons?.at(7)?.ves_grotp || '-',
						max_grus_9: docVagons?.at(8)?.ves_grotp || '-',
						max_grus_10: docVagons?.at(9)?.ves_grotp || '-',
						max_grus_11: docVagons?.at(10)?.ves_grotp || '-',
						max_grus_12: docVagons?.at(11)?.ves_grotp || '-',
						max_grus_13: docVagons?.at(12)?.ves_grotp || '-',
						max_grus_14: docVagons?.at(13)?.ves_grotp || '-',
						max_grus_15: docVagons?.at(14)?.ves_grotp || '-',
						max_grus_16: docVagons?.at(15)?.ves_grotp || '-',
						max_grus_17: docVagons?.at(16)?.ves_grotp || '-',
						max_grus_18: docVagons?.at(17)?.ves_grotp || '-',
						max_grus_19: docVagons?.at(18)?.ves_grotp || '-',
						max_grus_20: docVagons?.at(19)?.ves_grotp || '-',

						vesvag_1: docVagons?.at(0)?.vesvag || '-',
						vesvag_2: docVagons?.at(1)?.vesvag || '-',
						vesvag_3: docVagons?.at(2)?.vesvag || '-',
						vesvag_4: docVagons?.at(3)?.vesvag || '-',
						vesvag_5: docVagons?.at(4)?.vesvag || '-',
						vesvag_6: docVagons?.at(5)?.vesvag || '-',
						vesvag_7: docVagons?.at(6)?.vesvag || '-',
						vesvag_8: docVagons?.at(7)?.vesvag || '-',
						vesvag_9: docVagons?.at(8)?.vesvag || '-',
						vesvag_10: docVagons?.at(9)?.vesvag || '-',
						vesvag_11: docVagons?.at(10)?.vesvag || '-',
						vesvag_12: docVagons?.at(11)?.vesvag || '-',
						vesvag_13: docVagons?.at(12)?.vesvag || '-',
						vesvag_14: docVagons?.at(13)?.vesvag || '-',
						vesvag_15: docVagons?.at(14)?.vesvag || '-',
						vesvag_16: docVagons?.at(15)?.vesvag || '-',
						vesvag_17: docVagons?.at(16)?.vesvag || '-',
						vesvag_18: docVagons?.at(17)?.vesvag || '-',
						vesvag_19: docVagons?.at(18)?.vesvag || '-',
						vesvag_20: docVagons?.at(19)?.vesvag || '-',
					})

					try {
						doc.render()
					} catch (renderError) {
						console.error('Ошибка при рендеринге документа:', renderError)
						return
					}

					const out = doc.getZip().generate({
						type: 'blob',
						mimeType:
							'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					})

					saveAs(out, `Word doc №${dataDoc.ndoc}.docx`)
				}
			}
		)
	}

	function Submit() {
		const submit = window.confirm(`Скачать накладную №${dataDoc.ndoc}`)
		if (submit) return handleDownload()
	}

	return (
		<button onClick={() => Submit()}>
			<FileDown />
		</button>
	)
}
