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
