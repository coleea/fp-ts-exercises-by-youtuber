// https://www.cnblogs.com/Andy1982/p/15402950.html

import axios from 'axios'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import * as SRTE from 'fp-ts/lib/StateReaderTaskEither'

const mustFail = (url : string) => {
  return pipe(
    TE.tryCatch(
      () => axios.get(url),
      (reason) => new Error(`${reason}`),
    ),
    TE.map(resp => resp.data),
    // TE.getOrElse((e) => T.of(JSON.stringify(e)))
    TE.getOrElse(e => {
      // console.log({e});      
      return T.of(JSON.stringify(e.message))
    })
  )
}

mustFail('https://httpstat.us/500')()
.then(res => console.log(`then으로 받음 : ${res}`))
.catch(e => console.log("에러를 catch로 받음"))