---
title: 'Vue 3 kommer snart!'
description: 'Jeg har nå lekt en del med Vue 3, og det er bare å glede seg! La meg dele noe av det jeg har lært. I følge deres roadmap så planlegger de en utgivelse i slutten av Q2 2020. I dag er beta-versjonen publisert. Merk at det fortsatt kan komme små endringer. Men hvis du vil ha et forsprang, så kan denne artikkelen skrevet 30. april 2020 hjelpe deg.'
pubDate: '2020.04.29'
author: Gaute Meek Olsen
heroImage: '/vue-3-kommer-snart/hero.webp'
tags: ['Frontend']
---

Jeg har nå lekt en del med Vue 3, og det er bare å glede seg! La meg dele noe av det jeg har lært. I følge deres [roadmap](https://github.com/vuejs/vue/projects/6) så planlegger de en utgivelse i slutten av Q2 2020. I dag er beta-versjonen publisert. Merk at det fortsatt kan komme små endringer. Men hvis du vil ha et forsprang, så kan denne artikkelen skrevet 30. april 2020 hjelpe deg.

## Komme i gang i dag

Du kan allerede nå lage et Vue 3 prosjekt. Men husk at offisiell dokumentasjon ikke finnes enda og små kode endringer kan forekomme. Jeg har opprettet et [GitHub repository](https://github.com/gautemo/vue-3-playground) med et prosjekt du kan leke deg med og se noen kode-eksempler. Readme-filen inneholder også mer informasjon om hvordan du setter opp ditt eget prosjekt, samt ressurser, artikler, videoer og podkaster om Vue 3.

## Forbedringer

Den største forandringen med Vue 3 er at den er skrevet om fra bunnen av, men for oss utviklere så vil det kodemessig være så og si helt likt. Men dette gir oss et mye bedre produkt. Vue var allerede raskt, men har nå store ytelse og minne forbedringer, og tree shaking(eliminerer ubrukt kode) gir mindre produksjonsfiler.

![Sonic](/vue-3-kommer-snart/sonic.gif)

De har også skrevet Vue 3 i TypeScript, noe som gjør at prosjektet er mer vedlikeholdbart for Vue teamet. Men dette gir også oss noen fordeler, selv om du setter opp prosjektet ditt med JavaScript eller TypeScript så vil du få bedre IntelliSense og typeahead.

De benytter nå [RFCs](https://github.com/vuejs/rfcs) (Request For Comments) for hver endring for å involvere community'et i valg som blir tatt.

## Endringer

### Composition API

Det finnes nå en ny valgfri måte å skrive JavaScript delen av komponentene. De kaller måten vi gjør det på i dag for Options API, hvor man har et objekt med data, metoder, computed properties osv. Dette er fortsatt gyldig i Vue 3. Composition API er bare en ny valgfri mulighet. Jeg skal prøve å holde det kort, for en grundigere forklaring over alle fordelene kan du gå [hit](https://vue-composition-api-rfc.netlify.com/#logic-reuse-code-organization).

La oss se på skjelettet til komponent objektet.

```js
// Import the API's you are using for the component
import { ref, reactive, computed } from 'vue';

export default {
  // the setup method where logic happens
  setup(){
    return { /* return what logic is exposed to the template */ }
  }
}
```

Nå til den spennende delen. La oss skrive noe setup kode. `ref` og `reactive` brukes for reaktive variabler.

```js
setup(){
  //Let's have two different reactive values
  const counter = ref(0);
  const state = reactive({
    count: 0
  });

  //Update the values
  counter.value++;
  state.count++;

  return { counter, state }
}
```

Som du kan se kan ref og reactive gjøre så og si det samme. `ref` er hovedsakelig for primitive verdier og arrays. Mens `reactive` holder på et objekt. Hvilken du bruker vil være opp til deg, med tid kommer det nok noen best practices man kan følge.

Vi er allerede vant til å bruke computed properties, metoder og watch. Prinsippene er de samme, bare skrevet litt forskjellig.

Vi har også `watchEffect` som er veldig lik watch, men her trenger du ikke å fortelle hvilke verdier den skal lytte til. Den vil finne disse selv basert på de som blir brukt.

```js
setup(){
  const counter = ref(0);
  
  const double = computed(() => counter.value * 2);

  const addToCounter = toAdd => counter.value += toAdd;

  watch(counter, () => console.log('counter updated'));

  return { double, addToCounter }
}
```

Jeg bruker arrow funksjoner her, men det kunne vært vanlige funksjoner. Koden trenger ikke engang å være inne i setup metoden, den kan være utenfor Vue objektet eller til og med i en egen fil. Det som betyr noe er at setup returnerer det som skal brukes i templaten.

Dette fikk meg til å tenke, er det ikke da veldig enkelt å lage en global reactive state? Svaret er ja.

*globalShoppingCart.js*
```js
import { reactive, computed } from 'vue';

const shoppingCart = reactive({
  items: [],
  totalPrice: computed(() => shoppingCart.items.reduce((acc, item) => acc + item.price, 0))
});

const addItem = item => shoppingCart.items.push(item);

export { addItem, shoppingCart }
```

*item.vue*
```vue
<template>
    <h1>Ball</h1>
    <button @click="addItem({name: 'ball', price: 99})">Add to Cart</button>
</template>

<script>
import { addItem } from '@/globalShoppingCart'

export default {
    setup(){
        return { addItem }
    }
}
</script>
```

*cart.vue*
```vue
<template>
    <h1>Cart</h1>
    <span>Items: {{ shoppingCart.items.length }}</span>
    <span>Price: {{ shoppingCart.totalPrice }}</span>
</template>

<script>
import { shoppingCart } from '@/globalShoppingCart'

export default {
    setup(){
        return { shoppingCart }
    }
}
</script>
```

Dette er virkelig kult! Vi slipper å bruke så mye props og emits for å sende data rundt lengre.

Det fungerer også supert for å gjenbruke kode. La oss lage like og super like funksjonalitet i en egen JavaScript fil, men la alle komponenter som benytter denne få sin egen state.

*likes.js*
```js
import { ref } from "vue"

const getLikes = () => {
    const likes = ref(0)
    const superLike = () => likes.value += 1000;
    return { likes, superLike }
}

export { getLikes }
```

*hearts.vue*
```vue
<template>
    <div>
        {{likes}}🧡
        <button @click="likes++">Love</button>
        <button @click="superLike">💕💕💕</button>
    </div>
</template>

<script>
import { getLikes } from '@/likesOwn';
export default {
    setup(){
        return { ...getLikes() }
    }
}
</script>
```

Siste delen av Composition API'et er lifecycle hooks. Det er stort sett det samme, bare at de skrives inne i setup metoden og du kan ha flere av den samme.

```js
setup(){
  onMounted(() => console.log('DOM is ready'));
  onMounted(() => console.log('mounted called again'));
}
```

En ting å merke seg er at det ikke eksisterer en onCreated. Denne type kode skal heller puttes i setup metoden. Siden denne vil kjøres en gang i starten for hver komponent. Så det å hente data og slikt hører hjemme her.

Composition API'et er valgfritt og kan også brukes sammen med options API'et. Composition API'et vil hjelpe med å holde tilhørende logikk i nærheten av hverandre, flytte kode til sine egne filer og gjenbruke kode. Men konseptene i Vue er det samme, du vil putte dataene dine i `ref` eller `reactive` og benytte `watch`, `computed` og lifecycle hooks slik vi er vant til.

### Fragment

Du har kanskje lagt merke til at hver template kan kun ha ett child element. Dette er dumt fordi det forurenser DOM'et og gir deg mer kode og innrykk.

Vel, ikke nå lengre.

```vue
<template>
  <h1>This is</h1>
  <h2>completely</h2>
  <h3>fine! :)</h3>
</template>
```

### Suspense

Suspense er en ny funksjon som er introdusert i Vue 3. Når en komponent ikke er klar fordi den kjører asynkron kode, så gir Suspense deg en enkel måte å vise for eksempel en spinner.

La oss si at vi har en async setup metode som henter noe data.

```js
async setup(){
  const response = await fetch('someurl');
  const data = await response.json();
  return { data }
}
```

Dette kan ta noe tid og komponenten vil ikke være klar med en gang. Da kan du foreldre komponenten bruke Suspense slik.

```vue
<template>
  <Suspense>
    <template #default>
      <MyChildComponenta/> //the component with async setup
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

### Teleport

Merk at Teleport ble kalt for Portal inntil ganske nylig, hvis du leser andre artikler.

Teleport gir oss muligheten til å teleportere HTML kode til et annet sted utenfor komponenten.

Et sted i applikasjonen, så kan du ha et element med en id.

```html
<div id="arrival-spot"></div>
```

Så kan du i hvilken som helt komponent peke til det elementet.

```vue
<template>
  <div>
    <span>I'm still in my component</span>
    <Teleport to="#arrival-spot">
      <span>Woho, I can teleport \o/ </span>
    </Teleport>
  </div>
</template>
```

### Flere v-model

Nå kan du ha flere v-models på dine komponenter når du vil binde forskjellige verdier.

```vue
<HumanStats v-model:age="human.age" v-model:height="human.height"/>
```

### Transition

Bare en liten navneendring for transitions. v-enter-active, v-enter, v-enter-to var litt forvirrende. I Vue 3 er v-enter omdøpt til `v-enter-from` og v-leave til `v-leave-from`. Dette gir mer mening, du har en klasse for når den er aktiv, en for hva den forandres fra og en for hva den forandres til.

### Filter fjernet

```vue
<!-- before -->
{{ date | format }}

<!-- after -->
{{ format(date) }}
```

I Vue 2 hadde vi filer metoder som kunne brukes for å vise data. Dette er nå fjernet for å sørge for at klammeparentesene kun skal inneholde gyldig JavaScript. Computed properties eller metoder skal brukes i stedet.

### App configuration

I Vue 2 hadde vi et globalt `Vue` objekt som vi konfigurerte. I Vue 3 er hver konfigurasjon satt direkte på hver Vue applikasjon definert med `createApp`.

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)

app.mount('#app')
```

## Konklusjon

Jeg gleder meg veldig til Vue 3. Jeg tror at dette vil sørge for at Vue er et av de beste web-rammeverkene som finnes.