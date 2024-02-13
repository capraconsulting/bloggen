---
title: 'Kvalitetssikre nettsiden med Google Lighthouse'
intro: 'Når man lager nettsider så ønsker man at den skal være av god kvalitet for å gi mest mulig verdi for brukerne. Dette er en kort innføring i hvordan man med få ressurser kan luke bort feil som gir dårlig brukeropplevelse.'
description: 'Luk bort feil som gir dårlig brukeropplevelse med Google Lighthouse. Les mer her >>'
pubDate: '2020.11.30'
author: Gaute Meek Olsen
heroImage: '/kvalitetssikre-nettsiden-med-lighthouse/hero.webp'
tags: ['Frontend']
---

Den beste måten å kvalitetssikre en nettside på, er ved å forstå hvordan brukerne interagerer med den og hva de synes. Men ofte har man ikke denne innsikten, enten fordi man mangler kapasitet til å kartlegge det eller man ikke vet hvem brukerne er.

Da er det heldigvis fint at du kan ta i bruk et verktøy som kan hjelpe deg i riktig retning; nemlig Lighthouse. Denne artikkelen forklarer nærmere hva det er og hvordan det kan brukes både for en ikke-teknolog, under utvikling og ved å automatisere prosessen gjennom Continuous Integration (CI) pipelines.

## Hva er Lighthouse?

