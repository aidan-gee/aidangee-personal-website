---
title: Getting Started with Machine Learning Models in the Browser with TensorFlow.js
date: 2021-06-30
slug: getting-started-with-tensorflow-in-the-browser
snippet: How to get started with TensorFlow.js to run pre-trained models on a users device in the browser.
tags: javascript, ML, TensorFlow
---

# {title}


## Intro

There were a great set of talks this year at [Google IO 2021](https://www.google.com/io), one that piqued my interest was [this talk on machine learning & TensorFlow](https://www.youtube.com/watch?v=qKkjCQlS1g4). There is a lot great new stuff here, but I'll summarize some key points from a web perspective. 

-  TensorFlow Lite models can now directly be run on the web in the browser 🎉
-  Supports running all TFLite Task Library models for example image classification, objection detection, image segmentation and NLP

So I wanted to see how viable it is to use ML models on device in the browser.


## TensorFlow.js & Pre-trained Models

[TensorFlow.js](https://www.tensorflow.org/js/) is a library for machine learning in JavaScript and can be used both in the browser and Node.js. We can use this library to build, run and train supported models. 

What is great for starters in the ML world (like me), is that this library comes with a [number of pre-trained TensorFlow.js models](https://www.tensorflow.org/js/models). So anyone can jump in and start using things like image object detection or text toxicity detection without the huge barrier to entry that is model training. 

Let's take a look at how the code looks for running object detection on an image. 

```javascript
// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
import('@tensorflow/tfjs-backend-cpu');
import('@tensorflow/tfjs-backend-webgl');
import { load } from '@tensorflow-models/coco-ssd';

(async () => {
  const img = document.querySelector('img');

  // Load the model.
  const model = await load();

  // Classify the image.
  const predictions = await model.detect(img);

  console.log('Predictions: ', predictions);
})();
```

So in just a few lines of JavaScript we have managed to load and run a ML Model in the browser on an image 🎉. This is not even restricted to images, the detect method will accept a canvas element, video element and a [3D tensor shape](https://js.tensorflow.org/api/latest/#tensor). So quite quickly here, we could do something like track objects as a video is playing:

```javascript
// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
import('@tensorflow/tfjs-backend-cpu');
import('@tensorflow/tfjs-backend-webgl');
import { load } from '@tensorflow-models/coco-ssd';

(async () => {
  const videoEl = document.querySelector('video');

  // Load the model.
  const model = await load();

  // Classify the frame of the video.
  // timeupdate is a quick way to run this as the video plays
  videoEl.addEventListener('timeupdate', function (){
    const predictions = await model.detect(videoEl);
    console.log('Predictions: ', predictions);
  })

})();
```


The predictions you get back from the detect function look like this:

```javascript
  [{
    bbox: [x, y, width, height],
    class: "person",
    score: 0.8380282521247864
  }, {
    bbox: [x, y, width, height],
    class: "sports ball",
    score: 0.74644153267145157
  }]
```

> Note : The position (bbox) variables you get back will be based on the original video resolution. 

You could use this data to detect some context of what was in a particular video or track certain objects in the video as it plays plays... all in the browser. 

![object recognition highlighted football in a video](https://res.cloudinary.com/wubo/image/upload/c_scale,f_auto,q_72,w_1435/v1625085017/blog/ml-obbect-recognition-video.png)

## Thoughts

I could not believe how easy this was to get going with. The pre-trained models are a breeze to use and I would definitely recommend checking out the [full list](https://www.tensorflow.org/js/models).

Depending on how you plan to use this functionality, something to keep in mind is the download times of models and how this effects the UX. For example, I found the Coco SSD model to take about 10 seconds to download on a solid Wi-Fi connection. So if your application relied on this, you are going to have extremely long start up times and probably frustrated users. Loading them in the background before the user needs them would be a nicer solution. 

I am excited to see this space develop over the next few years. I think we all know about the growth of AI / ML but having this be available to run so easily with JavaScript in the browser can only help accelerate it's usage. 