---
title: 'Vite - ny lynrask frontend tooling'
description: 'Vite er en ny lynrask frontend tooling. Les mer om den'
pubDate: '2021.09.23'
author: Gaute Meek Olsen
heroImage: '/vite-frontend-tooling/hero.webp'
---

Jeg begynner å bli lei av treg frontend tooling, så i dag har jeg lyst til å fortelle om [Vite](https://vitejs.dev/), som tar hånd om dev server, Hot Module Replacement (HMR) og bygging av koden - og dét lynkjapt!

Prosessen bak å utvikle en nettside har blitt tregere med årene. Det har over tid oppstått en rekke nødvendige features, som å kompilere kode til eldre syntax for å støtte flere nettlesere eller filer som er skrevet i f.eks. `.ts`, `.jsx` og `.scss`. Flere tredjeparts biblioteker fra NPM skal, sammen med kodebasen, bundles til en JavaScript-fil ved hjelp av f.eks Webpack. Alt tar tid, og lengre tid vil det ta jo større prosjektet blir. Og det er frustrerende å vente på at endringene dine blir reflektert i nettleseren. Dette løser Vite og gir oss en super utvikleropplevelse, da livet er for kort til å vente på trege verktøy.

For å gi noen tall, så har jeg tatt [RealWorld example app](https://codebase.show/projects/realworld) og implementert React-løsningen først med CRA (som benytter webpack) og deretter Vite. Merk at dette kun er tider på min maskin, men det gir en tydelig indikasjon.

![Sammenligningstabell](/vite-frontend-tooling/tabell.webp)

## Komme i gang

Gå til terminalen, skriv:

```sh
npm init @vitejs/app
```

Deretter velg mellom flere typer templates: VanillaJS, Vue, React, Preact, LitElement eller Svelte - med eller uten TypeScript. Dette oppretter prosjektet for deg.

Merk at du har `index.html` i rotmappen som inngangspunkt til applikasjonen din. Dette kan være annerledes enn det du er vant med da annen tooling ofte har denne i en public folder, og da er det `App.js` som er inngangspunkt som ved bygg blir magisk flyttet inn i html filen din. Jeg synes Vite sin måte gir mer mening da nettleseren alltid starter med html filen.

I `package.json` filen din har du kommandoen `npm run dev`, som starter dev-serveren på kun noen millisekunder. Hvis du nå går inn i en fil i prosjektet og gjør en endring, vil den med en gang vises i nettleseren direkte. Dette er en stor forbedring som gjør utvikleropplevelsen fantastisk!

## Hvordan det fungerer

I dag bundler de fleste byggverktøyene hele kodebasen til en fil som kan serves. Dette må gjøres ved hver endring, noe vil caches, men det har effekt kun til et visst punkt.

![Demo av en bundlebasert dev server](/vite-frontend-tooling/bundle-dev-server.webp)

Vite derimot benytter native ES modules og lar nettleserne gjøre jobben med å hente filene når de brukes. Dev-serveren kan da starte direkte, og den gjør ikke noe jobb før nettleseren åpner siden. Hver fil som benyttes vil da resultere i et nettverkskall, filer som ikke er importert slipper å prosesseres. Du tenker kanskje at et vannfall av nettverkskall skaper treghet, men i realiteten er forsinkelsen ubetydelig når det leses rett fra din lokale disk og flere kall kan gjøres i parallell.

![Demo av en ESM dev server](/vite-frontend-tooling/esm-dev-server.webp)

Vite benytter også [esbuild](https://esbuild.github.io/) en ekstremt rask bundler skrevet i Go. Den vil ta seg av bundling av dependencies, samt kompilere hver fil on-the-fly hvis det trengs. Har du f.eks. en TypeScript-fil som importeres, så vil esbuild kompilere den til JavaScript først når et nettverkskall henter filen.

![Sammenligning av esbuild og konkurrenter](/vite-frontend-tooling/esbuild.webp)

*Sammenligning av esbuild og andre bundlere på tidsbruket av å bundle biblioteket three.js 10 ganger.*

Når applikasjonen skal bundles for produksjon benytter Vite en mer tradisjonell tilnærming og bundler koden med Rollup. Dette er hovedsakelig fordi et vannfall av nettverkskall over nett ikke er lønnsomt.

## Konklusjon

Selv om dette er en relativt ny og forbedret utvikleropplevelse innen frontend-utvikling, så er det ikke sikkert at Vite blir ledende over tid. For eksempel er [Snowpack](https://www.snowpack.dev/) også en ny tool som gjør så og si det samme. Eksisterende tools vil nok også ta grep for å forbedre ytelsen sin.

Hvis applikasjonen din ikke har noen spesielle behov hvor f.eks. webpack kreves, så vil jeg anbefale deg å prøve ut Vite. Du vil få en raskere opplevelse, samt at de fleste features og funksjonaliteter er støttet.

Kanskje er du ikke plaget av dagens små tidstyver, men når du er vant til en raskere hverdag, kan jeg love deg at du ikke ønsker å gå tilbake.