---
title: 'Docs-as-code'
intro: 'Som utviklere jobber vi mye med kode, og ofte trenger denne koden dokumentasjon. Men alt for ofte ender man med kode og ingen dokumentasjon.'
description: 'Docs-as-code gjør dokumentasjon av koding enklere! Bruk eksisterende verktøy for å skrive teknisk dokumentasjon. Vi går gjennom  docs-as-code her!'
pubDate: '2021.05.25'
author: Nicolas Harlem Eide
heroImage: '/docs-as-code/hero.webp'
---

Å skrive dokumentasjon til koden, ser jeg på som en vane, og som med mange vaner må man legge til rette for det. Om du vil begynne å jogge, så viser forskning at man har en høyere sannsynlighet for å fortsette å gjøre det ved blant annet å *legge miljøet opp til det*. Så hvordan kan vi bruke lærdommen om at vaner kommer gjennom miljø til å skrive mer dokumentasjon? Her kommer *dokumentasjon som kode* inn på banen.

## Docs as code - enklere dokumentasjon i eksisterende verktøy

Med “*Docs-as-code*” tankegangen bruker de verktøyene man allerede har til å gjøre det lettere å skrive medfølgende teknisk dokumentasjon. I stedet for å måtte huske og gå inn på confluence for å skrive dokumentasjon for API-endepunktet ditt, så er det mye lettere å huske det hvis du gjør det i en docstring, eller blir påminnet om det i en sjekkkliste på pull requesten din. I tillegg kan man sørge for å få inn en felles språkprofil i firmaets dokumentasjon, med mer.

Gjennom docs-as-code får du altså brukt eksisterende verktøy til å gjøre det lettere å skrive dokumentasjon.

## Pipelinen

Så la oss sette opp en docs-as-code pipeline. Som med mange andre pipelines, vil vi at den skal ha *innhold (dokumentasjonen)*, *versjonskontroll*, *pull requests*, *tester* og *publisering*.

I dette tilfellet bruker jeg Python som et eksempel, men det finnes også verktøy til andre språk. Man kan også bestemme seg for å ikke skrive dokumentasjonen på et like granulært nivå som blir vist frem her.

## Innholdet

La oss starte med innholdet – *dokumentasjonen*. Selve dokumentasjonen burde være lett tilgjengelig for redigering og være versjonskontrollert. Det vi da ender opp med er plaintext, som markdown eller restructured text, i repositoriet som dokumentasjonen tilhører. Gjerne til og med i selve koden, om språket eller verktøyene støtter dette (eksempelvis gir IntelliJ-platformen god popup dokumentasjon når du har dokumentasjonen i selve funksjonen/klassen/modulen!).

![popup dokumentasjon i editor](/public/docs-as-code/editor.webp)

Hvor granulært plasseringen skal være, kommer helt ann på kravene til dokumentasjonen. Er det teknisk eller brukerdokumentasjon? Er det for et API eller for en SDK?

## Review

Nå som vi har teksten i plaintext, og i repositoriet vårt, er det trivielt å begynne å bruke prosesser vi allerede har: Pull requests, CI/CD, mm.

Start med å endre dokumentasjonen samtidig som kode blir endret. Dette kan man lett minne alle på teamet på ved å ha en sjekkliste i hver PR.

Å ha endringer i dokumentasjonen *sammen med kodeendringer*, har også en ekstra fordel. Det gjør det lettere for andre å forstå endringen, spesielt i komplekse systemer. Som en reviewer kan du eksempelvis lese den endrede dokumentasjonen først for å lettere forstå hva sluttresultatet skal være.

## Testing

Det høres kanskje rart ut, men ja, nå skal vi teste teksten som har blitt skrevet. Ved å kjøre tester på teksten som blir skrevet, så kan man få mer konsis tekst, sjekke grammatikk, sørge for at man ikke har døde linker, med mer.

Her finnes det flere og flere verktøy som kan brukes, men dessverre støtter mange hovedsakelig kun engelsk. Verktøy som [proselint](https://github.com/amperser/proselint/), [joblint](https://github.com/rowanmanning/joblint) og [write good](https://github.com/btford/write-good) er alle verktøy som ser på engelsk rettskriving og språkprofil. Disse verktøyene dekker alle hvert sitt område (dog med noe overlapp). For å unngå å kjøre alt for mange verktøy, anbefales [vale](https://github.com/errata-ai/vale). Vale er et verktøy som støtter flere språkprofiler og verktøy, og har også god støtte for de fleste filformater. I tillegg kan man lage sine egne språkprofiler i vale, som gir mulighet til å støtte norsk.

Regelsettet i vale er definert som YAML med Regex, og er dermed lett å lese og lage. Det er flere features som ordlister fra txt-filer; ordbytter for ord man ønsker å bytte ut. Eksempelvis for markedsføringsprofil eller inkluderende språk eller lett logikk - som ord som ikke passer sammen, som “mindre umulig”.

`extends: existence`

`message: "Try to avoid using clichés like '%s'."`

`ignorecase: true`

`level: warning`

`tokens:`

`- like clockwork`

I tillegg har mange publiseringsverktøy innebygde tester for døde linker, som kan være svært nyttig. Det er kjipt å lese dokumentasjon og finne ut at noen av de interne linkene ikke fungerer!


## Publisering

Nå har vi skrevet dokumentasjonen, reviewet den og testet teksten. Da er det på tide å publisere den. I likhet med mye annet er dette også automatisert. Ikke noe klipp og lim inn i Confluence (men [det finnes verktøy for å publisere til Confluence](https://sphinxcontrib-confluencebuilder.readthedocs.io/en/stable/)!).

Noen verktøy som er ekstremt kraftfulle er [pandoc](https://pandoc.org/) og [sphinx](https://www.sphinx-doc.org/en/master/). Disse verktøyene har dog en ganske bratt læringskurve og tilbyr verktøy for alle deler av prosessen: Fra skriving til testing til publisering. I tillegg finnes det offentlige tjenester som er hakket enklere: som [read the docs](https://readthedocs.com/).

Det finnes mange verktøy der ute, og det krever litt øvelse å få god og sammenhengende dokumentasjon. Men med docs-as-code, kan man gjøre det litt lettere å få god dokumentasjon som alle kan bidra til.