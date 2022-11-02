### What is the difference between `class method`, `class property` which is a `function`, and class property which is an `arrow function`? Does the this keyword behave differently in the different variants of the method?

```js
class Greeter {
  constructor() {
    this.greet();
    this.greet2();
    this.greet3();
  }

  greet() {
    console.log('greet1', this);
  }

  greet2 = () => {
    console.log('greet2', this);
  }

  greet3 = function() {
    console.log('greet3', this);
  }
}
      
let bla = new Greeter();
```

There are differences between all 3 versions. This differences are in 3 areas:

- Who is this at runtime
- Where the function is assigned
- What is the type of this in typescript.
Lets start with where they work just the same. Consider this class, with a class field:

```js
class Greeter {
  constructor(private x: string) {
  }
  greet() {
    console.log('greet1', this.x);
  }

  greet2 = () => {
    console.log('greet2', this.x);
  }

  greet3 = function () {    
    // this is typed as any 
    console.log('greet3', this.x);
  }
}

let bla = new Greeter(" me");
```
With this class all 3 function calls will print as expected: `'greet*  me'` when invoked on `bla`
```js
bla.greet()
bla.greet2()
bla.greet3()
```
### Who is this at runtime
Arrow functions capture this from the declaration context, so this in greet2 is always guaranteed to be the class instance that created this function. The other versions (the method and function) make no such guarantees.

So in this code not all 3 print the same text:
```js
function call(fn: () => void) {
  fn();
}

call(bla.greet) // greet1 undefined 
call(bla.greet2) //greet2 me
call(bla.greet3) // greet3 undefined
```
This is particularly important when passing the function as an event handler to another component.

### Where the function is assigned

Class methods (such as `greet`) are assigned on the `prototype`, field initializations (such as `greet2` and `greet3`) are assigned in the `constructor`. This means that `greet2` and `greet3` will have a larger `memory footprint` as they require an allocation of a fresh closure each time `Greeter is instantiated`.

### What is the type of this in typescript.

Typescript will type this as an instance of Greeter in both the method (greet) and the arrow function (greet2) but will type this as any in greet3. This will make it an error if you try to use this in greet3 under noImplictAny

### When to use them

Use the `method` syntax if this function will not be passed as an event handler to another component (unless you use bind or something else to ensure this remains the instance of the class)

Use `arrow function` syntax when your function will be passed around to other components and you need access to this inside the function.

Can't really think of a good use case for this, generally avoid.

