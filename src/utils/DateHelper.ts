const MS_SECOND = 1000
const MS_MINUTE = ( MS_SECOND * 60 )
const MS_HOUR = ( MS_MINUTE * 60 )
const MS_DAY = ( MS_HOUR * 24 )
const MS_MONTH = ( MS_DAY * 30 ) // Rough estimate.
const MS_YEAR = ( MS_DAY * 365 ) // Rough estimate.

// The Moment.js library documents the "buckets" into which the "FROM NOW" deltas fall.
// To mimic this logic using milliseconds since epoch, let's calculate rough estimates of
// all the offsets. Then, we simply need to find the lowest matching bucket.
// --
// https://momentjs.com/docs/#/displaying/fromnow/
// 0 to 44 seconds --> a few seconds ago
// 45 to 89 seconds --> a minute ago
// 90 seconds to 44 minutes --> 2 minutes ago ... 44 minutes ago
// 45 to 89 minutes --> an hour ago
// 90 minutes to 21 hours --> 2 hours ago ... 21 hours ago
// 22 to 35 hours --> a day ago
// 36 hours to 25 days --> 2 days ago ... 25 days ago
// 26 to 45 days --> a month ago
// 45 to 319 days --> 2 months ago ... 10 months ago
// 320 to 547 days (1.5 years) --> a year ago
// 548 days+ --> 2 years ago ... 20 years ago
// --
// Here are the bucket delimiters in milliseconds:
const FROM_NOW_JUST_NOW = ( MS_SECOND * 44 )
const FROM_NOW_MINUTE = ( MS_SECOND * 89 )
const FROM_NOW_MINUTES = ( MS_MINUTE * 44 )
const FROM_NOW_HOUR = ( MS_MINUTE * 89 )
const FROM_NOW_HOURS = ( MS_HOUR * 21 )
const FROM_NOW_DAY = ( MS_HOUR * 35 )
const FROM_NOW_DAYS = ( MS_DAY * 25 )
const FROM_NOW_MONTH = ( MS_DAY * 45 )
const FROM_NOW_MONTHS = ( MS_DAY * 319 )
const FROM_NOW_YEAR = ( MS_DAY * 547 )


const getTickCount = ( value = Date.now() ) => {

  // If the passed-in value is a number, we're going to assume it's already a
  // tick-count value (milliseconds since epoch).
  if ( typeof( value ) === 'number' ) {

    return( value )

  }

  return( new Date( value ).getTime() )

}

export const timeFromNow = ( value ) => {

  const  nowTick = getTickCount()
  const  valueTick = getTickCount( value )
  const  delta = ( nowTick - valueTick )

  // NOTE: We are using Math.ceil() in the following calculations so that we never
  // round-down to a "singular" number that may clash with a plural identifier (ex,
  // "days"). All singular numbers are handled by explicit delta-buckets.
  if ( delta <= FROM_NOW_JUST_NOW ) {

    return( 'a few seconds ago' )

  } else if ( delta <= FROM_NOW_MINUTE ) {

    return( 'a minute ago' )

  } else if ( delta <= FROM_NOW_MINUTES ) {

    return( Math.ceil( delta / MS_MINUTE ) + ' minutes ago' )

  } else if ( delta <= FROM_NOW_HOUR ) {

    return( 'an hour ago' )

  } else if ( delta <= FROM_NOW_HOURS ) {

    return( Math.ceil( delta / MS_HOUR ) + ' hours ago' )

  } else if ( delta <= FROM_NOW_DAY ) {

    return( 'a day ago' )

  } else if ( delta <= FROM_NOW_DAYS ) {

    return( Math.ceil( delta / MS_DAY ) + ' days ago' )

  } else if ( delta <= FROM_NOW_MONTH ) {

    return( 'a month ago' )

  } else if ( delta <= FROM_NOW_MONTHS ) {

    return( Math.ceil( delta / MS_MONTH ) + ' months ago' )

  } else if ( delta <= FROM_NOW_YEAR ) {

    return( 'a year ago' )

  } else {

    return( Math.ceil( delta / MS_YEAR ) + ' years ago' )

  }
}
