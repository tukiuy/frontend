import { sveltekit } from '@sveltejs/kit/vite';
// import { loadEnv } from 'vite';
// import dotenvExpand from 'dotenv-expand';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
