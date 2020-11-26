//@flow


// 基本类型的类型标注语法
const age: number = 22;
const a: void = undefined; 
const b: null = null;
age = "22"; // error


// 字面量值作为一种类型
let seven: 7 = 7;
seven = 8; // error


// 函数类型标注
const sum = (a: number, b: number): number => {
  return a + b;
}
sum(1, "1"); // error


// 数组类型标注
const names: Array<string> = ["jeam", "hzy"];
const sz: string[] = ["jeam", "hzy"];
sz.push(1); // error


// 元组（Tuple）类型的标注
const [tag, count]: [string, number] = ["web", 7];


// 对象类型的标注
type User = {
  name: string,
  age: number
};

const user: User = {
  name: "qnyd",
  age: 20
};


// 类的标注
class Book {
  name: string;
  pages: number;
  constructor(name: string, pages: number) {
    this.name = name;
    this.pages = pages;
  }
}


// 联结类型（Union Type）
type strOrNum = string | number;
const id: strOrNum = false; // error


// 交叉类型（Intersection Type）
type X1 = 1 | 2 | 3 | 4 | 5;
type X2 =         3 | 4 | 5 | 6 | 7;
type X3 = X1 & X2; // 3 | 4 | 5


// 对象的可选属性与变量的可选类型
type Test = {
  // key1: string | undefined | null
  key1: ?string,
  // 可以没有key2 有key2就必须为number类型
  // 但js中访问对象没有的属性会返回undefined
  // 所以实际上是 key2: number | undefined
  key2?: number
 };


 // any
 const argument: any = null;