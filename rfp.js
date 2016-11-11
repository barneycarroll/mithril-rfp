if( require )
  var m = require( 'mithril' )

function rfp( a, b ){
  if( typeof a === 'string' ){
    if( typeof b !== 'object' )
      b = {}

    b.url = a

    a = b
  }

  if( !a.method )
    a.method = 'GET'

  var request = m.request( a )

  var promise = new Promise( function( resolve, reject ){
    request.map( resolve )

    request.catch( reject )
  } )

  request.then = promise.then.bind( promise )

  return request
}

if( module && module.exports )
  module.exports = rfp
