# ESM Tape Runner

Basic test runner for [tape](https://github.com/substack/tape) that supports ECMAScript Modules (ESM; es6 modules).

Runs your tests in isolation, one after the other.

I originally created this module because [tape runner did not support ESM files](https://github.com/substack/tape/issues/514). [This has now been fixed](https://github.com/substack/tape/pull/547) so:

__For most purposes, you can simply use Tape directly now without need of this module.__

Where version 2.x of this module is still useful is if you need to run your tests using a custom [ES Module Loaders](https://nodejs.org/docs/latest-v16.x/api/esm.html#loaders) because your application uses one. You cannot specify this with Tape directly as tape is a CJS application.

## Install

```sh
npm i --save-dev @small-tech/esm-tape-runner
```

## Usage

Run all the tests in the _test_ folder:

```sh
npx esm-tape-runner 'test/**/*.js'
```

Run all the tests in the _test_ folder and pipe the output to [tap-monkey](https://github.com/small-tech/tap-monkey) for a monkeyrific experience.

```sh
npx esm-tape-runner 'test/**/*.js' | npx tap-monkey
```

Do the same thing as above, but from a test script in your _package.json_ file:

```json
"scripts": {
  "test": "esm-tape-runner 'test/**/*.js' | tap-monkey",
}
```

(Now your tests will run whenever you invoke `npm test`.)

## Advanced usage (with custom ES Module Loaders)

Pass the glob as your first argument as usual. Follow that with any environment variables and/or Node flags you want the runner to pass onto the Node process, including specifying your ES Module Loader.

For example:

```json
"scripts": {
  "test": "esm-tape-runner tests/utils.js NODE_OPTIONS='--require=./suppress-experimental.cjs' --enable-source-maps --experimental-modules --experimental-specifier-resolution=node --experimental-vm-modules --experimental-loader ./lib/processes/loader.js | tap-monkey",
}
```

In the example above, the environment variable `NODE_OPTIONS` will be passed to the Node process (in this case, to require the [suppress-experimental.cjs](https://github.com/small-tech/nodekit/blob/main/suppress-experimental.cjs) CJS script to hide Node warnings about using experimental features), it will also pass all the Node flags to Node, including the `--experimental-loader` flag to load your custom ES Module Loader. The example also pipes the output to tap-monkey.

Note that if you have a broadcast channel open between your ES Module Loader process and your main process while running your tests, you will have to manually exit your tests once they’re finished. e.g., 

```js
import test from '@small-tech/tape-with-promises'

test.onFinish(() => {
  // We must exit manually as we are using a custom ES Module Loader.
  process.exit()
})
```

## Coverage

For code coverage, run your tests using [c8](https://github.com/bcoe/c8) and pipe your output to [tap-monkey](https://github.com/small-tech/tap-monkey) because you like beautiful borders and rounded corners in your coverage output (admit it, you do, and the monkey knows it).

```sh
npx c8 esm-tape-runner 'test/**/*.js' | npx tap-monkey
```

As with testing, you don’t need npx to run coverage when invoking it from a test script:

```json
"scripts": {
  "test": "c8 esm-tape-runner 'test/**/*.js' | tap-monkey",
}
```

(Now your coverage will run whenever you invoke `npm run coverage`.)

## Similar libraries

I initially tried using [tape-es](https://github.com/vanillaes/tape-es) but I ran into a bunch of problems due to it running tests in parallel. If you’re smarter than I am, you might want to give it a shot and see if it works for you.

The tape readme recommends using [bable-tape-runner](https://www.npmjs.com/package/babel-tape-runner) and [buble-tape-runner](https://www.npmjs.com/package/buble-tape-runner) but my stuff doesn’t use or need babel/buble/Bublé. If yours does, those might be the right test runners for you.

## Like this? Fund us!

[Small Technology Foundation](https://small-tech.org) is a tiny, independent not-for-profit.

We exist in part thanks to patronage by people like you. If you share [our vision](https://small-tech.org/about/#small-technology) and want to support our work, please [become a patron or donate to us](https://small-tech.org/fund-us) today and help us continue to exist.

## Copyright

&copy; 2021 [Aral Balkan](https://ar.al), [Small Technology Foundation](https://small-tech.org).

## License

ISC.
