---
title: 'Effektiv JSON validering med TypeBox'
intro: 'Selvom jeg skriver all koden min med TypeScript, ender jeg fortsatt opp med typefeil.'
description: 'Effektiv JSON validering med TypeBox'
pubDate: '2022.08.24'
author: Anders Olav Candasamy
heroImage: '/effektiv-json-validering-med-typebox/hero.webp'
---

Det er lett å tro at dersom du skriver koden din i TypeScript, så ender du ikke opp med typefeil: `Uncaught TypeError: Cannot read property 'foo' of undefined`. Men hvorfor ikke?

## Forklaringen

Forklaringen er veldig enkel og ikke overraskende – typen `any`. `any` gjør at TypeScript ikke bryr seg om hva du skriver og godtar at en verdi kan være hva som helst. Jeg bruker ytterst sjeldent `any`, men oppdaget at det var i `fetch` kallene mine hvor jeg, ganske så skjult, introduserte dem.

```ts
async function getPerson(id: string) {
  const person = await fetch(`/person/${id}`).then((response) =>
    response.json()
  );
  // 😬
  return person as Person;
}
```

Problemet her er at typen til `response.json()` er `any` og jeg *"caster den bare"* til typen `Person`. Det kan godt være at antagelsen min om hva `/person/` endepunktet leverer alltid er riktig, men det er vanskelig å garantere. Så hvordan kan jeg, på en praktisk måte, fjerne `as Person`-biten?

## Løsningen - JSON Schema med TypeBox

