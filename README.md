# ESM Tape Runner

Basic test runner for [tape](https://github.com/substack/tape) that supports ECMAScript Modules (ESM; es6 modules).

Runs your tests in isolation, one after the other.

_(Why? Because [tape runner does not support ESM files](https://github.com/substack/tape/issues/514).)_

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
