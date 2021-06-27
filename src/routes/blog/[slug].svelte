<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
        // TODO: nice to have some error handling
        const postRecord = await import(`../../lib/posts/post-${page.params.slug}.svelte.md`);
        
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
    <meta name="description" content="{metadata.snippet}">
</svelte:head>
<div class="container max-w-screen-md mx-auto py-32 px-12 md:px-0">
    <article class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl" role="main">
        <Post/>
    </article>
</div>