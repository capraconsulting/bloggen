---
title: 'Nyheter i JavaScript - ES2021'
intro: 'I juni 2021 kom det en håndfull med nye features i JavaScript språket.'
description: 'I juni 2021 kom det en håndfull med nye features i JavaScript språket. Les mer om dem her >>'
pubDate: '2021.08.05'
author: Gaute Meek Olsen
heroImage: '/js-hero.webp'
tags: ['Frontend', 'JavaScript']
---

## TLDR - Too Long, Didn't Read

Hvis du ikke ønsker å lese hele artikkelen, så har jeg samlet de viktigste endringene i dette bildet.

![Oppsummering av kode](/nyheter-i-javascript-es2021.webp)

## Bakgrunn

Hvert år i juni så kommer det en ny utgave av ECMAScript som er spesifikasjonen av JavaScript. Dette tilfører nye features som kan brukes og gjør JavaScript bedre. I år ble ES2021, også kjent som ES12 sluppet. Og jeg skal gå gjennom hva som er nytt.

## Numeric separators

Hvis koden din inneholder tall med mange siffer, kan de fort bli vanskelige å lese. Altså at man må telle nuller for å finne ut om det er en million eller ti millioner for eksempel. Nå er det tillatt å benytte underscore i tallet for å synliggjøre f.eks. tusen-deler.

```js
const hardToRead = 1000000000;
const easyToRead = 1_000_000_000;
console.log(hardToRead === easyToRead); // Output: true

const decimal = 1.333_333;
```

## replaceAll

Når man jobber med strings i JavaScript kommer det av og til behov for å bytte ut deler av teksten med noe annet. Tidligere har man kunnet benytte `replace` metoden, men denne bytter kun ut første forekomst. Dette har vi kunnet løst med regex med et globalt flagg. Nå har vi en ny metode kalt `replaceAll` slik at vi slipper å benytte regex hvis vi ikke vil.

```js
const apples = '🍏🍏🍏';
const oranges = apples.replaceAll('🍏', '🍊');
console.log(oranges) // Output: 🍊🍊🍊
```

## Promise.any

Hvis vi har flere asynkrone kall som kjører i parallell og vi ønsker å fortsette så fort et av dem er fullført, så har vi kunnet samlet disse med `Promise.race`. Men denne vil fullføres uavhengig om det raskeste kallet feiler eller er suksessfullt. Hvis vi ønsker å vente til det første suksessfulle kallet er ferdig kan vi benytte `Promise.any`.

```js
try{
  const promises = [fetch('/slow'), fetch('/fast')];
  const first = await Promise.any(promises);
}catch(error){
  console.error('Every promise failed', error.errors);
}
```

## Logical assignment

Du kjenner kanskje til de logiske operatorene `&&`, `||` og `??`. Nå kan vi benytte disse til å assigne en variabel. 

```js
x &&= y; 
// x is unchanged if it's falsy, otherwise y

x ||= y;
// x is unchanged if it's truthy, otherwise y

x ??= y;
// x is unchanged if it's null or undefined, otherwise y
```

Dette kan virke ganske likt og det samme som dette:

```js
x = x && y;
```

Men de følger sine logiske operatorers short-circuiting. Som vil si at de assigner kun til variabelen hvis den logiske operatoren vil evaluere den høyre side. Så det er egentlig det samme som:

```js
x && (x = y);
```

Dette kan av og til ha noe å si siden en assignment kan føre til en side-effect. Dette er demonstrert i denne kodesnutten:

```js
const obj = {
  value: 0,
  get y(){
    return this.value;
  },
  set y(value){
    console.log('side-effect');
    this.value = value;
  }
}

obj.y ??= 99; // no side-effect
obj.y = obj.y ?? 99; // Output: side-effect
```

## WeakRef

JavaScript benytter seg av garbage-collect til å frigjøre minnet. Men så lenge noen har en referanse til objektet så kan det ikke bli garbage-collected og må bli holdt i minnet. Nå kan vi benytte `WeakRef` hvis vi synes det er greit at garbage-collector kan frigjøre objektet fra minnet hvis det trengs uten at vi har kontroll over det. Hvis det er blitt tømt fra minnet vil `deref()` returnere `undefined`. Trengs det kontroll over når det blir tømt kan vi benytte `FinalizationRegistry` for å registrere en callback hvis objektet blir tatt av garbage-collector.

```js
const cacheRef = new WeakRef({ count: 0 });

const cache = cacheRef.deref();
if(cache){
  console.log(cache.count);
}else{
  console.log('cache object lost to garbage-collection');
}

// FinalizationRegistry let's you assign a callback if object is garbage-collected
const registry = new FinalizationRegistry((value) => {
  console.log(value);
});
registry.register(cacheRef.deref(), 'cacheRef is lost');
```

Merk at dette er kode du ønsker å unngå hvis mulig, da bruk av `WeakRef` bør nøye tenkes ut. For når garbage-collector vil bli kjørt har vi liten innsikt i og kan være forskjellig i ulike nettlesere.
