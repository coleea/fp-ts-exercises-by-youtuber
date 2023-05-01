// by evolu
// https://twitter.com/evoluhq/status/1530920057303449601/photo/1

import { flow } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as SRTE from 'fp-ts/lib/StateReaderTaskEither'
import {StateReaderTaskEither} from 'fp-ts/lib/StateReaderTaskEither'

type Config = {logs : string[]}
type Deps = {multiplier : number}

type multiplyType =  (init : number) => StateReaderTaskEither<Config, Deps, never, number> 
const multiply : multiplyType = init => config => deps => () => 
    Promise.resolve(
        E.right([
            init * deps.multiplier,
            {logs : [...config.logs,
                    `multiplying : ${init} * ${deps.multiplier}`
            ]}
        ]))


const multiplyThreeTimes = flow(    
    multiply,
    SRTE.chain(multiply),
    SRTE.chain(multiply),
)

const operand = 2
const config = {logs : ["initialize log"]}
const dependencies = {multiplier : operand}

multiplyThreeTimes(operand)(config)(dependencies)()
.then(res => console.log(JSON.stringify(res)))
.catch(console.log)