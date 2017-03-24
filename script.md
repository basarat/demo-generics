# Generics using TypeScript
> In this lesson we cover the key reason why programming languages need generics. We then show all the ways to use them effectively with TypeScript.

Consider a simple class that implements the Queue data structure 

```js
class Queue {
  protected data = [];
  push = (item) => this.data.push(item);
  pop = () => this.data.shift();
}
```
* It has an array where it stores the data
* A method to push a new item into the queue 
* A method to pop an existing item from the queue

An issue with this implementation is that you can push a variable of any type on to the queue and pop anything

```js
const queue = new Queue();
queue.push(0);
queue.push("1"); // Ops a mistake

// later
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
```

One solution (and in fact the only solution for languages that don't support generics) is to go ahead and create special classes just for these contraints. e.g. a quick and dirty number queue

```js
class NumberQueue extends Queue {
  push = (item: number) => super.push(item);
  pop = (): number => super.pop();
}
```

And now a user of your data structure will be limited to the correct data type: 

```js
const queue = new NumberQueue();
queue.push(0);
queue.push("1"); // ERROR
```

* Of course this can quickly become painful e.g. if you want a string queue you have to go through all that effort again (highlight the NumberQueue class).

* What you really want is a way to say that whatever the type of stuff we push, is the same as the type of stuff we pop. (highlight push and highlight pop).

This is why programming languages need generics, to allow you to specify such constraints at compile time.

* We add a generic parameter to the Queue class. You are free to call it whatever you want. 
* We constrain the items passed to push 
* and the values that are returned from pop

```js
class Queue<TValue> {
  private data = [];
  push = (item: TValue) => this.data.push(item);
  pop = (): TValue => this.data.shift();
}
```

Note the constraint was there even when we left it untyped like raw JS. But in that case it's implicit, you have to figure out a way to explain it to the user and there is no meaningful way for tools to use that knowledge. Here TypeScript can enforce these constraints.


The usefullness of generics shines even you have object literals and can prevent typos e.g. 
* Here I have a names queue where each item has a `name` property
* I can push an object that has the name property. 
* However if I try to push something that doesn't conform to the name object due to a typo I get a compiler error.

```js
const names = new Queue<{name:string}>();
names.push({name: 'hello'});
names.push({neme: 'world'});
```
Bugs like this can be hard to track down but with generics you can offload that work to the compiler.

You can also use generics to contrain members of a simple function e.g. 
* a reverse function for an array `T` will also return an array of `T`
* within the function we simply clone the array using `slice` and return the reversed version of the cloned array.

```js
function reverse<T>(items: T[]): T[] {
  return items.slice().reverse();
}
```
* Now if we use this function on an array of objects

```js
const objects = [{name: 'world'}, {name: 'hello'}];
const reversed = reverse(objects);
```
* TypeScript knows that the reversed array is also an array of similar objects. (show quick info on reversed)
* And will complain if do something invalid with the array e.g. push an invalid item
```js
reversed.push({neme: ''}); // ERROR
```
Or read an invalid property
```js
reversed.pop().neme; // ERROR 
```
