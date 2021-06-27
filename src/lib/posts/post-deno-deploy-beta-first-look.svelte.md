---
title: Deno Deploy Beta - First look & start up times
date: 2021-06-26
slug: deno-deploy-beta-first-look
snippet: Deno Deploy beta 1, a serverless platform for deploying and hosting server-side Deno released last week. I wanted to explore what it offers and whether the beta already lives up to some of it's claims.
tags: javascript, deno
---

# {title}


### What is Deno

If you haven't heard of [Deno](https://github.com/denoland/deno) (pronounced 'dee-no'), it is a **JavaScript** and **TypeScript** runtime by the creator of Node.js Ryan Dahl. 

In a nutshell Deno allows you to run JavaScript on the V8 engine much like Node.js does, but there are a few key differences:

- Supports Typescript out of the box
- No centralised package manager like NPM
- Aims to have a browser compatible API (e.g. fetch and web workers)
- Is 'secure' by default, you must explicitly enable network access, file access etc.
- Built in tools for code formatting, linting, test running and [more...](https://deno.land/manual/tools)
- Has a set of [standardised modules](https://deno.land/std/) reviewed by the Deno team

Ryan Dahl himself has spoken about these decisions in a number of talks. I would recommend taking a look at this talk he gave ['10 Things I Regret About Node.js'](https://www.youtube.com/watch?v=M3BM9TB-8yA).

If you want to dive deeper into Deno there are a great set of resources on the [“awesome deno” GitHub](https://github.com/denolib/awesome-deno) that you can use. 


### So what is Deno Deploy then?

From Ryan Dahl himself :

> Deno Deploy is a multi-tenant JavaScript engine running in 25 data centers across the world. The service deeply integrates cloud infrastructure with the V8 virtual machine, allowing users to quickly script distributed HTTPS servers. This novel “serverless” system is designed from the ground up for modern JavaScript programming.

Ok, but what does this mean? Deno Deploy is wanting to be *the* way you deploy your server-side Deno code. By using the service you get fast CI/CD and serverless deployments optimised for Deno.

For an in depth look at the features of Deno Deploy, checkout their latest [blog post](https://deno.com/blog/deploy-beta1) or [documentation](https://deno.com/deploy/docs).


### First look

Reminder, this is the first version Deno Deploy and is a beta. So I wouldn't expect this to be the final product, but it is still fun to see what is already available. 

On that note, the initial public beta for Deno Deploy is free to use. So it is a great time to jump in and try it, they have a list of limits that apply during the beta [here](https://deno.com/deploy/docs/pricing-and-limits).

When you sign up and login to Deno Deploy you will be asked to create a project to house the Deno services you intend to deploy. You will also be met with a couple of examples ready to deploy at the click of a button.

Project Dashboard: ![Deno Deploy project dashboard](https://res.cloudinary.com/wubo/image/upload/c_scale,f_auto,q_auto:best,w_1080/v1624639605/blog/deno-deploy-project-dashboard_sf1zyp.png "Deno Deploy project dashboard")

Let's look at that code for the Hello World example:

```
addEventListener("fetch", (event) => {
  event.respondWith(new Response("Hello world"));
});
```

Now if you have been using Node.js with express or running on AWS lambda this might look a bit alien. What I find interesting about this example is that this is not code you can just pop into Deno ([yet](https://github.com/denoland/deno/issues/5957#issuecomment-722568905)) to run a server locally. It's Deno Deploy sprinkling some of that platform *magic* on top that allows you to use the Fetch Event API that you would use in a Service Worker in your browser. So I'm already thinking this is going to be more of an all encompassing Deno platform rather than just a hosting service.


### Deploying 

There are a couple of ways you can deploy your code. 

- Connect your GitHub repo
- Provide a URL to a repository

The first is almost a requirement of a hosting platform nowadays, you can connect a repository from GitHub and have it build and deploy. What is nice to see is the inclusion of preview deployments. This will create a deployment whenever you push to a branch. I love this feature, it makes testing and pull request reviews just that bit faster. 

 The second point however, is very ... Deno. It fits in with the theme of decentralised packages and importing via a URL. I can see this making it really easy to share your open source service with others and letting them easily host it themselves, a nice touch.


### Impressive Start Times

> We believe Deploy is the fastest serverless system available. We hope to nail down this bold claim with performance benchmarks in future releases.

This is a quote from their blog that made me want to test out this beta. It is a bold claim to say the least, but I think performance needs to be something every developer has in their mind when building a modern Web App. Especially with the push from Google on [core web vitals](https://web.dev/vitals/), and it's effect on your websites SEO. The option of a fast easy to use serverless platform is right up there on my Christmas list. 

So, what I wanted to look at was the speed of the platform itself. The simple hello world app is perfect for a basic test, how fast does it respond with a simple hello world? For these tests, I compared the [TTFB (https://web.dev/time-to-first-byte/)] over a number of requests. 

**TTFB of Cold Start**: 575 ms (avg of 5 requests)

**TTFB once warmed** : 44ms (avg of 50 requests)

For a Beta, I think these are impressive numbers. To give some perspective, I also tested out [Netlify](https://www.netlify.com/) who as part of their platform provide Netlify Functions. A similar easy to use serverless deployment experience but for Node.js. if you put the same 'Hello World' example on Netlify Functions (deployed in Europe) the same tests looked like :


**TTFB of Cold Start**: 812 ms (avg of 5 requests)

**TTFB once warmed** : 138 ms (avg of 50 requests)


Now I don't think or claim these tests are an exact science and I definitely don't think this means you should be choosing Deno Deploy over Netlify just yet. But I believe what we are really seeing here is the difference in [compute on the edge](https://en.wikipedia.org/wiki/Edge_computing) vs a data centre. And the speed boost Deno Deploy is getting here is probably mostly due to that. Compute on the edge is becoming more common nowadays, popular options like [Lambda@Edge](https://aws.amazon.com/lambda/edge/) and [Cloudflare Workers](https://workers.cloudflare.com/) have steadily been getting better over the passed few years and much more accessible to developers. Deno Deploy having this tech from the get-go does give them a speed advantage over some existing platforms.


### Thoughts

I think there are some good early signs here. Firstly, there is a free open beta that anyone can try out and give feedback. This is great that anyone in the community can check it out and potentially help shape it. 

The tech is there to provide a great experience for developers and end users already. Even at this early stage it is easy to use and get up and running. The edge compute is a nice performance inclusion. 

I have my reservations about some of the platform magic that seems to be in there at the moment. The Deno deploy homepage specifically lists 'No Vendor Lock In' as one of its aims. But it looks like there is already some features in there that would make it hard to move away from the platform. Just look at [Broadcast Channels](https://deno.com/blog/deploy-beta1#broadcastchannel). So this will be something I keep an eye on. 

The Deno Team are aiming for the end of this year to enter General Availability. So keep an eye out for updates and that all important pricing model.