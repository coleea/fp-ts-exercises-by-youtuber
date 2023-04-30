// https://www.bilibili.com/video/BV1D3411s79x/?spm_id_from=333.337.search-card.all.click

import * as ID from 'fp-ts/Identity'
import { pipe, flow } from 'fp-ts/function'

const makeurl = (x : string) => `https://lib.com/?name=${x}`

const requestSync = (x : string) => `one\ntwo` 

const handleResponse = (x : string) => x.split("\n").at(0)


const fn6 = flow(
    makeurl,
    url => ({url, result : pipe(url, requestSync, handleResponse)}),
    ({url, result}) => `${url} : ${result}`
)

console.log(
    fn6("1234")
);

// DO-NOTATION
const fn7 = flow(
    makeurl, ID.bindTo("url"),
    ID.bind(
        "result", 
        flow(x => x.url, requestSync, handleResponse),
    ),
    // ID.map(({url, result}) => `a b`)
    ID.map(({url, result}) => `${url} : ${result}`)
)

console.log(
    fn7("1234")
);
