---
title: 'Server Side Rendered Custom Elements'
description: 'Nå har du muligheten til å utvide vanlige HTML tags med egen logikk og lage avanserte komponenter. Les mer >>'
pubDate: '2020.11.17'
author: Anders Olav Candasamy
heroImage: '/innhold/server-side-rendered-custom-elements.webp'
tags: ['Frontend']
---

Custom Elements er en nyere teknologi som i dag støttes av de [fleste moderne nettlesere](https://caniuse.com/custom-elementsv1). Med dette har vi mulighet til å utvide vanlige HTML tags med egen logikk og lage avanserte komponenter.

Best av alt er at disse komponentene krever ingen JavaScript-rammeverk eller -biblioteker. Støtten leveres direkte av **selve** nettleseren. For nettsiden din betyr dette mindre JavaScript og bedre brukeropplevelser.

Ettersom Custom Elements er en nettleserteknologi, finnes den ikke på serveren (en NodeJS server i vårt tilfelle). Konsekvensen av dette er at vi ikke kan gjøre uttegning på serveren. Heldigvis skal vi se at dette er ganske enkelt å få til. Uttegning på server er nok bedre kjent som Server Side Rendering (SSR).

## Hva er Server Side Rendering (SSR)

Om du aldri har hørt om SSR før, så er ikke det så farlig. Kort forklart kan man si at det finnes to måter å levere nettsider på: Server Side Rendering (SSR) og Client Side Rendering (CSR). Med SSR lages all HTML på serveren din før den blir sendt til brukerne. Med CSR blir derimot JavaScript – som kan generere HTML – sendt til brukerne. SSR kan *på en måte* sammenlignes med Foodora som leverer ferdiglaget mat rett til døren din, mens CSR er Kolonial som leverer oppskriftene og ingrediensene du trenger for å lage mat. Det finnes fordeler og ulemper med begge disse og det som er “best” er helt avhengig av kontekst. Generelt vil SSR gi brukerne dine det beste førsteinntrykket av en nettside. Dette fordi de presenteres med innholdet med engang - de må ikke vente på JavaScript.

Nå som vi har fått dekket eventuelle hull i forkunnskaper, er vi  klare for å lage et Custom Element som serveren og i nettleseren kan bruke - Et *isomorphic* custom element, med andre ord. Med denne kan vi få det beste fra både SSR og CSR. Et bruksområde for et slikt element kan være et standardkomponent bibliotek som skal kunne brukes på tvers av forskjellige teams/applikasjoner som bruker SSR og/eller CSR.

Koden som vises under kan ses i sin helhet her: [gist.github.com](https://gist.github.com/AndersCan/d216a385d951f8d5ba8a0dc3373d6417) og en liten demo her: [Codepen.io](https://codepen.io/AndersCan/full/BazMJJp).

## Isomorphic Custom Element

La oss lage en custom element som hete `hello-element`. Vi ønsker at dette elementet skal tegne ut `Server: Hei` på serveren, og `Nettleser: Hei` i nettleseren. Et litt urealistisk eksempel, men den vil gjøre det lett å skille på hva serveren tegner (SSR) og hva nettleseren tegner (CSR).

## Client Side Rendering

La oss starte med å implementere nettleserversjonen av `hello-element`. Det første vi må gjøre er å fortelle nettleseren at vi har et nytt element. Vi må også fortelle nettleseren hva den skal gjøre når den ser dette elementet på nettsiden vår.

```js
customElements.define(
  "hello-element", 
  HelloElement
);
```

Her forteller vi nettleseren om `hello-element` og gir en `HelloElement` klasse til denne. Nå vil nettleseren bruke denne klassen for å vite hva den skal gjøre. La oss nå definere `HelloElement` klassen.

```js
class HelloElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render("Nettleser: Hei");
  }
  render(text) {
    return `<h1> ${text} </h1>`;
  }
}
```

Implementasjonen er ganske kort, men det er 3 ting som er viktige å få med seg her.

- Det første er at klassen vår må utvide nettleseren sin `HTMLElement`. Dette er et krav nettleseren stiller til alle Custom Elements.
- Det andre er `connectedCallback` funksjonen. `connectedCallback` er en lifecycle event som kjøres av nettleseren når den oppdager HTML taggen vår, `hello-element`. I denne setter vi HTML til det vi ønsker.
- Sist, men ikke minst, er at `render` funksjonen vår er pure - den bruker kun inputen den får.

Med dette har vi nå et element som kan brukes i nettleseren.

```html
<!-- når nettleseren ser -->
<hello-element> </hello-element>
<!-- vil connectedCallback gjøre den om til -->
<hello-element> <h1> Nettleser: Hei </h1> </hello-element>
```

I eksemplet over må vi vente på at `connectedCallback` blir kjørt før vi viser innhold til brukeren. Neste steg er å kunne bruke `hello-element` på serveren, slik at vi alltid viser innhold.

## Server Side Rendering

Det første vi trenger på serveren er å definere en `HTMLElement` klasse. Som nevnt tidligere, er det nettleseren selv som definerer denne. Selv om vi egentlig ikke bruker den på serveren, har vi implementert `HelloElement` slik at den må defineres. Heldigvis kan denne være helt tom.

```js
global.HTMLElement = class EmptyHTMLElement {};
```

Grunnen til at denne kan være helt tom er fordi serveren er kun interessert i hva HTMLen blir. Den bryr seg ikke om registrering av elementet, krav om utviding av `HTMLElement` og `connectedCallback` funksjonen. Den trenger kun vite navnet på elementet og HTMLen som skal være inni den.

```js
const helloElement = new HelloElement();
const serverHtml = `
<hello-element>
  ${helloElement.render("Server: Hei")}
</hello-element>`;
```

Så enkelt kan det gjøres, men vi kan gjøre dette litt enklere med en hjelpefunksjon: `renderElement`.

```js
function renderElement(elementConstructor, tagName, props) {
  const element = new elementConstructor();
  const html = element.render(props);

  return `<${tagName}> ${html} </${tagName}>`;
}
```

Med `renderElement` blir uttegningen av `hello-element` litt kortere å skrive.

```js
const html = renderElement(
  HelloElement, 
  "hello-element", 
  "Server: Hei"
);
```

Med dette har vi nå byggeklossene for å få det beste fra to verdener: SSR og CSR. Det er temmelig få linjer med kode og det finnes mange enkle forbedringer som kan gjøres her. Vi har gjort ting enklest mulig slik at koden ble kortest mulig.

Om du lurer så kan du fint bruke React eller Preact i dette oppsettet om du vil. Det eneste kravet med løsningen er at du kan konvertere det `render` returnere til HTML. For nettleseren blir det `ReactDOM.render` (evt. `ReactDOM.hydrate`) og på serveren blir det `ReactDOM.renderToString`.

En liten demo av denne løsningen kan ses på [Codepen.io](https://codepen.io/AndersCan/full/BazMJJp).

Synes du dette var spennende, kan du se nærmere på https://github.com/popeindustries/lit-element som var inspirasjonen til denne bloggposten. Denne benytter seg av lit-html og gjør ting *litt* annerledes enn det vi har vist her. [Heresy](https://github.com/WebReflection/heresy) er også et interessant bibliotek å se på.