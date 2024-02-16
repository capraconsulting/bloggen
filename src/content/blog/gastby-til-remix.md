---
title: 'Fra Gatsby til Remix - En reise fra ett rammeverk til et annet'
intro: 'Blir med på team CapraWeb i sin reise da de skulle migrere capraconsulting.no fra Gatsby til Remix.'
description: 'Blir med på team CapraWeb i sin reise da de skulle migrere capraconsulting.no fra Gatsby til Remix.'
pubDate: '2023.10.12'
author: 'Håkon Meyer Tørnquist og Camilla Marie Dalan'
heroImage: '/innhold/gastby-til-remix/hero.webp'
---

I den stadig skiftende verdenen av webutvikling er det avgjørende å holde seg oppdatert på de nyeste trendene. Bedrifter trenger nettsider som er like banebrytende som en katt med ti liv – alltid til stede, nysgjerrig og klar til å takle enhver utfordring. Da dukker ofte “migrere til en ny tech stack” opp som svaret på spørsmålet ingen har stilt.

I dag begir vi oss ut på et storslagent eventyr mens vi utforsker reisen til et modig selskap, Capra Consulting, som høsten 2022 våget å flytte fra de kjente omgivelsene i Gatsbys varme favn, til de ukjente Remix-farvann. Et solid team av utviklere, Team CapraWeb, gikk sammen for å takle denne monumentale oppgaven. Så fest setebeltene, webentusiaster, for en historie fylt med brå vendinger, krappe svinger og tvilsomme designvalg!

<figure>
  <img alt="Geit som kjører en gammel bil" src="/innhold/gastby-til-remix/geit.webp">
  <figcaption>Vil du bli med på en tur?</figcaption>
</figure>

## Hvorfor migrere?

