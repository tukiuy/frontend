<script>
	/** @type {import('$lib/types/types').Order}*/
	import { order } from '$lib/stores/order';
	import { onMount } from 'svelte';
	import { isAuthenticated } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/Loading.svelte';

	let loading = true;
	onMount(() => {
		if (!$isAuthenticated) {
			goto('/');
		}
		loading = false;
	});
</script>

<div class="overflow-x-auto bg-white h-full flex flex-col">
	{#if loading}
		<Loading />
	{:else}
		<h1 class="text-center my-4 text-slate-800">
			Orden creada el {new Date($order.created).toLocaleDateString()}
		</h1>
		<form method="POST">
			<div class="flex flex-row mx-4 border-1 h-max flex-grow border-slate-700">
				<table class="min-w-full text-sm text-center font-extralight">
					<thead class="text-white border-b-1 border-slate-700 bg-slate-600">
						<tr>
							<th scope="col" class="px-6 py-4 font-normal">Artículo</th>
							<th scope="col" class="px-6 py-4 font-normal">Cantidad</th>
							<th scope="col" class="px-6 py-4 font-normal">Entregado</th>
						</tr>
					</thead>
					<tbody>
						{#each $order.items as item, i}
							<tr class=" data-[odd=true]:bg-slate-200" data-odd={i % 2 !== 0}>
								<th scope="row" class="px-6 py-3 font-normal">{item.name}</th>
								<td class="px-6 py-3 font-normal">{item.quantity}</td>
								<td class="px-6 py-3 font-normal"><input type="checkbox" class="mx-auto" /></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="flex flex-row w-full mx-auto flex-grow-0">
				<button
					type="submit"
					class="p-4 mt-8 w-6/12 mx-auto bg-slate-600 text-white border-1 rounded-lg"
					>Completar orden.</button
				>
			</div>
		</form>
	{/if}
</div>
