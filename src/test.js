var tripleSeven = 777;
var arr1 = [10, 20, 30];
var arr2 = [10, 20, 30];
var arr3 = ['string1', 'string2', 'string3'];
var arr4 = ['test', 1];
var notTyped = 10;
var anyType = 10;
anyType = "test";
anyType = true;
var jiyoung = { name: "jiyoung", age: 30 };
var person = {
    name: "jiyoung",
    age: 30
};
//person = { name: 30, age: 30 }
//옵셔널 파라미터는 디폴트 값 설정할 수 없음
function testOptionalParam(base, optionalParam) {
    console.log('base ', base);
    console.log('optionalParam: ', optionalParam);
}
testOptionalParam("base");
testOptionalParam("base", "optional");
var user = {
    name: "user1",
    age: 30
};
var user2 = {
    name: 'user2',
    age: 35,
    home: true
};
console.log(user);
console.log(user2);


try {
    let numberValue = 1;
    console.log(numberValue.toUpperCase());
    console.log(undefinedVariable);
} catch (error) {
    console.error(error.name)
    console.error(error.message)
}
console.log("끝!")
