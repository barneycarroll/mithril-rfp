# mithril-rfp
RFP stands for Request Fetchy Promise. Extends Mithril 1.X's `m.request` to offer [Promise API](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) compatibility & accept a [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)-like input signature. This is a proof of concept intended to demonstrate that Mithril could easily benefit from implementing a fetch-like, Promise-compatible API for `m.request` without introducing any drawbacks or code complexity.

## Installation
```sh
npm install mithril-rfp
```

and then

```js
var rfp = require( 'mithril-rfp' )

// or, if you want to override the default

var m = require( 'mithril' )
m.request = require( 'mithril-rfp' )
```

Bring your own Promise implementation before including rfp if you think you need it (rfp doesn't provide one). The Mithril 1.X codebase includes one at the time of writing:

```js
if( !global && window )
  var global = window

if( !Promise )
  global.Promise = require( 'mithril/promise/promise' )
```

## Usage
```js
var posts = m.prop( [] )

rfp( '/api/posts' ).then( posts )

// if you're targeting modern browsers / transpiling your code you can make use of ES2016 language features:

async function login( deets ){
  try {
    const { profile, user_id } = await rfp( '/login', {
      method : 'POST',
      data   : deets
    } )

    localStorage.setItem( 'profile', profile )

    m.route.set( `/users/${ user_id }/profile`  )
  }
  catch( e ){
    alert( e )
  }
}
```

## Rationale
Whereas Mithril 0.X's `m.request` implemented the Promise interface, Mithril 1.0.0-rc.3 returns a stream interface instead.

### Promises are a powerful & widely understood standard
`m.request` represents a web service call which will either resolve or reject once at some point in the future. The Promise interface is the Javascript standard for interfacing with XHR transactions, and benefits from common knowledge, a panoply of established tools, and in ES2016 the `await` keyword allows asynchronous functions to wait for them without the use of callbacks, new execution contexts, or method invocation.

### `API( uri )` is a wonderfully terse expression
The standard HTTP transaction invocation is a simple GET request to a given URI with no extra parameters. [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch), [jQuery](http://api.jquery.com/jquery.ajax/), [SuperAgent](https://visionmedia.github.io/superagent/) allow you to make this request with a simple `API( uriOrOptions, moreOptions? )` signature. This is just a superficial signature overload: the options objects are consumed by vanilla `m.request` internally, JSON response is assumed & unwrapped automatically, etc.
