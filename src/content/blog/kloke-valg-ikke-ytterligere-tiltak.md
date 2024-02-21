---
title: 'Schrems II krever kloke valg, ikke ytterligere tiltak'
intro: 'Som følge av den såkalte Schrems II-dommen har vi fått et nytt begrep i vårt vokabular: Ytterligere tiltak. Disse kommer i form av organisatoriske, juridiske og tekniske løsninger som skal bedre personvernet innenfor Europas grenser. Det er kanskje fristende å legge skylden på amerikansk etterretning eller håpe på en snarlig politisk løsning i form av Privacy Shield 2.0. I stedet bør vi ta en nærmere titt i speilet. Hva gjør vi egentlig for å sikre personvernet til sluttbrukerne våre best mulig?'
description: 'Hein Kristiansen fra Capra Consulting forklarer hvordan håndtere persondata i skyen med kloke valg, ikke ytterligere tiltak'
pubDate: '2021.12.01'
author: Hein Kristiansen
heroImage: '/src/assets/images/kloke-valg-ikke-ytterligere-tiltak.webp'
tags: ['Sky', 'Meninger', 'AWS']
---

Heldigvis har vi nå fått en ny veileder fra Datatilsynet om overføring av personopplysninger utenfor EØS. Denne gir oss grunnlaget for å gjøre en risikobasert vurdering: Opererer vi i tråd med gjeldende lover og regler? La oss se hvordan en slik vurdering kan gjøres.

## Risikovurdering og ivaretakelse av personvern

Det første vi må gjøre i en risikovurdering er å sikre at vi har et lovlig overføringsgrunnlag. Her konkluderer både EU-domstolen og Datatilsynet med at standard personvernbestemmelser fremdeles er et gyldig overføringsgrunnlag, men at de ikke alltid er tilstrekkelige i seg selv.

De nye standard personvernbestemmelsene introduserer også en nyvinning i form av at en databehandler nå kan eksportere personopplysninger. I noen tilfeller medfører dette eksportansvaret kan falle på skyleverandøren. For eksempel, hvis en databehandler velger å eksportere personopplysninger for eget formål, i strid med eller uten den behandlingsansvarliges instruks, blir databehandleren selv ansvarlig for denne eksporten. Den behandlingsansvarlige har likevel ansvar for å velge databehandlere som kan stille tilstrekkelige garantier for at de vil følge våre personvernregler.

## Ulik lovgivning

Amerikanske skyleverandører er dessverre underlagt en nasjonal lovgivning som sier at lokale myndigheter kan be om informasjon om bestemte personer. Derfor konkluderer både EU-domstolen og Datatilsynet med at standard personvernbestemmelser må suppleres med ytterligere tiltak ved overføring til USA. Hvis ikke slike tiltak blir iverksatt, er overføringen ulovlig og må stoppe. Jeg vil hevde at noen av disse ytterlige tiltakene er kloke valg, og vil beskrive dem nedenfor.

Heldigvis har skyleverandørene vært tidlig på banen og innført ytterligere juridiske tiltak. Datatilsynet ser på disse tiltakene som et skritt i riktig retning. Det er allikevel viktig å kunne dokumentere at dataimportøren utfordrer alle utleveringsbegjæringer de mottar fra lokale myndigheter og at den hjelper de registrerte med å ivareta rettighetene deres i det aktuelle tredjelandet.

Datatilsynet velger en noe strengere linje når det kommer til tekniske tiltak. Datatilsynet mener at hvis en dataimportør i et tredjeland forvalter krypteringsnøkkelen på vegne av den behandlingsansvarlige, så vil ikke kryptering være effektiv mot begjæringer om utlevering fra lokale myndigheter. Dette medfører at normal bruk av kjente tjenester for kryptering ikke lenger vil være tilstrekkelig når det er dataimportøren som administrerer modulene som genererer og lagrer krypteringsnøklene.

## IT-løsninger i samsvar med Schrems II

Disse tjenestene er så dypt integrert hos skyleverandørene at det å ekskludere dem svekker sikkerheten betydelig. Heldigvis har vi tilgang til dedikerte moduler for vedlikehold av krypteringsnøkler som lar oss ta over administrasjonen. Dermed kan vi dokumentere at vi har stengt dataimportørens tilgang til krypteringsnøklene selv om de ligger i skyen. Vi kanogså innføre ytterlige tiltak som flerfaktorautorisering og kreve to eller flere godkjennelser for administrative handlinger på disse dedikerte modulene.

Dette bør vi kombinere med andre kloke valg som:

- Å logisk segmentere miljø per konto.
- Å innføre prinsipp om minste privilegium ved å fjerne all unødvendig tilgang per miljø.
- Å sikre at vi alltid benytter state-of-the-art krypteringsalgoritmer, både ved overføringer (“in flight”) og lagring (“at rest”) av personopplysninger.
- Å bedre sikkerheten ved prosessering av personopplysninger i ukryptert tilstand (“data in the clear”).
Dermed skaper vi en trygg sikkerhetsgrunnmur vi kan bygge videre på. Jeg mener at alle kjente tiltak som styrker personvernet må vurderes, for kostnad er i seg selv ingen unnskyldning for ikke å innføre dem.

Tiltakene jeg beskriver ovenfor iverksettes normalt bare ved betalingsformidling eller ved behandling av sensitive personopplysninger. Men de kan også brukes som ytterligere tiltakfor å overkomme regulatoriske hindringer som følge av den såkalte Schrems II-dommen eller tilsvarende domsavgjørelser i fremtiden. For å oppfylle kravet om tilsvarende beskyttelsesnivå som under GDPR må vi altså foreta en helhetlig risikobasert tilnærming hvor vi dokumenterer de tiltakene som er nødvendige for å komme i mål.

De organisatoriske tiltakene som kreves for å etablere og vedlikeholde disse løsningene er en reell utfordring. Erfarne skyarkitekter med relevant sikkerhetserfaring vokser ikke på trær i Norge.

La oss allikevel kalle en spade for en spade. Dette er kloke valg, ikke ytterligere tiltak.

Denne artikkelen ble først publisert på [digi.no](https://www.digi.no/artikler/debatt-schrems-2-vi-trenger-kloke-valg-ikke-ytterligere-tiltak/515207).