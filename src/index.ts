function reverse<T>(items: T[]): T[] {
  return items.slice().reverse();
}

const objects = [{ name: 'world' }, { name: 'hello' }];
const reversed = reverse(objects);
reversed.pop().name;