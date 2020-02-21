# react-redux-nano

[![Minified + gzipped size](https://badgen.net/bundlephobia/minzip/react-redux-nano)](https://www.npmjs.com/package/react-redux-nano)
[![NPM version](https://badgen.net/npm/v/react-redux-nano)](https://www.npmjs.com/package/react-redux-nano)
[![License](https://badgen.net/github/license/lusito/react-redux-nano)](https://github.com/lusito/react-redux-nano/blob/master/LICENSE)
[![Stars](https://badgen.net/github/stars/lusito/react-redux-nano)](https://github.com/lusito/react-redux-nano)
[![Watchers](https://badgen.net/github/watchers/lusito/react-redux-nano)](https://github.com/lusito/react-redux-nano)

A simple, lightweight react-redux alternative, written in TypeScript.

#### Why use react-redux-nano

- Very lightweight (see the badges above for the latest size).
- All hooks are compatible to react-redux
- Only has two peer dependencies:
  - React 16.8.0 or higher
  - Redux 4.0.0 or higher
- Using hooks to access redux in react is soo much cleaner than using react-redux's `connect` higher order component.
- Liberal license: [zlib/libpng](https://github.com/Lusito/react-redux-nano/blob/master/LICENSE)

### Installation via NPM

```npm i react-redux-nano```

This library is shipped as es2015 modules. To use them in browsers, you'll have to transpile them using webpack or similar, which you probably already do.

### Examples

#### Creating a Provider

```tsx
import { Provider } from "react-redux-nano";
export const App = () => (
    <Provider store={store}>
        ....
    </Provider>
);
```

#### Dispatching an action

```tsx
import { useDispatch } from "react-redux-nano";
export const MyComponent = () => {
    const dispatch = useDispatch();

    return <button onClick={() => dispatch(subscribeAction())}>Subscribe</button>;
};
```

#### Getting State

```tsx
import { useSelector } from "react-redux-nano";

const selectTitle = (state: State) => state.title;

export const MyComponent = () => {
    const title = useSelector(selectTitle);

    return <h2>{title}</h2>;
};
```

#### Getting State with a comparison function

useSelector will detect changes in the value returned by the selector function by comparing the old value and the new value by reference. Only if they differ, the component will be re-rendered.

If you want more controll, you can pass in a comparison function:

```tsx
import { useSelector } from "react-redux-nano";

const selectUsers = (state: State) => state.users;

const sameMembersInArray = (a: User[], b: User[]) => {
    if (a.length !== b.length)
        return false;
    return a.every((value, index) => value === b[index]);
}

export const MyComponent = () => {
    const users = useSelector(selectUsers, sameMembersInArray);

    return <ul>{users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
};
```

#### Accessing the store itself

In some rare occasions, you might want to access the store object itself.

```tsx
import { useStore } from "react-redux-nano";
export const MyComponent = () => {
    const store = useStore();
    // ...
};
```

#### Gradually moving to react-redux-nano

This library defines a different provider, which works the same way, but it does not provide the redux store to `react-redux`.
So using the original hooks and connect functions from `react-redux` won't work.

If you want to gradually move code from `react-redux` to `react-redux-nano`, you can just add `Provider`s of both libraries.
I.e.:
```tsx
import { Provider } from "react-redux-nano";
import { Provider as LegacyProvider } from "react-redux";
export const App = () => (
    <Provider store={store}>
        <LegacyProvider store={store}>
            ....
        </LegacyProvider>
    </Provider>
);
```

### Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/react-redux-nano/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

### Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

### License

react-redux-nano has been released under the [zlib/libpng](https://github.com/Lusito/react-redux-nano/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
