<script lang="ts">
    import { page } from '$app/stores';

</script>

<header class="absolute top-0 w-full bg-opacity-5 bg-white">
    <nav class="flex flex-row justify-center">
        <ul class="inline-flex p-4 text-lg {$page.path === '/' ? "text-white" : ""}">
            <li class="p-2 px-6">
                <a class="relative no-underline" sveltekit:prefetch href="/">Aidan</a>
            </li>
            <!-- <li class="p-2 px-6">
                <a class="relative no-underline" sveltekit:prefetch href="/about">About</a>
            </li> -->
            <li class="p-2 px-6">
                <a class="relative no-underline" sveltekit:prefetch href="/blog">Blog</a>
            </li>
        </ul>
    </nav>
</header>
