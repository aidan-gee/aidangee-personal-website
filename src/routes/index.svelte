<section class="flex flex-col h-screen m-auto items-center bg-gradient quantum">
    <div class="
          container
          m-auto
          text-white
          text-center
        ">
        <h1 class="text-shadow text-6xl">Aidan Gee</h1>
        <h3 class="text-shadow text-2xl">Fullstack Developer</h3>

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