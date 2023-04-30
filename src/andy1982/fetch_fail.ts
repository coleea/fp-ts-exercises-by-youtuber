// https://www.cnblogs.com/Andy1982/p/15402950.html

import axios from 'axios'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'

const mustFail = (url : string) => {
  return pipe(
    TE.tryCatch(
      () => axios.get(url),
      (reason) => new Error(`${reason}`),
    ),
    TE.map((resp) => resp.data),
    // TE.getOrElse((e) => T.of(JSON.stringify(e)))
    TE.getOrElse((e) => T.of("FAILED"))
  )
}

mustFail('https://httpstat.us/500')().then(console.log)