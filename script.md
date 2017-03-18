# Sorting arrays in TypeScript
> In this lesson we cover all the details of how to sort a list of items using TypeScript.

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

* All of these requirements can be met for JavaScript numbers by simply returning the expression `a - b`.

```js
const foo = [1, 3, 22];
foo.sort((a,b) => a - b);
console.log(foo);
```

Now that we know how to sort numbers and strings lets cover how to sort complex object. e.g. here we have a list of top movies along with their date of release
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
]
```
We can sort these by the year by comparing the years in the sort function
```js
movies.sort((a,b) => a.year - b.year);
console.log(movies);
```
And you can see that it works as expected.

* To sort items in descending order you can just swap your logic in the comparer function : 

```js
movies.sort((a,b) => b.year - a.year);
console.log(movies);
```

As a footnote the implementatation of the sort algorithm (_highlight the sort function_) is left open to the implementing runtime. All browsers implement it using algorithms like mergesort and quicksort that have O(n * log(n)) asymptomatic times on average.
