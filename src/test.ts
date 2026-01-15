let tripleSeven: number = 777;
let arr1: number[] = [10, 20, 30];
let arr2: Array<number> = [10, 20, 30];
let arr3: Array<string> = ['string1', 'string2', 'string3'];
let arr4: [string, number] = ['test', 1];

let notTyped = 10;
let anyType: any = 10;
anyType = "test"
anyType = true

let jiyoung: object = { name: "jiyoung", age: 30 };

let person: { name: string; age: number } = {
    name: "jiyoung",
    age: 30
};

//person = { name: 30, age: 30 }

//옵셔널 파라미터는 디폴트 값 설정할 수 없음
function testOptionalParam(base: string, optionalParam?: string) {
    console.log('base ', base);
    console.log('optionalParam: ', optionalParam);
}

testOptionalParam("base");
testOptionalParam("base", "optional");

//인터페이스, 인터페이스 옵셔널
interface User {
    name: string;
    age: number;
    home?: boolean;
}

const user: User = {
    name: "user1",
    age: 30
}

const user2: User = {
    name: 'user2',
    age: 35,
    home: true
}

console.log(user)
console.log(user2)

//tsconfig.json
//typeScript프로젝트를 설정하는 json파일

let testValue: String = "testValue"