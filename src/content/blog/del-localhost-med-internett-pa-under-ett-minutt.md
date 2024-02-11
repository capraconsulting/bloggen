---
title: 'Del localhost med internett på under ett minutt'
intro: 'Overraskende enkelt med P2P teknologi.'
description: 'Overraskende enkelt med P2P teknologi.'
pubDate: '2023.01.31'
author: 'Anders Olav Candasamy'
heroImage: '/del-localhost-med-internett-pa-under-ett-minutt/hero.webp'
---

Det kan neppe sies at det er veldig spennende å dele localhost med internett – det er vel 'ish' det alle webservere har gjort hittil. Det som derimot er spennende, er hvor enkelt det kan gjøres.

La meg vise deg en enkel metode og deretter forsøke forklare hvordan det fungerer.

## Hvordan dele localhost med p2p-socket

La oss si at vi har utviklerne Alice og Bob. Alice har en webserver kjørende på `http://localhost:8080` som hun vil dele med Bob. Alice kan ikke bare dele denne lenka med Bob, den vil jo ikke fungere på hans maskin. Alice velger da å benytte seg av npm pakken [p2p-socket](https://www.npmjs.com/package/p2p-socket).

```
# Alice
npx p2p-socket share --port 8080
```

Ved å kjøre kommandoen over, begynner Alice å dele `localhost:8080`. Outputten til kommandoen over vil gi Alice en nøkkel som hun må dele med Bob (typisk via Slack). Når Bob har fått denne nøkkelen kan han koble seg til Alice sin maskin.

```
# Bob
npx p2p-socket connect --port 8080 --key <alice-nøkkel>
```

Nå kan Bob se det samme som Alice når han besøker `http://localhost:8080`.

Det var det. Alice har nå delt localhost med Bob på under minuttet.

### Var det virkelig alt?

Jepp, det var faktisk alt. Før du leser videre kan du teste dette selv og bekrefte om det stemmer eller ikke. Alt du trenger er to maskiner med `node` og `npm` installert.

## Er dette det samme som ngrok?

For de av dere som kjenner til [ngrok](https://ngrok.com/) så må nok dette ligne veldig mye. Det er derimot en stor forskjell: ngrok er ikke peer to peer (P2P). ngrok bruker nemlig en sentral server. Responsen Alice sender til Bob går alltid via denne serveren.

<figure>
  <img alt="ngrok mellom Alice og Bob" src="/public/del-localhost-med-internett-pa-under-ett-minutt/ngrok.webp">
  <figcaption>Data går via ngrok</figcaption>
</figure>

Denne serveren *kan* være veldig praktisk. Ved bruk av ngrok får Alice en vanlig URL som kan deles med Bob. Bob behøver da ikke gjøre noe ekstra i terminalen. Bare å åpne lenka i nettleseren. Dessverre gjør dette at selve overføringshastigheten blir begrenset av ngrok. Kjipt om Alice og Bob sitter nærme hverandre og all trafikk må gå en omvei.

<figure>
  <img alt="Alice direkte til Bob" src="/public/del-localhost-med-internett-pa-under-ett-minutt/alice-bob.webp">
  <figcaption>Data går direkte mellom Alice og Bob</figcaption>
</figure>

`p2p-socket` er som navnet tilsier, peer to peer (P2P). Med P2P går ikke data via en sentral server, men direkte fra Alice til Bob. Sitter Alice og Bob på samme nettverk vil de kunne oppnå ganske gode hastigheter mellom seg. I tillegg er dataen som sendes kryptert (E2E). Ulempen er dog at alle som vil koble seg til må kjøre `p2p-socket` på sin egen maskin.

## Hva er egentlig Peer 2 Peer?

Mange tenker nok at P2P er synonymt med piratkopiering og The Pirate Bay, men det er feil. Peer to peer betyr bare at datamaskiner (peers) kommuniserer direkte med hverandre. Dette gjør at behovet for sentrale servere minskes kraftig og man unngår høye infrastruktur kostnader.

Med en P2P applikasjon kan man altså øke antall brukere uten å måtte skalere opp egen infrastruktur. For data intensive applikasjoner kan dette utgjøre en stor forskjell. Et godt eksempel på en slik applikasjon er [Keet.io](https://keet.io/). Dette er en Slack klone som også er en P2P applikasjon. Med ingen sentrale servere koster det ingenting for de å tilby full HD kvalitet på videmøter. Den er fortsatt i Alpha, men anbefales å teste.

## Hvordan funker p2p-socket?

Dette er et komplisert tema med mange ulike deler. Jeg forstår ikke alle delene, men jeg gjør likevell et hederlig forsøk på å forklare alt.

Først og fremst vil jeg påpeke at `p2p-socket` ikke inneholder noe spesiell P2P logikk. Den benytter bare moduler som er skrevet av andre dyktig P2P utviklere (mer om de senere). `p2p-socket` tilbyr bare et enkelt API for å raskt kunne komme i gang.

### Nøkler og ikke IP adresser

Fra eksempelet over med Alice og Bob så vi at Alice ikke delte en IP adresse med Bob, men heller en nøkkel. Dette er Alice sin public key. Denne kalles *public* fordi den må deles med de du ønsker skal kunne koble seg til din maskin. Faktisk så vil ingen kunne klare å koble seg til Alice sin maskin uten å vite hva denne nøkkelen er. Alice har også en *private* key som hun bruker for å identifisere seg selv.

### Distributed Hash Table (DHT)

Når Alice har generert sine nøkler, må hun registrere seg i en `distributed hash table` (DHT). DHT’en som brukes heter [Kademlia](https://en.wikipedia.org/wiki/Kademlia) og den er laget for P2P.  Alle klienter (peers) registrerer seg her. Forenklet kan du tenke på dette som en adressebok. Når hun har registrert seg her, behøver hun nå kun dele hennes public key med Bob.

Bob kobler seg til DHT’en og gjør oppslag av nøkkelen han har fått fra Alice. Etter litt søking vil han finne frem til Alice sin maskin. Nå starter prosessen som kalles [hole punching](https://en.wikipedia.org/wiki/Hole_punching_(networking)). Enkelt forklart er dette teknikken som *"finner og åpner"* veien mellom to maskiner, slik at de kan snakke med hverandre. Slik internett er bygget er dette faktisk en vanskelig oppgave (brannmur, NAT). Når denne prosessen er ferdig er nå Alice og Bob koblet sammen.

En ekstra detalj er at Alice registrere seg med en hash av sin public key (`hash(publicKey)`). Dette gjør at nettverket ikke kjenner til hennes public key og den holdes hemmelig. Bob må da gjøre samme hashing når han gjør oppslag i nettverket. Dette gjør at det er kun de som vet hva Alice sin public key er som kan koble til.

Om du vil vite flere detaljer ~anbefaler jeg~ kan du lese mer om [Kademlia](https://en.wikipedia.org/wiki/Kademlia).

### Bootstrap noder

For å kunne registrere seg i nettverket må man kunne finne nettverket. For det behøves det faktisk en sentral server som kan nås via en IP adresse/URL.

Disse serverene brukes som inngang til nettverket og kalles for `bootstrap` noder. En bootstrap node er bare en server som kan nås på en gitt URL/IP. URLen deles da med alle som skal koble seg til nettverket slik at de får registrert seg.

Disse serverene finnes allerede, så du behøver ikke tenke mer på de. Om du derimot ønsker kan du enkelt [lage din egen](https://docs.holepunch.to/building-blocks/hyperswarm#api-1). Da får du en privat P2P nettverk.

Bare for å være helt tydelig: Du behøver ikke dine egne bootstrap noder.

## Holepunch.to

Som nevnt tidligere er det modulene som `p2p-socket` bruker som inneholder P2P logikken. Selskapet som har laget disse modulene er [🕳️🥊Holepunch](https://holepunch.to/). De har oppkalt seg selv etter hole punching teknikken nevnt tidligere.

Holepunch jobber med å gjøre P2P teknologi mer tilgjengelig og enklere å ta i bruk med Node og JavaScript. De har allerede laget [mange moduler](https://docs.holepunch.to/) som gjør dette. Dette er også de samme som har laget Keet som jeg nevnte tidligere.

Holepunch har også fått systemet sitt opp og kjøre på Android og iOS enheter. Noe som ikke er en enkel oppgave. De skal i løpet av 2023 open-source hvordan de har fått dette til. Dette kommer snart, så det er ingen dum idé å følge de på [Twitter](https://twitter.com/holepunch_to) om du vil få det med deg.

Jeg har personlig stor tro på det Holepunch vil levere i 2023 og gleder meg til å se hva de og andre vil bygge med en P2P stack.

## Feedback

Send meg gjerne en [e-post](mailto:aca@capraconsulting.no) om du har spørsmål eller kommentarer.