<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
        const postsRecords = import.meta.globEager('/src/lib/posts/*.svelte.md');
        let posts = Object.values(postsRecords)
        posts = posts.map((post) => post.metadata);
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        
        return {
            props: {
                posts
            }
        };

	}
</script>

<script>
    export let posts;
</script>

<svelte:head>
	<title>Developer Blog = A blog for new tech, technical posts, ideas and more. </title>
</svelte:head>

<div class="container max-w-screen-md mx-auto pt-24">
    <section class="text-center">
        <h1 class="text-4xl font-bold">Blog</h1>
    </section>
    <section >
        {#each posts as post}
            <div class="p-12">
                <h2 class="text-2xl font-bold border-b-2 inline border-gradient py-1">{post.title}</h2>
                <p class="py-4">{post.snippet}</p>
                <a class="hover:underline" sveltekit:prefetch href="/blog/{post.slug}">Read More →</a>
            </div>
        {/each}
        
    </section>
</div>

<style>
    .border-gradient {
        border-image-slice: 1;
        border-image-source: linear-gradient(125deg, var(--p1), var(--p3) );
    }
</style>