Capra hadde allerede en velfungerende nettside bygget på [Gatsby](https://www.gatsbyjs.com/), et rammeverk som på dette tidspunktet var et rent SSG-rammeverk. SSG – Static Site Generation – passer i utgangspunktet veldig fint til en statisk nettside, som vår strengt tatt er, men ingen av medlemmene i nåværende Team CapraWeb hadde vært med på å lage denne nettsiden fra bunnen av. Det krevde derfor en betydelig innsats av hver enkelt å sette seg inn i kodebasen. Spesielt med tanke på at dette skulle gjøres utenom kundearbeid. Siden applikasjonen ikke hadde blitt vedlikeholdt på en god stund, lå vi langt bak på avhengigheter, deriblant to major-versjoner bak nyeste Gatsby-versjon. Bygg- og deployment-pipelinen var treg, som gav oss en lang feedback loop, og koden var generelt så flokete og tett sammenkoblet at hver endring føltes som å spille Jenga: Et lite feiltrinn kunne velte hele tårnet.

Dessuten er det jo noe litt morsommere og mer motiverende med å bygge ting på nytt, da. 😎

## En skinnende ny stack ✨

### Remix, Tailwind og Cloudflare

Et av teammedlemmene, Håkon, hadde bygget opp en stor forkjærlighet for [Remix](https://remix.run/), et relativt nytt SSR-rammeverk for React. Vi andre, som lurte på hva greia var, spurte ChatGPT, og fikk følgende svar:

*“Remix er et frontend-rammeverk som får nettsider til å rocke hardere enn et luftgitar-solo. Med Remix kan du bygge nettsider så trendy at selv hipsterne vil miste skjegget i ren misunnelse. Remix er som en superhelt for frontend - det løfter nettsider til nye høyder og gjør konkurrentene grønne av misunnelse.”*

Og med det var vi egentlig ganske fornøyde.

Fra spøk til revolver: Remix er et rammeverk som lener seg tungt på eksisterende web-standarder. Det gjør at det føles bedre dokumentert enn rammeverk av tilsvarende alder, da man ofte oppholder seg mer på [MDN](https://developer.mozilla.org/en-US/) enn i [Remix-docsene](https://remix.run/docs/en/main). I tillegg gav det oss fordelen av å lære oss rammeverk-agnostiske APIer og patterns vi kan gjenbruke om (når?) det dukker opp noe fetere, og vi har lyst til å skrive om nettsiden på nytt. Som nevnt tidligere er kanskje SSG et vel så naturlig valg som SSR for en så statisk nettside som vår, men etter en runde i teamet ble vi enige om at det ikke spilte så stor rolle for vår bruk, og at trade-offsene var verdt det.

De andre bitene av tech stacken vår valgte vi på overordnet samme grunnlag som Remix: Det skulle være gøy å holde på med, gi oss en rask feedback loop, og oppføre seg bra hos brukerne våre.

Det har vært en sterk og lang diskusjon i frontend-miljøet i Capra om hvilken CSS-strategi som er best. De heteste diskusjonene har nok oppstått rundt [TailwindCSS](https://tailwindcss.com/), der noen har ment at det er den beste oppfinnelsen siden kruttet, mens andre har ment at T-en står for “teknisk gjeld”. I vårt lille hjørne var alle medlemmene av Team CapraWeb veldig enige om at TailwindCSS var ganske kult og at prosjektet ikke var så stort eller komplekst at det ville ha noen stor betydning for vedlikehold om det viste seg å ikke skalere så bra som håpet.

For deployment gikk vi for [Cloudflare Pages](https://pages.cloudflare.com/). Den gamle nettsiden kjørte på Netlify, som vi strengt tatt var ganske fornøyd med, men som har en prismodell som ikke passet oss så godt. Noen raske serviettutregninger viste at å gå over til Cloudflare sannsynligvis ville spare oss for en del tusenlapper. Med det kunne teamet også gå ut og sosialisere med god samvittighet. 💁‍♀️Dessuten var Cloudflare nytt og hipt, og flere på teamet hadde lyst til å prøve det ut.

Ellers beholdt vi Sanity som CMS for blogg og bilder, fordi Sanity er fett og funker bra.

## Prosessen 🔁

### Hvordan gikk vi frem? Hvor ofte/mye jobbet vi? Hvordan tilrettela Capra?

Vi kicket off arbeidet på sensommeren 2022 etter at alle hadde fått slikket ferdig sol og det var på høy tid å tømme D-vitaminlagrene i et mørkt rom foran PC-skjermene sine. Neida. Joda. Et kanban-brett i Notion var et must, og vi var enige om mottoet: “Try hard, fail harder”. Med andre ord, push rett til main. For gøy tok vi også i bruk [gitmoji](https://gitmoji.dev/), som, om ikke annet, har gitt oss en deilig fargerik commit-historikk.

Vi tok oss god tid til å lære oss de forskjellige teknologiene, og jobbet ettersom enhver hadde tid og lyst, i tillegg til en ukentlig felles kodekveld. Overordnede oppgaver lagde vi i plenum, mens mer spesifisering av detaljer og å sørge for at ingenting falt mellom to stoler var opp til den enkelte. Ikke en veldig streng prosess, der, altså.

Tre måneder med Remix, Cloudflare, gode venner og litt for store mengder energidrikk senere, nærmet vi oss omsider mål.

## PROD!

Etter en god del jobb, en god del feiling og masse læring, var nettsiden endelig klar for produksjon i november 2022. Den åpne kildekoden lever [her](https://github.com/capraconsulting/nettsiden), og siden kan du se på [capraconsulting.no](https://capraconsulting.no/?_ga=2.79165012.1970766327.1707512947-1479161094.1707512947).

<figure>
  <img alt="Screenshot of Notion task of &quot;Going live&quot;" src="/innhold/gastby-til-remix/live.webp">
  <figcaption>Going live!</figcaption>
</figure>

## Hva har vi lært?

Vi har lært at Remix er kult, TailwindCSS er gøy, Cloudflare er billig og trunk-based development er fanden så effektivt. Ellers er det alltid bra å ha et godt team å sparre med, og en arbeidsgiver som lar sine ansatte eksperimentere og følge en generell “kloke valg”-tankegang.

<figure>
  <img alt="Teamet skåler for ferdig utført jobb." src="/innhold/gastby-til-remix/team.webp">
  <figcaption>
    Fra venstre: Håkon Tørnquist, Ingrid Domben, Julian Jark, Malin Aandahl og (bak kameraet) Camilla Marie Dalan.
  </figcaption>
</figure>

## CapraCon.no

I mars 2023 ble den årlige internkonferansen til Capra, CapraCon, holdt. I og med at [capracon.no](https://capracon.no/) også var Team CapraWeb sitt ansvar, og “det gikk jo så greit å migrere [capraconsulting.no](https://capraconsulting.no/?_ga=2.117780937.1970766327.1707512947-1479161094.1707512947) fra Gatsby til Remix, så hvorfor ikke gjøre det igjen”-tankegang, hadde teamet lyst til å skrive om denne siden og.

Litt nytt må man jo finne på, og den ene biten av puslespillet vi ikke hadde byttet ut i runde 1 var CMSet. Sanity er flott, men våre redaktører oppholder seg stort sett i [Notion](https://www.notion.so/), en dokument- og organiseringsapplikasjon. Der kan man jo putte inn innhold, og de har jo også et API, har de ikke? 🤔

Hold utkikk etter neste artikkel for fortsettelsen…