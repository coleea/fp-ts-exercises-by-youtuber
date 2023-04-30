import parseUrl from "parse-url" ; 
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe} from 'fp-ts/function'

function isDotcomFpts(url:string) {

    return pipe(
        url,
        (url) => O.tryCatch(() => parseUrl(url)),
        O.map(parsedUrl => parsedUrl?.resource?.split(".")),
        O.chain(a => A.last(a)),
        // O.map(last => last === "com" ),
        // O.getOrElse(() => false)
        O.exists(last => last === "com")
    )
}

console.log(
    isDotcomFpts('www.naver.com')
);

console.log(
    isDotcomFpts('https://www.naver.com')
);

function isDotcom(url:string) {
    try {
        const parsed = parseUrl(url)
        const splited = parsed.resource.split(".")
        if(splited.length >= 1 ) {
            return splited.at(-1) === "com"
            ? true 
            : false 
        } return false        
    } catch (error) {
        return false
    }
}

// console.log(
//     isDotcom("www.naver.com")
// );


// console.log(
//     isDotcom("https://www.naver.com")
// );