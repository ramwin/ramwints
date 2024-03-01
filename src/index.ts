export interface Student {
  id: number
  name: string
  age: number
}

export const alice: Student = {
  id: 1,
  name: "alice",
  age: 18,
}

export const bob: Student = {
  id: 2,
  name: "bob",
  age: 19,
}

console.log(alice);


export const mutate = <K extends string, O extends {[KK in K]: unknown}>(a: O, b:O, keys: K[]) => {
  keys.forEach(key=> {
    a[key] = b[key]
  })
}

mutate(alice, bob, ["name"])

const keys = ["name"]
keys.forEach(<K extends keyof Student>(c: K) => {
  alice[c] = bob[c]
});

console.log(alice);
