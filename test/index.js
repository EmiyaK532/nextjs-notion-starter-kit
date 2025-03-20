// 2. 面试题二:
var n = 100;
function foo() {
    console.log(n);
    var n = 200;
    console.log(n);
}
foo();
