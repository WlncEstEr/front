declare module 'jszip-utils' {
	type Callback = (err: Error | null, data: Uint8Array | null) => void

	export function getBinaryContent(path: string, callback: Callback): void
}
