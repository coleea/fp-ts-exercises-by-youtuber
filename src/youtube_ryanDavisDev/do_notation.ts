import {pipe} from 'fp-ts/function'
import * as O from 'fp-ts/Option'

function someFn() {
    const aOpt = O.fromNullable(1)
    const bOpt = O.fromNullable(1.5)

    pipe(
        O.Do,
        O.bind("a", () => aOpt),
        O.bind("b", ({a}) => bOpt),
        O.map(({a, b}) => a + b)
    )
}