# Sorting items in TypeScript
> In this lesson we cover how to sort items using TypeScript.


Each array in JavaScript has a sort method.

```js
[].sort
```
The sort method will by default sort in ascending order using string Unicode code points. This works fine for sorting string arrays:

```js
const arr = ['foo','bar'];
arr.sort();
console.log(arr);
```

There are two big words of caution with the built in method.
* 1 it mutates the array.

```js
const arr = ['foo','bar'];
const copy = arr.sort();
console.log(arr);
```
You will sadly code like this (the copy) is many beginner JavaScript code bases.
*  Fortunately with TypeScript you can fix it by annotating the array as a ReadOnly array of string.
*  And now any mutating methods like this `sort` method will no longer be allowed. 
* You can now fix it easily by creating a copy of the array using array prototype slice.
* And now the original array remains intact as people do array mutations.

```js
const arr: ReadonlyArray<string> = ['foo', 'bar'];
const copy = arr.slice().sort();
console.log({arr, copy});
```

* The second word of caution with the builtin sort method is that it uses `toString` on each item. e.g. if we have an array of numbers

```js
const foo = [1, 3, 22];
foo.sort();
console.log(foo);
```

It gets sorted with unexpected results. Essentially as far as the comparison behaviour is concerned it is the same as 

```js
const foo = [1, 3, 22].map(x => x.toString());
console.log(foo);
```
And you can see that alphabetically the string `20` should come before `3` just like in the dictionary "aa" will come before "b"

* To properly compare anything other than strings or even sorting in more than.

As a footnote the implementatation of the sort algorithm is left open to the implementing but all browsers implement it using algorithms like mergesort and quicksort that have NLogN asymptomatic times on average.
