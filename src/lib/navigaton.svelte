<header class="absolute top-0 w-full bg-white bg-opacity-5">
    <nav class="flex flex-row justify-center">
        <ul class="inline-flex p-4 text-lg text-white">
            <li class="p-2 px-6">
                <a class="relative no-underline" sveltekit:prefetch href="/">Aidan</a>
            </li>
            <li class="p-2 px-6">
                <a class="relative no-underline" sveltekit:prefetch href="/about">About</a>
            </li>
            <li class="p-2 px-6">
                <a class="relative no-underline" sveltekit:prefetch href="/blog">Blog</a>
            </li>
        </ul>
    </nav>
</header>

<style>
    a::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -10px;
        left: 0;
        background:linear-gradient(125deg, var(--p1), var(--p3) );
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out 0s;
    }
    a:hover::after {
        visibility: visible;
        transform: scaleX(1);
    }
</style>