function sum(...nums) {
    return nums.reduce((a,b) => a+b, 0)
}

console.log(sum(1,2,3))


function legacy(){
    console.log(Array.isArray(arguments))
    console.log([...arguments].map (x => x *2))
}

function modern(...args){
    console.log(Array.isArray(args));
    console.log(args.map (x => x * 2));
}

modern(1,2,3);

const arr = [1, 2]; //Spread operator
console.log([0, ...arr,3]);

const obj = {a:1};
const newObj = {...obj, b:2};

console.log(newObj);

const nums = [3,5,2];
Math.max(...nums); //Spread operator in math

function createCounter(){ //Замыкание
    let count = 0;
    return function(){
        return ++count;
    }
}
const counter = createCounter();
counter();
console.log(counter());
counter();
console.log(counter());

function outer(){ //Lexical Environment
    const x = 10;
    function inner(){
        console.log(x);
    }
}

console.log(outer());

sayHello();

function sayHello(){
    console.log("Hello!");
}

if (true){
    var legacy = "visible";
    let modern = "hidden";
}

console.log(legacy);
console.log(modern);


console.log(a);
var a = 5;
console.log(a);


class Timer{
    constructor(){

        this.value = 42;

        this.logBound = this.log.bind(this);

        this.logArrow = () => console.log(this.value);
    }
    log(){console.log(this.value);}
}

const timer = new Timer();
setTimeout(timer.logBound, 100);
setTimeout(timer.logArrow, 200);

function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation} `);
}
const user1 = { name: 'Alice' };

greet.call(user1, 'Hello', '!'); 
greet.apply(user1, ['hi', '...']);

const boundGreet = greet.bind(user1, 'Welcome');
boundGreet('!!!');


const animal =  { eat: true , walk: true };

const Rabbit = Object.create(animal);
console.log(Rabbit.walk , Rabbit.eat);

const grandParent = {key: "grand"};
const parent = Object.create(grandParent);
const child = Object.create(parent);

console.log(child.key)

function User(name){
    this.name = name;
}

User.prototype.sayHi = function(){
    console.log(`Hi, i am ${this.name}`);
}

const user = new User("john");
user.sayHi();


class Animal {
    constructor(name){
        this.name = name;
    }
    speak(){
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak(){
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog('Rex');
dog.speak();

class Parent {
    static staticMethod(){
        return "Parent static";
    }
}

class Child extends Parent {}

console.log(Child.staticMethod());

try {
    throw new Error("Oops");
} catch (err) { 
    console .log(err.message);
}
finally {
    console.log("Finally block executed");
}

function divide(a, b){
    try {
        return a / b;
    } catch (e){
        console.log("Error:", e.message)
    } finally { //Выполняется всегда не в зависимости от того было исключение или нет 
        console.log("operation complete");
    }
}

divide(4,2);
divide(10,0);

try {
    throw new Error("File not found", {cause: new Error("disk error")});
} catch (e) {
    console.log(e.name);
    console.log(e.message);
    console.log(e.cause.message);
}

function checkAge(age){
    if (age < 18){
        throw new Error("Access denied");
    }
    return true;
}

class ValidationError extends Error {
    constructor(message){
        super(message);
        this.name = "ValidationError";
        this.code = 400;
    }
}

throw new ValidationError("Invalid input");