[Lighthouse](https://developers.google.com/web/tools/lighthouse/) er et automatisert verktøy fra Google som vurderer og hjelper til med å forbedre kvaliteten på nettsider. Den gir deg en rapport med detaljer innenfor disse kategoriene:

**Performance**: Målinger som forteller blant annet hvor raskt nettsiden lastes og vises.  
**Best Practices**: Finner og presenterer alt fra bruken av HTTPS til bildenes anbefalte størrelsesforhold.  
**Search Engine Optimization (SEO)**: Sjekker at du har fulgt retningslinjene som gjør at nettsiden skal være synlig for søkemotorer.   
**Accessibility**: Leter etter vanlige feil innen universell utforming.   
**Progressive Web App (PWA)**: Sjekker for å lage en [Progressive Web App](https://web.dev/pwa-checklist/).

![Eksempel på en Lighthouse rapport](/kvalitetssikre-nettsiden-med-lighthouse/rapport.webp)

Over ser du et eksempel på hvordan resultatet kan se ut. Etter en kjøring får du en score fra 0 til 100 innen hver kategori. Kategoriene består av et antall sjekker hver, som for eksempel "Time to interactive" og "Background and foreground colors have sufficient contrast ratio". Hver sjekk har en forklaring på hvorfor nettopp den er viktig og hvordan du kan rette opp i den.

*Det skal sies at slike verktøy ikke kan sjekke alt, og det finnes verktøy der ute som egner seg bedre til å sjekke én enkel kategori, for eksempel universell utforming eller performance. Likevel er Lighthouse er et kvalitetsverktøy som dekker flere områder, og i tillegg er gratis.*

## For ikke-teknologen

Kanskje du eier en nettside, er prosjektleder eller har en annen grunn til å sjekke kvaliteten på nettsiden? Det kan du gjøre veldig enkelt: Gå til [web.dev/measure](https://web.dev/measure/), legg inn din URL og trykk RUN AUDIT. Da får du en full rapport over kvaliteten. Det kan være lurt å kjøre denne med jevne mellomrom slik at du kan fortelle utviklerne hva de skal forbedre.

## For utvikleren

Du kan også kjøre Lighthouse i Chrome DevTools: Sørg for å ha installert Chrome, åpne en nettside, trykk F12 og naviger deg til Lighthouse-fanen. Her kan du velge hvilke kategorier som skal sjekkes og hvilken enhet kjøringen skal simuleres på. Deretter kan du trykke på “Generate report”-knappen for å få en fullstendig rapport. Dette er et enkelt tiltak for å sørge for god kvalitet på nettsiden mens du utvikler på lokal maskin.

![Lighthouse i Chrome DevTools](/kvalitetssikre-nettsiden-med-lighthouse/devtools.webp)

## For maskinen

Du kan til og med kjøre Lighthouse fra kommandolinjen. Dette betyr at vi kan automatisere Lighthouse-kjøringene med shell scripts. Det kan bli installert gjennom NPM med `npm install -g @lhci/cli` og kjørt med `lhci autorun`. Her kommer en forklaring på hvordan du kan implementere dette i pull requests i GitHub, noe som gir teamet full kontroll over at kode som blir lagt til opprettholder kvaliteten.

_Hvis koden din ikke ligger i GitHub, så vil framgangsmåten mest sannsynlig være tilsvarende for andre plattformer._

Først, lag en workflow-fil i GitHub-repoet,`.github/workflows/lighthouse.yml`. Filnavnet kan være hva du ønsker, men behold mappenavnene `.github` og `workflows`. Her er et forslag på hvordan .yml-filen kan se ut:

```yml
name: CI
on: pull_request

jobs:
  lighthouse-ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: npm install & build
        run: |
          npm install
          npm run build
      - name: run Lighthouse CI
        run: |
          sudo npm i -g @lhci/cli
          lhci autorun
```

Denne sier at den skal kjøre jobben `lighthouse-ci` på pull requests. Stegene i jobben vil installere og bygge applikasjonen din, så kjøre Lighthouse på den ferdigbygde nettsiden. Hvis du ikke har et byggesteg i prosjektet ditt, kan du fjerne steget `npm install & build`. `lhci autorun` vil kjøre Lighthouse med standardinnstillinger. Den vil lete etter en mappe med navn `dist`, `build`, `out` eller `public` for HTML-filer å skanne.

Vi kan også legge til konfigurering ved å plassere en `lighthouserc.js`-fil i rotmappen. For en detaljert oversikt over alle innstillingene som kan settes, kan du sjekke [Lighthouse sin dokumentasjon](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md). Her er et eksempel på en ferdige konfigurasjon:

```js
module.exports = {
  ci: {
    collect: {
      staticDistDir: 'dist',
      isSinglePageApplication: true,
      url: ['', 'about', '404']
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "unsized-images": "off"
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  },
};
```

Innstillingen `collect` er for hvilke sider som skal skannes. Hvis du har flere `.html` filer i mappen, så trenger du eventuelt bare `staticDistDir` for å angi mappen som skal skannes. Men hvis du har en Single Page Application (SPA) med flere routes, så kan du benytte `staticDistDir`, `isSinglePageApplication` og `url` for å angi hvilke routes som skal skannes.

`assert` benyttes for hvilke sjekker som skal bli gjort og hva som avgjør om kjøringen blir godkjent eller avvist. `preset` kan ha verdien `lighthouse:all`, `lighthouse:recommended` eller `lighthouse:no-pwa`. `lighthouse:all` er en veldig aggressiv skanning hvor alt må være godkjent for en kjøring. `lighthouse:recommended` er et mer realistisk nivå som anbefales, hvor en score på under 90 gir warning og under 50 gir error. `lighthouse:no-pwa` er samme som `lighthouse:recommended`, men uten sjekker for PWA. Du kan også være mer spesifikk i `assertions`. Hvis man for eksempel synes en score på under 50 på performance er for lavt, og heller ønsker å gi en error når scoren er under 90, så kan man sette: `"categories:performance": ["error", { "minScore": 0.9 }]`. Man kan også skru av spesifikke regler, med eksempelvis `"unsized-images": "off"`.

Hvis du ønsker å laste opp rapporten til en server kan dette gjøres i `upload` og `target`. Hvis du ikke ønsker å lagre rapportene selv så tilbyr Lighthouse en midlertidig lagring som kan benyttes helt gratis ved å sette `temporary-public-storage`.

Til slutt, hvis du ikke ønsker å klikke deg inn på kjøringen til workflow consolen i pull requesten for å sjekke detaljer, så kan du installere Lighthouse CI GitHub app som setter statuser synlig i pull requesten. Her er et eksempel på hvordan det ser ut for hver URL som er skannet:

![Pull request status](/kvalitetssikre-nettsiden-med-lighthouse/scan.webp)

Installer GitHub-appen [Lighthouse CI](https://github.com/apps/lighthouse-ci) og gi tilgang til de repositoriene du ønsker. Kopier og ta vare på tokenet du får og lagre dette under Settings > Secrets med navn `LHCI_GITHUB_APP_TOKEN` for ønsket repository. Så må du oppdatere `lighthouse.yml` med:

```yml
# below - uses: actions/checkout@v2
with:
  ref: ${{ github.event.pull_request.head.sha }}
# below lhci autorun
env:
  LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

Sjekk ut mitt [GitHub repository](https://github.com/gautemo/lighthouse-example) for en demonstrasjon med en [pull request](https://github.com/gautemo/lighthouse-example/pull/9) som inneholder Lighthouse-statuser.
