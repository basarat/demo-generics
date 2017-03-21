# Generic classes using TypeScript
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

> Of course this can quickly become painful e.g. if you want a string queue you have to go through all that effort again.


> Note the constraint is there even if your language is untyped. But in this case it's implicit, you have to figure out a way to explain it to the user and there is no meaningful way for tools to use this knowledge and enforce these constraints.

