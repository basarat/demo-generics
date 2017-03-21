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