<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
        const postRecord = await import(`/src/lib/posts/${page.params.slug}.svelte.md`);
        
        
        return {
            props: {
                Post: postRecord.default,
                metadata: postRecord.metadata
            }
        };

	}
</script>

<script lang="ts">
    export let Post, metadata;
</script>

<svelte:head>
	<title>Developer Blog = {metadata.title}</title>
</svelte:head>
<div class="container max-w-screen-md mx-auto pt-24">
    <Post/>
</div>