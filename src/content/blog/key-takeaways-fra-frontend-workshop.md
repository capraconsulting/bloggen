---
title: 'Key takeaways fra frontend workshop'
intro: 'Hva skjer i Capra? Før vi alle flyttet oss på hvert vårt hjemmekontor arrangerte vi en frontend workshop for å løfte blikket, se overordnet på trender og våre ønsker fremover, og ikke minst ta pulsen på frontend-miljøet i Capra. Vi diskuterte hvilke teknologier vi foretrekker, hva vi føler vi burde lære oss fremover, hvilke trender vi har observert, samt hvilke teknologier vi ønsker å se mindre av. Her er våre takeaways – og så kommer det nok en oppfølgingssak som går mer i dybden etterhvert!'
description: 'Vi ser at fokuset i bransjen skifter fra «valg av tech» til et ønske om å ta helhetlig ansvar for hva som leveres til sluttbrukere. Les mer om tendensene her!'
pubDate: '2020.04.26'
author: Sandra Skarshaug
heroImage: '/key-takeaways-fra-frontend-workshop.webp'
tags: ['Frontend']
---

Helt kort oppsummert: Vi vil som frontend-utviklere bli bedre på totalopplevelsen til sluttbrukeren, og ha mer fokus på ytelse i nettleseren. Vi opplever at fokus i bransjen gradvis skifter bort fra «valg av tech» og «hvilke biblioteker bør vi bruke?», til et ønske om å ta helhetlig ansvar for hva som leveres til sluttbrukere.

## React som bibliotek for frontend-applikasjoner

Det kommer sikkert ikke som en stor overraskelse at React er vårt foretrukne bibliotek for frontend-applikasjoner. Gjennomgående for de fleste utviklerne er at de foretrekker å bruke React sammen med Typescript. Vi mener at den ekstra sikkerheten typer gir kan være med på å effektivisere forvaltning av applikasjonen, forbedre kodekvalitet, det gjør koden vår mer leselig, og kan forebygge feil ved større refaktoreringer av kodebasen. Selv om vi er svært glade i React har noen av oss også tatt i bruk Svelte i prosjekter, og har gode erfaringer med det. I jakten på å lage stadig mindre Javascript-bundles er også færre avhengigheter – og dermed også færre potensielle sikkerhetshull – en fin konsekvens, samtidig som [miljø-fotavtrykket](https://youtu.be/BzX4aTRPzno?t=1470) fra applikasjonene vi lager blir mindre.

## Service workers med ulike applikasjoner for større effektivitet

På horisonten er det flere trender vi ser positivt på. Vi ønsker for eksempel å i større grad ta i bruk service workers. Javascript i nettleseren kjører på én enkelt tråd, og kort forklart lar service workers oss utføre operasjoner uten at det påvirker tråden som vi så gjerne vil bruke til brukergrensesnittet for å gi best mulig brukeropplevelse. En service worker brukes ofte i forbindelse med progressive web-apps (PWAs), men kan også gjøre nytte for seg sammen med mer tradisjonelle applikasjoner, for eksempel til cache-håndtering. Vi ser også på server-side rendering av applikasjoner som en veldig spennende (og nå også ganske moden) tilnærming til å redusere arbeid for hver enkelt klient. Det kan redusere lastetid, og gi bedre resultater hos søkemotorer som leser og indekserer siden din. Web Assembly kommer som en kule, og gir oss nye muligheter for å effektivisere oppgaver på klienten som uten Web Assembly er tunge. I tillegg lar det oss bruke andre språk enn Javascript i nettleseren (Rust og Go er hete kandidater for øyeblikket).

## Viktigheten av en god brukeropplevelse - for alle

Hos frontend-utviklerne våre ser vi også en økt interesse for å skifte fokus mot den helhetlige opplevelsen som leveres til sluttbrukere – det kan være penere visualiseringer og animasjoner, optimalisering av bilde- og videoleveranse, eller ren ytelse i form av raskere lastetider eller en mer snappy opplevelse – og bort fra tjenester og prosjekter. Viktigheten av dette kan ikke understrekes nok. [I Norge har vi siden 2013 hatt et regelverk om universell utforming basert på WCAG 2.0 og en forskrift for universell utforming av IKT-løsninger](https://uu.difi.no/nyhet/2018/09/eus-webdirektiv-blir-en-del-av-norsk-regelverk). Dette omfatter både virksomheter i privat og offentlig sektor, samt lag og organisasjoner. Akkurat nå er et forslag om å utvide regelverket med deler av EUs Web Accessibility Directive under utarbeidelse, og det er enda ikke bestemt i hvilken grad lovforslaget skal gjelde privat sektor. Med dette følger potensielt flere krav som norske virksomheter må følge, og det igjen vil medføre retningslinjer som vil kunne bidra til et løft i brukeropplevelse!

## Nedadgående trender

Når det gjelder teknologier som er på en nedadgående trend rent popularitetsmessig, er det mange kjære og kjente travere som etter hvert må vike for nye alternativer. Funksjonalitet som CSS-moduler og -variabler, samt verktøy som PostCSS som kan ta seg av ting som linting eller auto-prefixing, gjør at jobben som CSS-preprosessorer som LESS og SASS gjorde i stor grad er blitt overflødig. Vi ser også at den gamle favoritten Redux i svært mange tilfeller har blitt erstattet av Reacts innebygde Context-API. Årsaken er nok sammensatt, men vi tror at spesielt i mindre applikasjoner innfører Redux unødvendig kompleksitet sammenlignet med Context-APIet, og det rettferdiggjør ikke den ekstra mengden kode vi trenger for å få et fungerende skjelett opp å kjøre.

Både å lære mer om datadrevet utvikling, og i enda større grad ta det i bruk, var et ønske som kom tydelig frem blant flere av oss. Som nevnt opplever vi som frontend-utviklere et økt fokus på brukerens helhetlige inntrykk av applikasjonen. Vi mener at å ta ansvar for dette innebærer å ta i bruk datadrevet utvikling: Lage løsninger basert på data. Ved måling av hvordan applikasjonene oppfører seg hos brukerne har vi også et bedre faktagrunnlag, og kan dermed ta bedre avgjørelser for å forbedre sluttbrukerens opplevelse.
