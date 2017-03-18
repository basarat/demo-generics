# Sorting arrays in TypeScript
> In this lesson we cover all the details of how to sort a list of items using TypeScript. We also present a few tricks to make your sort logic more readable and maintainable using TypeScript.

Each array in JavaScript has a sort method which is designed to sort the array.

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
* One, is that it mutates the array and returns it. This catches new developers off guard who think that `sort` doesn't mutate the original array as it returns a copy.

```js
const arr = ['foo','bar'];
const copy = arr.sort();
console.log(arr);
```
You will sadly code like this (the copy) is many beginner authored JavaScript code bases.
*  Fortunately with TypeScript you can fix such code bases easily by annotating the array as a ReadOnly array of strings.
*  And now any mutating methods like this `sort` method will no longer be allowed on this array.
* You can now fix it easily by creating a copy of the array using array prototype slice and then calling sort.
* And now the original array remains intact when we sort the copied array.

```js
const arr: ReadonlyArray<string> = ['foo', 'bar'];
const copy = arr.slice().sort();
console.log({arr, copy});
```

* The second word of caution with the builtin sort method is that by default it uses string unicode code points to sort the items. e.g. if we have an array of numbers

```js
const foo = [1, 3, 22];
foo.sort();
console.log(foo);
```

It gets sorted with unexpected results. Essentially as far as the comparison behaviour is concerned it is the same as

```js
const foo = [1, 3, 22];
foo.sort();
console.log(foo.map(x => x.toString());
```

And you can see that alphabetically the string `20` should come before `3` just like in the dictionary "aa" will come before "b"

* To properly compare anything other than strings you should pass in a comparer function to the sort method.
* The comparer function will be requested to compare any two values from the array as needed by the builtin sorting algorithm.
* It should return a negative number if a is less than b
* It should return 0 if they are equal
* Or it should return a positive number if a is greater than b.

```js
const foo = [1, 3, 22];
foo.sort((a, b) =>
  /**
   * if a<b return -ve num
   * if a===b return 0
   * if a>b return +ve num
   */
  a - b
);
console.log(foo);
```

* All of these requirements can be met for JavaScript numbers by simply returning the expression `a - b`.

```js
const foo = [1, 3, 22];
foo.sort((a,b) => a - b);
console.log(foo);
```

So you will normally find this in conventional JavaScript code bases.

Now that we know how to sort numbers and strings lets cover how to sort more complex objects. e.g. here we have a list of top movies along with their date of release
```js
const movies = [
  {
    name: 'The Shawshank Redemption',
    year: 1994,
  },
  {
    name: 'The Godfather',
    year: 1972,
  },
  {
    name: 'The Godfather: Part II',
    year: 1974,
  },
  {
    name: 'The Dark Knight',
    year: 2008,
  },
];
```
We can sort these by the year by comparing the years in the sort function
```js
movies.sort((a, b) => a.year - b.year);
console.log(movies.map(movie => movie.name));
```
And you can see that it works as expected.

* To sort items in descending order you simply swap the order between the first and second values in the comparer function :

```js
movies.sort((a,b) => b.year - a.year);
console.log(movies);
```
Swapping these in the parameter clues in the code reviewer to your decending order intent.

One final thing worth mentioning is that the implementatation of the sort algorithm (_highlight the sort function_) is left open to the implementing runtime. All browsers implement it using algorithms that have an O(n * log(n)) average asymptotic runtime.
