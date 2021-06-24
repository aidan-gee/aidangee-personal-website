<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		return {
            props: {
                path: page.path
            }
		};
	}
</script>

<script lang="ts">
    import "../app.postcss";
    import Navigation from "$lib/navigaton.svelte";

    export let path: string;
</script>
<Navigation route={path}/>
<slot></slot>