Den mest rett frem måten å løse dette på er ved å manuelt inspisere objektet som blir returnert og forsikre at den er slik vi forventer. Dette kan gjøres "manuelt" (`typeof person.name === "string"` osv), men det er her [JSON Schema](https://json-schema.org/) og [TypeBox](https://github.com/sinclairzx81/typebox) kommer inn i bildet.

<figure>
  <img src="/effektiv-json-validering-med-typebox/cartoon.webp" alt="Cartoon">
  <figcaption>JSON Schema form er kanskje ikke for alle</figcaption>
</figure>

JSON Schema er et vokabular for å definere strukturen til et JSON-objekt. Denne strukturen kan brukes for å validere at et vilkårlig objekt passer med skjemaet. Dessverre blir det fort vanskelig å skrive og vedlikeholde slike skjemaer for større JSON strukturer. Heldigvis finnes det biblioteker som TypeBox som gjør ting betraktelig bedre.

## TypeBox

[TypeBox](https://github.com/sinclairzx81/typebox) gjør i grunn bare én ting: den hjelper deg å definere strukturen til et JSON-objekt (`JSON Schema`). Det er alt. Den inneholder altså ingen funksjon for å gjøre validering, men dette kommer jeg tilbake til.

La oss se hvordan vi kan definere strukturen til objektet- `PersonSchema`

```ts
import { Type } from '@sinclair/typebox';

const PersonSchema = Type.Object({
  navn: Type.String(),
  alder: Type.Number(),
});
```

I koden over har vi definert et JSON-objekt som inneholder `navn` og `alder`. `Type`-objektet som vi har importert inneholder mye funksjonalitet som hjelper oss å definere mer komplekse skjemaer.

```ts
const PersonOrDogSchema = Type.Union([
  Type.Object({
    type: Type.Literal('Person'),
    navn: Type.String(),
    alder: Type.Number(),
  }),

  Type.Object({
    type: Type.Literal('Dog'),
    navn: Type.String(),
    voffDecibel: Type.Optional(Type.Number()),
  })
]);
```

Her har vi definert et mer avansert objekt som er enten en `Person` eller `Dog` (jeg vet ikke hvorfor et API vil levere noe slikt, men dette er bare et eksempel).

For meg virker disse skjemaene som en mer verbos versjon av TypeScript. Nøkkelordene brukt her kjenner i hvert fall jeg igjen fra TypeScript.

Det er nok her mange lurer: "Må jeg definere et JSON Schema OG et TypeScript interface?". Svaret er heldigvis nei, fordi TypeBox har en feature som jeg mener er en *game changer*.

### Fra skjema til TypeScript

Det virker *nesten* som magi, men med bare én linje kode kan vi gjøre et skjema om til en TypeScript-type.

```ts
import { Static } from "@sinclair/typebox";

type IPersonSchema = Static<typeof PersonSchema>;
```

Denne typen er nå helt identisk med følgene:

```ts
type IPersonSchema = {
  navn: string;
  alder: string;
};
```

Selv den mer komplekse `PersonOrDogSchema` kan konvertes:

```ts
type IPersonOrDog = Static<typeof PersonOrDogSchema>;

// er det samme som
type IPersonOrDogSchema =
  | {
      type: 'Person';
      navn: string;
      alder: number;
    }
  | {
      type: 'Dog';
      voffDecibel?: number | undefined;
      navn: string;
    };
```

Dette er en av grunnene til at jeg anbefaler TypeBox. For en *ganske liten* kostnad får du et TypeScript interface og en JSON Schema form. En kan brukes ved *build time* og den andre ved *run time*.

Hvordan du skal gjøre validering har jeg ikke snakket om enda. Som nevnt før gjør TypeBox ingenting av validering – den hjelper oss bare definere et skjema. For validering må vi benytte andre biblioteker.

## Validering med Ajv

Som nevnt tidligere er skjemaet TypeBox lager er et [JSON Schema](https://json-schema.org/). Det finnes [mange biblioteker](https://json-schema.org/implementations.html#validators), i forskjellige programmeringsspråk, som kan gjøre validering av JSON Schema. Den mest populære for JavaScript er `Ajv` og den jeg vil benytte i eksemplene under.

```ts
import Ajv from 'ajv';

const ajv = new Ajv();

const isPerson = ajv.compile<IPersonSchema>(PersonSchema);

if (isPerson(something)) {
  // something er nå `IPersonSchema`
} else {
  // 🤷
}
```

Ajv gir oss en funksjon som returnerer enten `true` eller `false` avhengig av om det du sender som argument passer med skjemaet. Vi sender også `IPersonSchema` så den vet hvilken type et `true` resultat vil være – en type guard.

Det finnes mange andre validering biblioteker der ute. Du kan fritt benytte en annen enn Ajv om du ønsker, men anbefaler at du starter med den. En grunn til å ikke velge Ajv er at den kan være for stor i antall kilobytes. De har en [“løsning”](https://ajv.js.org/standalone.html), men den tror jeg er litt overkill for de fleste.

## Fullstendig løsning

Med alt dette kan vi endelig kvitte oss med `as Person` fra vårt første eksempel og heller validere at det faktisk **er** en person.

```ts
async function getPerson(id: string) {
  const person = await fetch(`/person/${id}`).then((response) =>
    response.json()
  );

  if (isPerson(person)) {
    return person;
  }

  throw new Error(
    `uventet response fra /person/${id} - (${JSON.stringify(person)})`
  );
}
```

Hva du faktisk skal gjøre ved feil må du bestemme selv. Så lenge skjemaet ditt ikke krever mer enn det du faktisk bruker gir det mest mening å kaste en exception. Det tenker i hvert fall jeg. Da får du en stack trace som viser nøyaktig hvor, og hvorfor, ting gikk galt. Det er mye bedre enn `Uncaught TypeError: Cannot read property 'foo' of undefined` et tilfeldig sted i koden.

## Oppdag feil - ikke skap dem

Helt til slutt vil jeg anbefale å skrive skjemaer som ikke *skaper* feil, men heller *oppdager* feil tidlig. Derfor burde du ikke kreve felter som du ikke bruker – da skaper du feil. Dette er dog helt avhengig av hva du ønsker og hvor *"paranoid"* du ønsker å være.

## Feedback

Takk for at du leste. Send gjerne en [e-post](mailto:aca@capraconsulting.no) om du har spørsmål eller kommentarer.