---
title: Quick Tip - JavaScript Rendering 
date: 2021-07-06
slug: quick-tip-javascript-rendering
snippet: JavaScript libraries and frameworks often come with a number of different options of how to render the HTML content. What options do we have and which should you choose?
tags: javascript, webdev, svelte
---

# {title}

## Intro

Popular JavaScript frameworks like [Next.js](https://nextjs.org/), [Nuxt.js](https://nuxtjs.org/) and [SvelteKit](https://kit.svelte.dev/) come with a number of rendering options included. But what does SSR, ISR, SSG and all the other fancy acronyms mean? 

### Client Side Rendering

Minimal static HTML is served back to the user, this will most likely only contain links to scripts and CSS files. The JavaScript is in charge of generating the HTML in the browser. 

Because there are no servers needed you will often see platforms that host static websites for free with a generous amount of network bandwidth e.g. [Render](https://render.com/), [Firebase Hosting](https://firebase.google.com/docs/hosting), [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/). Or you could run this yourself in [AWS storing the files in S3 and backing with a CloudFront CDN](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) for a very low cost (often a few cents a month). 

**Pros** 

- Simple deployments, just an index.html file and built JavaScript
- Easy to scale with static files, that requires no server side compute to serve to the user. 

**Cons**

- SEO requirements can be more complicated ([good video series about that on Google search YouTube channel](https://www.youtube.com/playlist?list=PLKoqnv2vTMUPOalM1zuWDP9OQl851WMM9))
- Some performance metrics can be affected, for example [CLS](https://web.dev/cls/) & [FCP](https://web.dev/fcp/) 
- All JavaScript is shipped to the client, so it must not contain any secrets / private data

**Ideal for**

- Applications that require authentication to use
- Applications without SEO requirements
- Applications that receive spikes in traffic (static HTML does not need compute that has to scale)


### Static Generation (SSG)

HTML is generated at **build time** and the full static HTML will be served over the network to the user.

This generates static HTML files, which means much of the same low cost hosting solutions as the client side rendering example can be used. The difference being that with Static Generation you will have a HTML file per page generated, rather than just an index.html.

**Pros** 

- Easy to scale with static files, no servers needed
- Faster response times than if the file was generated on the fly
- Full HTML content served to the user which benefits SEO, FCP, CLS over client side rendering

**Cons**

- Longer build times, that can increase as content on an app increases
- Will often have to be rebuilt to update page content
- Cannot contain personalised content, the same generated page is served to all users

**Ideal for**

- Applications where content / data is not required to be updated frequently
- Applications with high performance requirements
- Applications that receive spikes in traffic (static HTML does not need compute that has to scale)

### Server Side Rendering 

HTML is generated on request and the full static HTML will be served over the network to the user.

As it implies in the name, this requires a server side component. Each request will need to use some compute to generate the HTML (if you are not using a cache). You could use a serverless platform here like [Begin](https://begin.com/), [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) to mitigate having to manage any servers.

**Pros** 

- Full HTML content served to the user which benefits SEO, FCP, CLS over client side rendering
- Data can be dynamic on each request

**Cons**

- Each request to the origin requires some server side compute resource
- Slower response time than static generation

**Ideal for**

- Applications where content / data is updated often
- Applications with personalised content
- Applications with strict SEO requirements 

## Hybrid

This can be considered a mixture of the above approaches. Frameworks like Next.js, Nuxt.js & SvelteKit (to name a few) have excellent APIs to achieve this. 

To demonstrate this let us look at a simple example scenario with SvelteKit. Imagine we are building a blog with the following specification - 

- A static welcome homepage
- A blog page that lists posts with content from a CMS

We could split these pages into different categories:

- The homepage is static and won't change, so we can generate this at build time
- The blog listing page, well that depends. We could generate the list page at build time with static generation but if the data source for blogs is often being updated then it might make sense to use SSR which would allow the page to update as the content updates.

This sounds like it might be complicated to mix and match, but the frameworks make this easy. 

Homepage (pages/index.svelte)

```html
<script context="module">
    // exporting this variable is all you need to do
	export const prerender = true;
</script> 

<svelte:head>
	<title>Homepage</title>
    <meta name="description" content="My homepage">
</svelte:head>

<main>
    <!--  content goes here -->
</main>

``` 


Blog List (pages/blog/index.svelte)

```html
<script context="module">
     // export a load function to grab data server side
	export async function load({ page, fetch, session, context }) { 
        const blogs = await fetch('https://mycms.io').then((response) => response.json());

        return {
            props: {
                blogs
            }
        }
    })
    // we have static generation disabled
	export const prerender = false;
</script> 

<script>
    export let blogs;   
</script>

<main>
    <BlogPosts blogs={blogs}/>
</main>

```

> If you wanted to switch this to being statically generated like discussed above, you could just set prerender to true. (be aware, in svelte the load function is run on the client and server)


### Incremental Static Regeneration (ISR)

One more I wanted to include under the hybrid list is a feature of Nuxt.js and Next.js they call [Incremental Static Regeneration (ISR)](https://vercel.com/docs/next.js/incremental-static-regeneration#). This can be viewed as a middle ground between SSR and SSG, if you use ISR then the page will be generated at build time like it would if you use static generation. But with ISR you specify a duration, and after this duration passed the page will be regenerated.

![ISR Diagram](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fisr%2Fregeneration.png&q=75&w=1080)

With this, you get the benefits of static generation but the increased frequency of updates that you get from SSR. This would actually be a good solution to our blogs list page from above. ISR can allow us to have a pre-rendered page but will update frequently enough to support any new blogs being added to the CMS. 

## Tip

Unfortunately, there is not one answer to how you should render your application. It is highly specific to what you are building. The good news is that hybrid rendering makes this specificity possible to allow best mix in your application. 

For the **best performance and low cost, static generation is recommended**. I find myself saying 'can I pre-render this?' more and more, and often when I have something on the page that is dynamic like comments on a blog post. I'll mix in a component that grabs and renders that data client side before reaching for SSR. Why? This allows the initial content for the user to be pre-rendered with the dynamic part sprinkled on top in the client.  