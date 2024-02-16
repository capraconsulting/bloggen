---
title: 'Nyheter i JavaScript - ES2022'
intro: 'I juni 2022 kom det en håndfull nye features i JavaScript.'
description: 'I juni 2022 kom det en håndfull nye features i JavaScript. Les mer >>'
pubDate: '2022.06.28'
author: Gaute Meek Olsen
heroImage: '/innhold/nyheter-i-javascript-es2022.webp'
tags: ['Frontend', 'JavaScript']
---

## TLDR - Too Long, Didn't Read

Hvis du ikke ønsker å lese hele artikkelen, så har jeg samlet de viktigste endringene i denne kodeblokken. Les videre for forklaring.

```js
/* Top-level await */
const response = await fetch('https://www.capraconsulting.no/blogg');

/* .at() */
const last = ['🐯', '🐥', '🦞'].at(-1);

/* Error cause */
new Error('Some error', { cause: 'cause of error' });

/* Object.hasOwn */
Object.hasOwn({ myNumber: 5 }, 'myNumber');

/* Regular expression /d flag */
/Capra/d.exec('Hvor er Capra?').indices[0];

/* New class elements */
class Robot {
  static maxAge = 100;
  #age = 10;
}
```

## Bakgrunn

Hvert år i juni, kommer det en ny utgave av ECMAScript som er spesifikasjonen av JavaScript. Det er TC39 kommiteen som er ansvarlig for å ta forslag fra ide til godkjenning, også kjent som stage 0 til 4 som er bedre forklart på [https://tc39.es/process-document/](https://tc39.es/process-document/). Årets utgave vil da inkludere alle forslag som har nådd stage 4. I år ble ES2022, også kjent som ES13, sluppet med et knippe nye features som vi skal se på.

## Top-level await

I 2017 fikk vi `async` og `await` i JavaScript for å enklere håndtere asynkron kode. Men det kom med begrensningen om at vi måtte bruke `await` inne i en `async` funksjon. Nå kan vi benytte `await` på rotnivå i moduler. Merk at med top-level `await` vil koden som kommer etter vente med å kjøre til den asynkrone koden har kjørt ferdig.

Det er altså slutt på denne merkelige syntaksen for å kjøre koden direkte med `await`.

```js
(async () => {
  const response = await fetch('https://github.com/');
  console.log(await response.text());
})();
```

Og vi kan heller skrive det slik.

```js
const response = await fetch('https://github.com/');
console.log(await response.text());
```

## .at() metode på Array og string

Arrays og strings har fått en ny metode `at()` som tar inn et tall og returnerer elementet på den indexen. Men det er jo akkurat det samme som å benytte brackets tenker du kanskje nå. Det stemmer og jeg kommer fortsatt til å bruke det for det meste, men `at()` støtter negative indekser for å hente elementer fra slutten. Det har da f.eks. blitt mye enklere å hente siste element.

```js
const list = ['🐯', '🐥', '🦞'];
// Old way was list[list.length - 1]
const last = list.at(-1); // 🦞
const first = list.at(0); // 🐯
```

## Error cause

Det kjente `Error` objektet har fått en ny property `cause` som benyttes for å indikere årsaken til feilen. Det kan være nyttig for å fange en `Error` for så å kaste det videre med en mer spesifikk error melding. Verdien kan være av typen any, så du kan ikke gjøre antagelser for at den f.eks. er av typen `Error`.

```js
try {
  const empty = {}
  console.log(empty.not.existing)
} catch (error) {
  throw new Error('It failed', { cause: error });
}
```

## Object.hasOwn

`Object.hasOwn` kan benyttes for å sjekke om et property eksisterer på et objekt. Det er et mer beleilig alternativ til `Object.prototype.hasOwnProperty`.

```js
const object = {
  myNumber: 5
}
console.log(Object.hasOwn(object, 'myNumber')); // true
console.log(Object.hasOwn(object, 'nonExistent')); // false
```

##  RegExp indekser flagg

Regular expressions har fått et nytt flagg `/d` for å generere indekser for subtekster av dine treff. Slik vet du når teksten begynner og hvor den slutter.

```js
const match = /wolf/d.exec('strong wolf pack');
const [start, stop] = match.indices[0]; // [7, 11]
```

## Nye klasseelementer

I 2015 kom klasser til JavaScript, men det har ikke slått helt igjennom på samme måte som i andre språk. Kanskje var grunnen at det manglet blant annet private og statiske felter og metoder. Nå har hvertfall klassene fått seg en oppgradering.

Du kan opprette felter uten å gjøre det inne i en konstruktør.

```js
class Robot {
  name = 'Optimus Prime';
}
```

Du kan benytte private felter og metoder, som ikke kan aksesseres fra utsiden. Dette gjøres med `#` som prefiks.

```js
class Robot {
  #age = 0;

  #increaseAge(addedYears) {
    this.#age += addedYears;
  }
}
```

Du kan benytte statiske felter og metoder med nøkkelordet `static`. Dette kan gjøres i kombinasjon med private felter og metoder, men som statisk. I tillegg så har du mulighet til å lage en statisk blokk som vil kjøre når klassen opprettes, som vil si når JavaScript-filen kjøres, ikke når du initierer et objekt av klassen. Dette kan hjelpe deg med å sette statiske verdier mer programmatisk.

```js
class Robot {
  static price = 999;
  static #maxAge = 100;
  static {
    const isSale = new Date().getHours() < 10;
    if(isSale) {
      this.price = 50;
    }
  }
  static #privateMethod() {
    console.log('private static method called');
  }
  static publicMethod() {
    console.log('public static method called');
  }
}

console.log(Robot.price);
```

## in operator for private felter og metoder

Siste nyhet er at vi kan benytte `in` operatoren for å sjekke om et privat felt eller metode er definert på klassen. Jeg er litt usikker på når man vil få bruk for det, men koden ser slik ut.

```js
class Robot {
  #age = 0;
  static hasAge(object){
    return #age in object;
  }
}

const robot = new Robot()
console.log(Robot.hasAge(robot)); // true
console.log(Robot.hasAge({})); // false
```
