// https://www.cnblogs.com/Andy1982/p/15402950.html

import axios from 'axios'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'

const aaa = (url : string) => {
  return pipe(
    TE.tryCatch(
      () => axios.get(url),
      (err) => new Error(`${err}`),
    ),
    TE.map((resp) => resp.data),
    TE.getOrElse(() => T.of("Failed")) 
  )

  // console.log(ok)
  // { _tag: 'Right', right: { code: 200, description: 'OK' } }
}

aaa('https://httpstat.us/200')()
.then(console.log)