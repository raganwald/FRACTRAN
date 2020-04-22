# FRACTRAN

![John Horton Conway at the blackboard](assets/Conway_1k.jpg)

A FRACTRAN interpreter, in honour of [John Horton Conway](https://www.math.princeton.edu/people/john-conway).

### setup and running the examples

Prerequisites:

- A recent-ish installaction of node.
- Babel (if you prefer) https://babeljs.io/docs/en/usage

Installing Babel to compile ES-whatever to node-whatever:

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
```

Print an infinite list of primes using a big integer implementation:

```bash
npx babel src --out-dir lib && node ./lib/integer-primes.js
  => 2
     3
     5
     7
     11
     13
     17
     19
     23
     29
     ...
```

Or limit the number of primes:

```bash
npx babel src --out-dir lib && node ./lib/integer-primes.js 7
  => 2
     3
     5
     7
     11
     13
     17
```

Or compute an arbitrary fibonacci number:

```bash
npx babel src --out-dir lib && node ./lib/integer-fib.js 7
  => fib(7) = 13
```

## More...

[![Building Fizzbuzz in Fractran from the Bottom Up](assets/compiling-to-fractran.png)](https://malisper.me/building-fizzbuzz-fractran-bottom/)

[![HashLife, in the browser](assets/raganwald-hashlife.png)](http://raganwald.com/hashlife/)

[![Gosper’s HashLife in Literate CoffeeScript](assets/cafe-au-life.png)](https://github.com/raganwald/cafeaulife)

