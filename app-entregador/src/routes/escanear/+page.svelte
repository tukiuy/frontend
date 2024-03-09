<script>
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { order } from '$lib/stores/order';
	import { Html5Qrcode } from 'html5-qrcode';
	import Loading from "$lib/components/Loading.svelte"
	import { onMount } from 'svelte';

	/**
	 * @type {Html5Qrcode}
	 */
	let html5Qrcode;
	let scanning = false;
	let userId = $user;
	let loading = true;

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/');
		}
		loading = false;
		init();
	});

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	/**
	 * @param {any} decodedText
	 * @param {any} decodedResult
	 */
	async function onScanSuccess(decodedText, decodedResult) {
		const response = await fetch('/escanear/obtener', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				id: decodedText,
				user: userId
			})
		});
		const result = await response.json();
		order.set(result);
		await html5Qrcode.stop();
		goto('/entregar');
	}

	/**
	 * @param {any} error
	 */
	function onScanFailure(error) {
		console.warn('Ocurrio un error %s', error);
	}
</script>

<main class="flex flex-col align-middle items-center justify-center h-[100vh] w-full">
	{#if loading}
		<Loading />
	{:else}
		<reader id="reader" class="w-full min-h-[500px] bg-black" />
		{#if scanning}
			<button
				class="p-4 mt-8 w-8/12 mx-auto bg-slate-600 text-white border-1 rounded-lg"
				on:click={stop}>Cerrar scanner</button
			>
		{:else}
			<button
				class="p-4 mt-8 w-8/12 mx-auto bg-slate-600 text-white border-1 rounded-lg"
				on:click={start}>Abrir scanner</button
			>
		{/if}
	{/if}
</main>
