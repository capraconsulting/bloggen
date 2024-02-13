---
title: 'Nyheter i JavaScript - ES2020'
intro: 'I juni 2020 kom det en håndfull nye features i JavaScript-språket.'
description: 'I juni 2020 kom det en håndfull nye features i JavaScript-språket. Les mer om dem her >>'
pubDate: '2020.06.25'
author: Gaute Meek Olsen
heroImage: '/js-hero.webp'
---

## TLDR - To Long, Didn't Read

Hvis du ikke ønsker å lese hele artikkelen, så har jeg samlet de viktigste endringene i dette bildet.

![Oppsummering av kode](/nyheter-i-javascript-es2020.webp)

## Bakgrunn

Ecma International er ansvarlig for å standardisere JavaScript. Dermed lager de ECMAScript spesifiseringen, så hvis noen omtaler ECMAScript kan du tenke på dette som et synonym til JavaScript. Siden 2015 har de begynt å komme med årlige utgaver. Dette har ført til at vi omtaler hver utgave med årstallet, altså ECMAScript 2015 forkortes til ES2015. Men det er fortsatt mange som bruker nummeret til hvor mange utgaver som er utgitt, altså ES6 er synonymt med ES2015. Framtidige endringer som enda ikke er utgitt vil omtales som ESNext.

Nå i juni ble ECMAScript 2020/ES2020/ES11 utgitt og endringene er allerede implementert i moderne nettlesere. La oss se på hvilke nye fordeler dette gir oss.

## Nullish coalescing

Hvis du ønsker å sette en verdi, men ønsker en default verdi i tilfelle den er `null` eller `undefined`, kan du benytte `??`.

```js
const name = person.fullName ?? 'anonymous';
```

Her vil `name` bli "anonymous" hvis objektet person ikke har fått `fullName` satt. Hvis person har en verdi for `fullName`, vil den verdien bli skrevet til `name`.

Du tenker kanskje at dette er noe du alltid har hatt mulighet til med `||`. Dette vil fungere nesten likt, for hvis verdien før `||` er falsy, vil ikke evalueringen short-circuit-e og neste verdi brukes. Men husk tom streng `''`, `0`, `NaN` og `false` vil være falsy og gi default verdi, noe som kanskje ikke ønskes hvis det er meningen å skulle kunne tildele disse verdiene. `??` benytter heller nullish, som sjekker kun for `null` eller `undefined`.

## Optional chaining

Hvis du ønsker å benytte properties nøstet i flere nivåer i et objekt, så har du tidligere måtte sjekke at disse ikke er `null` eller `undefined` for at koden ikke skal kræsje. Nå kan vi benytte `?.` før vi aksesserer propertien slik at koden bak kun brukes hvis verdien ikke er `null` eller `undefined`.

Se for deg at vi har et hus med en eier, som igjen har et kjæledyr. Her må vi passe på at house, owner og pet har en verdi, eller sjekke på forhånd for å unngå feilmeldingen "Cannot read property 'type' of null". Her kan du se hvordan vi har måtte håndtert dette før og etter ES2020.

```js
const house = { owner: { name: 'Jim', pet: null }};

// Old JavaScript
if(house && house.owner && house.owner.pet && house.owner.pet.type === 'dog'){
  console.log('owner has a dog');
}

// ES2020
if (house?.owner?.pet?.type === 'dog') {
  console.log('owner has a dog');
}
```

## Promise.allSettled

Hvis vi har flere asynkrone kall som kjører i parallell, så har vi kunnet samlet disse med `Promise.all`. Men denne vil få en exception hvis ett av de asynkrone kallene feiler. Hva om vi ønsker å la alle kallene gjøre seg ferdig uansett om noen feiler eller ikke. Med `Promise.allSettled` vil den returnere når alle asynkrone kall er ferdige, enten de er oppfylt eller avvist.

```js
const promises = [fetch('/succeeds'), fetch('/fails')];
const [result1, result2] = await Promise.allSettled(promises);
```

## matchAll

Hvis du skal bruke regex for å finne alle forekomster av et regular expression treff, så har du tidligere kunne bruke `match` for å få alle delstrengene. Men hva om du ønsker både delstrengen og indeksen. Da kan du bruke `matchAll` og iterere over treffene.

La oss finne alle tall i en tekst.

```js
const matches = 'Her kommer noen tall: 5 12 88'.matchAll(/\d+/g);
for (const match of matches) {
  console.log(match);
}

// Output:
// ["5", index: 22, input: "Her kommer noen tall: 5 12 88", groups: undefined]
// ["12", index: 24, input: "Her kommer noen tall: 5 12 88", groups: undefined]
// ["88", index: 27, input: "Her kommer noen tall: 5 12 88", groups: undefined]
```

## BigInt

`BigInt` er en ny primitive data type i JavaScript, på lik linje med `Boolean`, `Number`, `String`, `Symbol` og `undefined`. `BigInt` kan håndtere tall over `Number` sin safe integer limit. Det vil si hvis vi ønsker å håndtere tall som kan være større enn 9_007_199_254_740_991, så er det lurt å bruke `BigInt`. `BigInt` vil være representert med en n på slutten av tallet.

La oss plusse på 2 på tallet 9_007_199_254_740_991, korrekt tall skal da slutte med sifferet 3. 

```js
9_007_199_254_740_991 + 2; // 9007199254740992
BigInt(9_007_199_254_740_991) + BigInt(2) // 9007199254740993n
```

## Dynamic import

Før har vi kun hatt mulighet til å importe moduler statisk på toppen av filen. Nå med dynamic imports har vi muligheten til å gjøre dette hvor som helst i koden on-demand og kun når vi trenger det. `import()` vil returnere en promise med modulen. 

```js
const module = await import('module');
```

## Module namespace exports

Ved import og export av JavaScript-moduler har vi i de fleste situasjoner kunne gitt vårt eget navn til modulen. Slik som dette.

```js
import * as values from 'module';
import { value as v } from 'module';

export { v as value };
```

Men vi har ikke hatt mulighet til å re-exporte noe fra en annen modul med en navneendring direkte. Men nå med ES2020 har vi muligheten til dette, slik:

```js
export * as someUtils from 'utils';
```

## globalThis

Hvis du skriver kode som skal kunne kjøre i flere typer miljø, for eksempel både i en nettleser og på en Node server, så har de forskjellig navn på det globale objektet. Nettlesere bruker `window`, Node bruker `global` og web workers bruker `self`. Nå finnes `globalThis`, som vil gi deg det korrekte globale objektet uansett miljø.

Her er ett eksempel hvor vi ønsker å sjekke om vi kan gi en alert til brukeren. Hvis dette kjører på en nettside så vil globalThis referere til window, og alert vil være tilgjengelig.

```js
if (typeof globalThis.alert === 'function'){
  alert('hei');
}
```
