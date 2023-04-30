import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe} from 'fp-ts/function'

function doSomething(arr1 : number[], arr2 : number[]) {
    const longerArr = arr1.length > arr2.length
                    ? arr1 
                    : arr2 


    return longerArr.reduce((prev, curr, i) => {
        // console.log({prev});        
        return prev + Math.max(arr1.at(i) ? arr1.at(i)! : -Infinity, arr2.at(i) ? arr2.at(i)! : -Infinity)
    }, 0)
}

console.log(
    doSomething([1,5,3,7], [3,6,1,8,3,5])
);

// const reducefn = (prev : number, curr : number, i) => {
//     // console.log({prev});        
//     return prev + Math.max(arr1.at(i) ? arr1.at(i)! : -Infinity, arr2.at(i) ? arr2.at(i)! : -Infinity)
// }

function doSomethingFpts(arr1 : number[], arr2 : number[])  {
    return pipe(
        A.zip(arr1, arr2),
        A.map((pair : number[])  => Math.max(...pair)),
        (biggerArr) => biggerArr.reduce((prev, curr) => prev + curr , 0)
    )

    // const zipped = A.zip(arr1, arr2)
    // const biggerArr = A.map((pair : number[])  => Math.max(...pair))(zipped)
    // return biggerArr.reduce((prev, curr) => prev + curr , 0)
    
    // A.reduce()
    // console.log(zipped);
    
    // return pipe(
    //     () => arr1.length > arr2.length ? arr1 : arr2,
    //     (largerArr) => {}
    // )
}

console.log(
    doSomethingFpts([1,5,3,7], [3,6,1,8,3,5])
);