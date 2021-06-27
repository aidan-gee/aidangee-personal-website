<svelte:head>
	<title>Aidan Gee - Full Stack developer</title>
    <meta name="description" content="A Manchester based Full Stack Developer. Building modern web apps with Javascript, Typescript, React, Svelte & more.">
</svelte:head>

<section class="flex flex-col h-screen m-auto items-center bg-gradient quantum">
    <div class="
          container
          m-auto
          text-white
          text-center
        ">
        <h1 class="text-shadow text-6xl">Aidan Gee</h1>
        <h3 class="text-shadow text-2xl">Full Stack Developer</h3>

    </div>
    <div class="absolute bottom-0 p-4 flex flex-column align-center justify-center">
        <h4 class="text-shadow text-md inline">Built with <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a> + <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a></h4>
        <a href="https://github.com/aidan-gee/aidangee-personal-website" target="_blank"><img class="inline mx-2" alt="github link to this website repository" src="/GitHub-Mark-Light-32px.png" height="24" width="24" loading="lazy"/></a>
    </div>
</section>

<style>
    .bg-gradient {
        background-image: linear-gradient(125deg, var(--p0), var(--p1), var(--p2), var(--p3), var(--p4));
    }
    .quantum {
        animation: quantum 25s ease forwards;
        animation-iteration-count: infinite;
        background-size: 300% 300%;
        background-repeat: no-repeat;
    }
    @keyframes quantum {
        0%{background-position:0% 86%}
        50%{background-position:100% 15%}
        100%{background-position:0% 86%}
    }
</style>