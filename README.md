# Hello Next.js

First approach to [Next.js](https://nextjs.org/) following the official
interactive course.

## Where am I learning Next.js

I found this interactive course in [Next.js' official page](https://nextjs.org/learnutm_source=next-siteutm_medium=homepage-cta&utm_campaign=home).
There you can find two courses:

1. [Create a dashboard app with Next.js](https://nextjs.org/learn/dashboard-app)
1. [React foundations](https://nextjs.org/learn/react-foundations)

By now, I'm doing the first one because I've done some `React.js` courses
before:

- [React Tic Tac Toe](https://github.com/pabcrudel/react-tic-tac-toe)
- [React Data Fetching](https://github.com/pabcrudel/react-data-fetching)
- [React eCommerce Shopping
  Cart](https://github.com/pabcrudel/react-ecommerce-shopping-cart)
- [React Film Archive](https://github.com/pabcrudel/react-film-archive)
- [React Router Clone](https://github.com/pabcrudel/react-router-clone)

## Next.js Dashboard App

### Setting up the starting point

To start this course you must install it's starting point.

```bash
npx create-next-app@latest dashboard-app --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```

>In that repository there are other 2 courses. However, they seem to be courses
>of previous `Next.js` version or they use different router API's:
>
>- [Create a Next.js
>  App](https://nextjs.org/learn-pages-router/basics/create-nextjs-app)
>- [Search Engine
>  Optimization](https://nextjs.org/learn-pages-router/seo/introduction-to-seo)

Once created, the terminal shows that output:

```bash
Success! Created dashboard-app at D:\zcode\react\hello-nextjs\dashboard-app
Inside that directory, you can run several commands:

  npm run dev
    Starts the development server.

  npm run build
    Builds the app for production.

  npm start
    Runs the built app in production mode.

We suggest that you begin by typing:

  cd dashboard-app
  npm run dev
```

First step is done.

### CSS Styling

There are 3 ways to style an app:

- CSS Framework. In this case, `Next.js` recommends
[Tailwindcss](https://tailwindcss.com/).
- [clsx](https://github.com/lukeed/clsx#readme) library. Third party library
  that provides a way to toggle class name depending on some condition.

  ```jsx
    import clsx from 'clsx';
    
    export default function InvoiceStatus({ status }: { status: string }) {
      return (
        <span
          className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-sm',
            {
              'bg-gray-100 text-gray-500': status === 'pending',
              'bg-green-500 text-white': status === 'paid',
            },
          )}
        >
        // [...]
    )}
  ```

- CSS Modules. "Provide a way to make CSS classes locally scoped to
  components by default, reducing the risk of styling conflicts" -
  [Next.js](https://nextjs.org/learn/dashboard-app/css-styling#css-modules).

  Using CSS Modules I can control the scope of any CSS rule. In this case, they
  provide me the following css:

  ```css
  .shape {
    height: 0;
    width: 0;
    border-bottom: 30px solid black;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
  }
  ```

  Then I import it in my component and add it to a `<div>` tag:

  ```jsx
  import styles from '@/app/ui/home.module.css';

  export default function Page() {
    return (
      // [...]
      <div className={styles.shape} />
      // [...]
    );
  }
  ```

  When the page is rendered, I inspect the code and I saw that the class name
  was hashed:

  ![Class name is hashed to make it
  unique](readme-imgs/css-modules-hashes-class-names.png)

  I guess that by hashing a class name it became unique even if there are
  another class with the same name.

### Optimizing fonts

`Next.js` improves website performance by downloading all fonts at build time
and storing them as static files to avoid additional network requests.

You can use any [Google Fonts](https://fonts.google.com/) by importing them from
`Next.js`. [Variable fonts](https://fonts.google.com/variablefonts) can be used
without specifying it's width.

```ts
import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin']
});
```

They can be imported at any part of the application and works like
`CSS Modules`: you can add them as a class and when the app is rendered, they
appear hashed.

```jsx
import { inter } from '@/app/ui/fonts';

export default function MyLayout() {
  return (
    <html lang="en">
      {/* antialiased: Tailwind class to improve font rendering */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

![Fonts' class name is hashed](readme-imgs/fonts-class-name-is-hashed.png)

### Optimizing images

"Image Optimization is a large topic in web development that could be considered
a specialization in itself" - [Next.js](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#why-optimize-images)

They provide an `Image Component` that, according to them, automatically
triggers the following actions:

>- Prevent layout shift when images are loading

It's when the layout moves to fit a new image that is just being loaded.

>- Resizing images to avoid shipping large images to devices with a smaller
>  viewport. Even for images stored on remote servers.

Sending a big image to a small device doesn't make sense because of loading
costs. It's better to send the image resized to the actual device width.

>- Lazy loading images by default (images load as they enter the viewport).

This feature increase web page loading time because the client only downloads
what the user can see. Only scrolling will trigger the download of images that
are below.

>- Serving images in modern formats, like
>  [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp)
>  and
>  [AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image)
> , when the browser supports it.

WebP and AVIF are image extensions that are optimized to browsers. However, they
aren't supported in all browsers.

#### Usage

You can find how to use the `Image Component` in [Next.js official docs](https://nextjs.org/docs/app/building-your-application/optimizing/images#usage)
However, I going to left here a summary using their examples.

##### Import

```jsx
import Image from 'next/image'
```

##### Local images

You can use `.jpg`, `.png`, or `.webp` image files.

There are two ways to use local images:

1. Import an image as a static asset.

    This is the simplest way to use this component. At build time, `Next.js`
    import your image and set it's actual width and height. However, you can
    specify different sizes.

    ```jsx
    import Image from 'next/image'
    import profilePic from './me.png'

    export default function Page() {
      return <Image src={profilePic} alt="Picture of the author" />
    }
    ```

1. Use a relative path inside `src` prop.

    You must specify the image width and height or this will throw an error.

    ```jsx
    import Image from 'next/image'

    export default function Page() {
      return (
        <Image
          src="/me.png"
          width={1000}
          height={760}
        />
      )
    }
    ```
