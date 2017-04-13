# Generics using TypeScript
> In this lesson we cover the key reason why programming languages need generics. We then show how use them effectively with TypeScript. We show plenty of examples where generics prevent common programming mistakes.

Consider a simple class that implements the Queue data structure

```js
class Queue {
  protected data = [];
  push(item) { this.data.push(item) }
  pop() { return this.data.shift() }
}
```
* It has an array where it stores the data
* A method to push a new item into the queue
* A method to pop an existing item from the queue

* An issue with this implementation is that there is nothing constraining the items that are pushed to the queue to match the items that are poped from the queue.
* Lets demonstrate this by creating a queue. You can push a variable of any type on to the queue e.g. a number or by mistake a string.
* Later on when you pop an item, the developer might think it is always a number and it is safe to call e.g. toPrecision on the popped item but then you get runtime errors. Such errors can be hard to track down in a large code base.

```js
const queue = new Queue();
queue.push(0);
queue.push("1"); // opps a mistake!

/** later */
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // Runtime error!
```

One solution (and in fact the only solution for languages that don't support generics) is to go ahead and create special classes just for these constraints. e.g. a quick and dirty number queue.

Internally it will just call the super implementation.

```js
class NumberQueue extends Queue {
  push(item: number) { super.push(item) }
  pop(): number { return super.pop() }
}
```

* And now if you use this specialized data structure class,
* pushed items will be limited to the correct data type and mistakes will be caught at compile time.

```js
const queue = new NumberQueue();
queue.push(0);
queue.push("1"); // ERROR
```

* Doing class specialization this way by class inheritance can quickly become painful e.g. if you want a string queue you have to go through all that effort again (highlight the NumberQueue class).
* What you really want is a way to say that whatever the type of stuff we push, is the same as the type of stuff we pop.
* This is why programming languages need generics, to allow you to specify such constraints at compile time.

* Since TypeScript supports generics, We can add a generic parameter to the Queue class. You are free to call it whatever you want, we will just call it TValue to indicate its the type of the value.
* We constrain the items passed to push
* and the values that are returned from pop

```js
class Queue<TValue> {
  protected data = [];
  push(item: TValue) { this.data.push(item) }
  pop(): TValue { return this.data.shift() }
}
```

* And now we can use this generic class instead of having to specialize it. We simply instantiate the generic type when we create the queue.
* And you can see that the type flows through to autocomplete on the pop method as well.

Note the constraint between the push and pop methods was there even when we left it as untyped raw JS. But in that case it's implicit, you have to figure out a way to explain it to the user. Generics allow you to not only explain these constraints to your API consumer, but also power compile time type checking tools.

Generics can also prevent typos in object literals, which is the most common form of data in JavaScript projects e.g.
* Here I have a names queue where each item has a `name` property
* I can push an object that has the name property.
* However if I try to push something that doesn't conform to the name object due to a typo I get a compiler error.

```js
const names = new Queue<{name:string}>();
names.push({name: 'hello'});
names.push({neme: 'world'});
```
Bugs like this can be hard to track down but with generics you can offload that work to the compiler.

You can also use generics to constrain members of a simple function e.g.
* a reverse function for an array `T` will also return an array of `T`. The constraint here is between the function argument and the function return value.
* Within the function we simply clone the array using `slice` and return the reversed version of the cloned array.

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
* Because of the generic constraint, TypeScript knows that the reversed array is also an array of similar objects.
* So if you try to push an object with an invalid data structure you can get nice compiler error.

```js
reversed.push({neme: ''}); // ERROR
```
Similarly if you try to read an invalid property on a popped item you will get a compiler error.
```js
reversed.pop().neme; // ERROR
```
