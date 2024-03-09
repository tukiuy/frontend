<script>
// @ts-nocheck

	import auth from '$lib/services/auth';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import Loading from '$lib/components/Loading.svelte';

	let auth0Client;
	let loading = true;

	onMount(async () => {
		auth0Client = await auth.createClient();
		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
		loading = false;
	});

	function login() {
		auth.loginWithPopup(auth0Client);
	}

	function logout() {
		auth.logout(auth0Client);
	}

	export let data;
</script>

<main class="w-[100vw] h-[100vh] flex flex-col justify-center">
	{#if loading}
		<Loading />
	{:else if $isAuthenticated}
	<div class="flex flex-col">
		<h1 class="text-center text-3xl text-slate-800 mb-10">Bienvenido</h1>
		<div class="flex flex-col h-full justify-center">
			<form method="POST" class="flex flex-col w-[88vw] mx-auto" use:enhance>
				<select
					name="user-id"
					class="block p-4 pr-0 mt-4 border-r-8 border-transparent outline outline-slate-600 outline-1 rounded-md"
				>
					<option selected>¿Quien sos?</option>
					{#each data.users as user}
						<option value={user.id}>{user.name}</option>
					{/each}
				</select>
				<button
					type="submit"
					class="p-4 mt-8 w-8/12 mx-auto bg-slate-600 text-white border-1 rounded-lg">Ingresar</button
				>
			</form>
			<button
					on:click={logout}
					class="p-4 mt-8 w-6/12 mx-auto bg-slate-600 text-white border-1 rounded-lg">Salir</button
				>
		</div>
	</div>
	{:else}
		<button class="p-4 mt-8 w-8/12 mx-auto bg-slate-600 text-white border-1 rounded-lg" on:click={login}>Login</button>
	{/if}
</main>
