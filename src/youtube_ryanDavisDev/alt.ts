// Using a fallback pattern with Options
// https://www.youtube.com/watch?v=G0UEFI4ymhg

import {pipe} from 'fp-ts/function'
import * as O from 'fp-ts/Option'

function someFn() {
    const aOpt = O.none
    const bOpt = O.none
    const default_ = "i am default value"

    return pipe(
        aOpt,
        O.alt(() => bOpt),
        O.getOrElse(() => default_)
    )
}


console.log(
    someFn()
);
