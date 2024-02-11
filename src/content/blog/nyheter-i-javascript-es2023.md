---
title: 'Nyheter i JavaScript - ES2023'
intro: 'I år kom ECMAScript 2023, også kjent som ES14. Denne utgaven har lagt til en rekke forbedringer når man jobber med lister.'
description: 'I år kom ECMAScript 2023, også kjent som ES14. Denne utgaven har lagt til en rekke forbedringer når man jobber med lister.'
pubDate: '2023.08.23'
author: Gaute Meek Olsen
heroImage: '/js-hero.webp'
---

## Bakgrunn

Hvert år i juni slippes en ny utgave av ECMAScript, altså spesifikasjonen til JavaScript. I år kom ECMAScript 2023, også kjent som ES14. Denne utgaven har lagt til en rekke forbedringer når man jobber med lister. Vi kan enklere finne innhold fra slutten med `findLast` og `findLastIndex`. Vi kan jobbe med kopier av listen i stedet for metoder som også ville mutert den originale listen, med `toSorted`, `toReversed`, `toSpliced` og `with`. Ellers har vi endringer som at `WeakMap` støtter nå den primitive typen `symbol`. Og til slutt støtte for filer med hashbang på første linje for å angi programmet som skal kjøre filen.

## Finn fra slutten

Når man jobber med arrays har det tidligere vært vanskelig å finne et element fra slutten uten å inngå et kompromiss. Enten har vi ofte mutert listen eller gjort unødvendig kopiering.

Si at vi har en liste med tall og ønsker å finne siste partall.

Nå trenger vi ikke lengre å gjøre slik:

```js
const array = [1, 2, 3, 4, 5]
const lastEven = [...array].reverse().find((n) => n % 2 === 0)
```

Men kan benytte `findLast`:

```js
const array = [1, 2, 3, 4, 5]
const lastEven = array.findLast((n) => n % 2 === 0)
```

Hvis du ønsker å finne index i stedet for selve elementet kan du benytte `findLastIndex`.

## Endre liste med kopi

Visste du at `sort` og `reverse` vil både mutere listen og returnere den? Her er et eksempel med sortering.

```js
const array = [3, 2, 1]
const sorted = array.sort((a, b) => a - b)
console.log(array) // [1, 2, 3]
console.log(sorted) // [1, 2, 3]
```

For å unngå dette har vi brukt en workaround med å ta en kopi selv:

```js
const array = [3, 2, 1]
const sorted = [...array].sort((a, b) => a - b)
```

Nå har vi fått fire metoder som gir oss en kopi i stedet med `toSorted`, `toReversed`, `toSpliced` og `with`.

### toSorted

```js
const array = [3, 2, 1]
const sorted = array.toSorted((a, b) => a - b)
```

### toReversed

```js
const array = [3, 2, 1]
const reversed = array.toReversed()
```

### toSpliced

`toSpliced(startÌndex, deleteCount, item1, item2, itemN)`

```js
const array = [1, 100, 3]
const counting = array.toSpliced(1, 1, 2)
console.log(counting) // [1, 2, 3]
```

### with

`with` metoden vil returnere en kopi av listen og bytter ut elementet på en gitt indeks.

```js
const array = [10, 2, 3]
const counting = array.with(0, 1)
console.log(counting) // [1, 2, 3]
```

## Symboler i WeakMap, WeakSet og WeakRef

`symbol` er en primitiv type i JavaScript som gir garanti for at den er unik. Nå er symboler også tillatt som nøkler i en [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) og verdier i [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) og [WeakRef](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef). Og kan dermed også registreres i [FinalizationRegistry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry).

Disse brukes for å holde på verdier som kan bli tatt av garbage collectoren. Altså at vi har en referanse til noe som vi sier at hvis JavaScript trenger å rydde opp i minnet, så går det fint at vi mister denne dataen. Disse har tidligere ikke støttet symboler, men det er nå mulig.

```js
const symbol = Symbol('my-symbol')

/* symbol as key */
const weakMap = new WeakMap()
weakMap.set(symbol, 10)
console.log(weakMap.get(symbol))

/* symbol as entry */
const weakSet = new WeakSet()
weakSet.add(symbol)
console.log(weakSet.has(symbol))

const weakRef = new WeakRef(symbol)
console.log(weakRef.deref())

const registry = new FinalizationRegistry((value) => {
  console.log(value)
})
registry.register(symbol, 'weakRef is lost')
```

## Hashbang

Hashbang, også kjent som [Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) er når første linje i filen starter med `#!`, som ikke er gyldig JavaScript, men den blir da ignorert når koden kjøres. Slik hashbang/shebang benyttes til å peke på hvilket program som skal kjøre filen. Du kan altså starte JavaScript filen med f.eks. `#!/usr/bin/env node` eller `#!/usr/bin/env -S deno run` for å angi Node eller Deno. 

Si at vi lager filen hello.js:

```js
#!/usr/bin/env node

console.log('👋')
```

I stedet for å kjøre filen med

```sh
node hello.js
```

Trenger vi kun å angi filen slik:

```sh
./hello.js
```

Merk at dette kun er mulig på Unix lignende operativsystemer. Det fungerer altså ikke på Windows.

Dette har vært mulig tidligere også, men endringen i ES2023 er at det er JavaScript enginen som vil ignorere linjen slik at JavaScript runtimen slipper.
