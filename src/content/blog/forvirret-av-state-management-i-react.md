---
title: 'Forvirret av State management i React?'
intro: 'State management i React er ikke alltid like lett. Denne er artikkelen for deg som kan en del, men som kanskje ikke har full kontroll på de forskjellige typene state, eller hvordan du best skal håndtere og plassere staten du har. Du får også noen praktiske eksempler som en liten guide til hvordan du burde håndtere state.'
description: 'State management i React er ikke alltid like lett. Denne er artikkelen for deg som kan en del, men som kanskje ikke har full kontroll på de forskjellige typene state, eller hvordan du best skal håndtere og plassere staten du har. Du får også noen praktiske eksempler som en liten guide til hvordan du burde håndtere state.'
pubDate: '2022.06.08'
author: Camilla Marie Dalan
heroImage: '/src/assets/images/forvirret-av-state-management-i-react/hero.webp'
tags: ['Frontend', 'JavaScript']
---

I denne artikkelen skal jeg prøve å gjøre state litt mer forståelig. Jeg skal i hvert fall gjøre et godt forsøk. 😬

*Disclaimer: Siden programmering vanligvis foregår på engelsk og det er mange ord og uttrykk som ikke har noen gode oversettelser til norsk, kommer denne artikkelen til å ha en blanding av norsk og engelsk. Norskifiseringsforkjempere, hold your horses!*

Vi skal se på:

1. Hva er React state og hvordan funker det?
2. Client vs server state
3. Forskjellige typer state
4. Noen statehåndteringsteknikker
5. Hva burde jeg bruke når?

## Hva er state og hvordan funker det?

State er data eller informasjon som forandrer seg over tid. I React er state spesifikt brukt til å optimalisere oppdatering av siden ved å finne ut *akkurat hva* som skal tegnes opp på nytt i DOM-en. Dette gjør den ved å holde styr på en virtuell DOM, eller VDOM. Når staten i en komponent endrer seg, vil den regne ut forskjellen mellom den VDOM-en og den faktiske DOM-en og finne ut hva som burde tegnes opp for brukeren på nytt. Denne optimaliseringen gjøres fordi oppdatering av den faktiske DOM-en er dyrt.

React gjør denne optimaliseringen ved hjelp at to faser: render og commit. Render-fasen er når React gjør kalkulasjoner for å oppdaterer din **virtuelle DOM**, mens commit-fasen skjer når React oppdaterer den faktiske DOM-en. React kan derfor rekalkulere VDOM-en mange ganger, men uten at resultatet faktisk resulterer i *synlige* forandringer, vil den ikke *committe* det til den virkelige DOM-en.

Ganske smart! Men selv om den virkelige DOM-en ikke blir oppdatert, kan mange re-renders fortsatt være dyrt. Spesielt hvis du for eksempel gjør mange computationally heavy operations eller henting av data (her finnes det andre optimeringer du kan gjøre som feks React.memo). Dette kan igjen gå ut over performance og brukeropplevelsen. Så du må selv sørge for at du bruker og oppdaterer state riktig. Det er noe av dette vi skal se på i denne artikkelen.

## Client vs server state 💻

Når det kommer til forskjellige typer state trenger vi først å ta for oss forskjellen på client og server state.

**Server-side state**: data som hentes fra en annen server gjennom nettverkskall.  
**Client-side state**: lokal state bare for den ene brukeren. Dette kan feks være dark/light mode, toggles, filtre, osv.

Med server-side state, siden du må hente data fra en annen server, krever det fort en del teknikker for å håndtere oppdateringer av dataen og optimalisere brukeropplevelsen. Med andre ord så må du fort måtte ta hensyn til feilhåndtering, caching, loading state, paginering og revalidering av cachen. Og, som Phil Karlton angivelig sa: “There are only two hard things in Computer Science: cache invalidation and naming things.” eller populert: “There are only two hard things in Computer Science: cache invalidation and naming things, and off-by-1 errors.”

Client state er, som du kanskje skjønner, litt enklere å håndtere enn server state siden du slipper denne cachingen og å tenke på dyre nettverkskall.

Når det kommer til hvordan håndtere server-side state, kommer tredjepartsbiblioteker fort godt med. De har ofte innebygd støtte (men ikke alltid, og ofte ikke for alt) for for eksempel håndtering av caching, loading state, error handling, etc. Flere av dem kan også hjelpe til med å håndtere global client-side state.

Før du velger et tredjepartsbibliotek er det viktig å spørre seg selv “trenger jeg det i det hele tatt?”. Slike biblioteker kan løse mange utfordringer, men i mange (gjerne enklere) applikasjoner er de strengt tatt ikke nødvendige og kan bringe med seg større kognitiv last, i tillegg til mer kode i prosjektet (større filer, mer KB).

Utdypende forklaring på forskjellige tredjepartsbiblioteker kan bli ganske langt og litt komplisert, så det tror jeg heller får være med i en senere post. Om du har funnet ut at du trenger et tredjepartsbibliotek kan jeg anbefale å se på [denne](https://react-query.tanstack.com/comparison) siden for en oppsummering av de største bibliotekene og hva de tilbyr.

## Hva slags typer state har vi?

### Local State

Local state er state som tilhører og bare brukes av én komponent, og den enkleste formen for state. Man ønsker generelt å bruke dette så mye som mulig fordi det er det enkleste (både for deg og for utviklerne som kommer etter deg) og man har bedre kontroll på hva som fører til re-rendring og ikke. Det er selvfølgelig ikke mulig å bruke local state hele tiden, men noe man kan ha i bakhodet når man skal sette opp eller endre på komponentstrukturen i applikasjonen.Et eksempel på slik state er en enkel counter-komponent som holder styr på sin egen count state:

```js
import React, { useState } from "react";
 
const Counter = () => {
 const [count, setCount] = useState(0);
 
 const handleDecrement = () => setCount((oldCount) => oldCount - 1);
 const handleIncrement = () => setCount((oldCount) => oldCount + 1);
 
 return (
   <div>
     <button onClick={handleDecrement}>-</button>
     {count}
     <button onClick={handleIncrement}>+</button>
   </div>
 );
};
 
export default Counter;
```

### Lifted State

Når to eller flere søskenkomponenter (siblings) deler samme state. Da kan man “løfte” staten opp til nærmeste parent-komponent. Så kan man sende ned staten som props til barna. Her må man passe på at når staten i parenten endrer seg, vil parent-komponenten re-rendres, i tillegg til alle komponenter under seg, selv om de får nye props eller ikke (dette vil ikke nødvendigvis føre til at komponenten blir tegnet opp/re-painted i DOMen på nytt). Dette er default oppførsel for komponenter, og for å ikke re-rendre children som ikke får nye props kan vi wrappe exporten av child-komponenten i React.memo.

```js
export default React.memo(Child);
```

<figure>
  <img src="/src/assets/images/forvirret-av-state-management-i-react/liftedstate1.webp" alt="Component tree" loading="lazy" decoding="async">
  <figcaption>Figur 1: Shallow lifted state</figcaption>
</figure>

<figure>
  <img src="/src/assets/images/forvirret-av-state-management-i-react/liftedstate2.webp" alt="Component tree" loading="lazy" decoding="async">
  <figcaption>Figur 2: Deeper lifted state</figcaption>
</figure>

### Derived State/Computed Properties

Derived state, eller computed properties, er state som er utledet fra annen state. Her tenker du sikkert:

“Wow, Camilla, her var du god til å forklare.”

Det jeg mener med det er at om du har en state, og du hele tiden trenger én spesifikk verdi langt nede i state-objektet, eller noe som er kalkulert ut i fra staten, kan du bare lage en variabel som settes til denne verdien fra staten din. For eksempel, hvis du har en liste med personer og du trenger en liste med bare navnene fra personene, kan du, i stedet for akkurat der du bruker lista med navnene i JSXen, lage en variabel hvis verdi er kalkulert ut i fra staten (lista med personer).

```js
import React, { useState } from "react";
 
const initialPeopleList = [
 { name: "Jenny", age: 40 },
 { name: "Ada", age: 207 },
 { name: "Truls", age: 29 },
];
```

```js
const DerivedState = () => {
 const [people, setPeople] = useState(initialPeopleList);
 const names = people.map((person) => person.name);
 
 return (
   <div>
     <h3>Derived State</h3>
 
     {names.map((name) => (
       <p>{name}</p>
     ))}
   </div>
 );
};
 
export default DerivedState;
```

Her er det også viktig å tenke at denne utregningen blir kjørt for hver re-render, så om man har litt tunge operasjoner, kan det være lurt å optimere ved å bruke useMemo. For eksempel:

```js
const names = useMemo(() => people.map((person) => person.name), [people]);
```

Da er det viktig å huske på å legge inn people-staten i dependency arrayen i argument nummer to til useMemo, så den blir rekalkulert når people endrer seg.

*Disclaimer: når du søker på “derived state react” får du for det meste opp at derived state er å sette ny state i en child-komponent basert på props som blir sendt ned fra parent-komponenten. Det er en helt annen ting, og kan bringe med flere andre utfordringer som jeg ikke skal ta tak i her. Se ​​https://isamatov.com/react-derived-state/ for forklaring på det jeg tenker på som derived state.*

### Global state 🌐

Hvis du har komponenter som trenger samme state (som sett i figuren under), men som er langt fra hverandre i DOM-treet, blir det å bruke lifted state fort veldig komplisert og tungvint fordi du må gjøre mye prop drilling. Da kan det være mer ergonomisk med global state. Global state er state som kan nås fra hvor som helst i komponenttreet og kan håndteres med enten tredjepartsbiblioteker eller det innebygde Context-API-et til React.

## Statehåndteringsteknikker

Her tar jeg for meg litt teknikker man kan ta i bruk for å unngå å dra inn et tredjepartsbibliotek eller generelt gjøre client state litt enklere å håndtere.

### Component Composition

Component Composition en teknikk der man “komponerer” komponenter sammen fra en forelder som ellers hadde vært ganske langt opp i hierarkiet. Dette gjør man for å håndtere state for flere komponenter som ligger litt langt nede trenger samme state, uten å bruke tredjepartsbiblioteker.

<figure>
  <img src="/src/assets/images/forvirret-av-state-management-i-react/components.webp" alt="Component tree" loading="lazy" decoding="async">
  <figcaption>Figur 3: Component composition deeper component tree</figcaption>
</figure>

I dette eksempelet kan vi se at CardComponent har en Header og Content, der Content igjen har Tasks. Vi vet også at disse komponentene hører sammen. I Capra liker vi jo å unngå hierarki, så i stedet for den hierarkiske strukturen over, kan vi endre på den til en flatere struktur som vist i figuren under.

<figure>
  <img src="/src/assets/images/forvirret-av-state-management-i-react/components2.webp" alt="Component tree" loading="lazy" decoding="async">
  <figcaption>
    Figur 4: Component composition shallow component tree
  </figcaption>
</figure>

På denne måten kan vi unngå “prop drilling” der vi må sende ned staten som props i flere ledd for å nå komponenten som trenger det.

Men hvordan får vi dette til? La oss se på koden til det første eksempelet (se Figur 3) med mye hierarki:

```js
import React from "react";
import styles from "./Card.module.css";
 
const workTasks = [
 { id: 1, text: "Write blog post" },
 { id: 2, text: "Watch course on Udemy" },
 { id: 3, text: "Prepare konsulentskolen for the students" },
];
 
const domesticTasks = [
 { id: 1, text: "Clean bathroom" },
 { id: 2, task: "Take out the trash" },
];
 
const NoComponentComposition = () => {
 return (
   <div className={styles.cardWrapper}>
     <Card
       title="Work tasks"
       content={{
         text: "Here are your tasks to do at work",
         tasks: workTasks,
       }}
     />
     <Card
       title="Domestic tasks"
       content={{ text: "Here are your tasks at home", tasks: domesticTasks }}
     />
   </div>
 );
};
 
const Card = ({ title, content }) => {
 return (
   <div className={styles.card}>
     <CardHeader title={title} />
          <CardContent {...content} />
   </div>
 );
};
 
const CardHeader = ({ title }) => {
 return <h2>{title}</h2>;
};
 
const CardContent = ({ text, tasks }) => {
 return (
   <section>
     <p>{text}</p>
     <TasksList tasks={tasks}></TasksList>
   </section>
 );
};
 
const TasksList = ({ tasks }) => {
 return (
   <div>
     {tasks.map((task) => (
       <p key={task.id}>{task.text}</p>
     ))}
   </div>
 );
};
 
export default NoComponentComposition;
```

Her har vi parent-komponenten “NoComponentComposition” som sender inn title og content til “Card” som igjen sender title til “CardHeader” og content til “CardContent” som igjen sender tasks til “TasksList”. Puh. Vi kan kjenne at dette kan bli tungvint, og dette er bare et lite eksempel. Men hva kan vi gjøre med det?


Jo, vi kan endre på alle wrapper-komponentene (som “Card” og “CardContent”) til å returnere children i stedet for de spesifikke komponentene. Da kan vi, i den øverste komponenten, sende inn disse spesifikke komponentene mellom åpne- og lukke-JSXen til wrapper-komponentene. La oss se på det samme eksempelet som over, men med Component Composition (se figur 4).

```js
import React from "react";
import styles from "./Card.module.css";
 
const workTasks = [
 { id: 1, text: "Write blog post" },
 { id: 2, text: "Watch course on Udemy" },
 { id: 3, text: "Prepare konsulentskolen for the students" },
];
 
const domesticTasks = [
 { id: 1, text: "Clean bathroom" },
 { id: 2, task: "Take out the trash" },
];
 
const ComponentComposition = () => {
 return (
   <div className={styles.cardWrapper}>
     <Card>
       <CardHeader title="Work tasks" />
       <CardContent text="Here are your tasks to do at work">
         <TasksList tasks={workTasks} />
       </CardContent>
     </Card>
     <Card>
       <CardHeader title="Domestic tasks" />
       <CardContent text="Here are your tasks at home">
         <TasksList tasks={domesticTasks} />
       </CardContent>
     </Card>
   </div>
 );
};
 
const Card = ({ children }) => {
 return <div className={styles.card}>{children}</div>;
};
 
const CardHeader = ({ title }) => {
 return <h2>{title}</h2>;
};
 
const CardContent = ({ text, children }) => {
 return (
   <section>
     <p>{text}</p>
     {children}
   </section>
 );
};
 
const TasksList = ({ tasks }) => {
 return (
   <div>
     {tasks.map((task) => (
       <p key={task.id}>{task.text}</p>
     ))}
   </div>
 );
};
 
export default ComponentComposition;
```

Her ser vi at både “Card” og “CardContent” rendrer ut children i stedet for “CardHeader”, “CardContent” og “TaskList” respektivt fra eksempelet uten Component Composition. Det gjør at vi heller kan definere det i den øverste parent-komponenten og dermed passe ned props direkte til de nederste komponentene uten prop drilling!

Dersom du trenger å bestemme akkurat hvor child-komponentene skal ligge i JSX-en til parent-komponenten, har du to muligheter:

1. Du kan sende inn et objekt med key/values mellom åpne- og lukke-JSX-en til parent-komponenten, der verdiene (values) er komponentene.
2. Du kan sende inn child-komponentene som navngitte props.

Flere vil nok argumentere for at alternativ 2 er det mest idiomatiske når det kommer til React. La oss se på hvordan det kan gjøres.

```js
const ComponentCompositionWithSpecificPlacement = () => {
 return (
   <div className={styles.cardWrapper}>
     <Card
       header={<CardHeader title="Work tasks" />}
       content={
         <CardContent text="Here are your tasks to do at work">
           <TasksList tasks={workTasks} />
         </CardContent>
       }
     />
     <Card
       header={<CardHeader title="Domestic tasks" />}
       content={
         <CardContent text="Here are your tasks at home">
           <TasksList tasks={domesticTasks} />
         </CardContent>
       }
     />
   </div>
 );
};
 
const Card = ({ header, content }) => {
 return (
   <div className={styles.card}>
     <div>{header}</div>
     <div>{content}</div>
   </div>
 );
};
```

### Web Storage

I utgangspunktet vil all local state (altså, state som er lagret hos brukeren, ikke typen state som forklart over) i applikasjonen din bli slettet om brukeren for eksempel laster siden på nytt eller lukker nettleseren. Dersom du ønsker å lagre slik lokal state hos brukeren på tvers av nettlesersesjoner, kan du bruker web storage. Dette er data som lagres i nettleseren i key/value-par på tvers av reloads eller sesjoner. Det finnes to typer web storage: sessionStorage og localStorage. sessionStorage er data som persisteres over reload av nettsiden, mens localStorage er data som persisteres selv om brukeren lukker hele nettleseren. Du kan lese mer om Web Storage [her](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

### React Context

La oss ta et eksempel der vi har en nettside der brukeren kan endre fra light mode til dark mode. Slik state vil vi trenge overalt i applikasjonen og egner seg dermed dårlig til noen av de andre ovennevnte teknikkene. Så vi bruker Context. Men hvordan bruker vi det?

*theme-context.js*
```js
import { createContext } from "react";
 
const ThemeContext = createContext({
 isLightTheme: true,
 toggleTheme: () => {},
});
 
export default ThemeContext;
```

Først lager vi et Context-objekt ved hjelp av den innebygde “createContext”-funksjonen til React og sender inn default state-verdier som argument. Når du bruker “createContext” vil den lage et objekt med en Provider, Consumer og displayName. Provider er en HOC (Higher-Order Component) som du wrapper rundt alle komponentene som trenger contexten. Consumer er også en HOC, men som brukes til å wrappe konsumentene. Men i dag, med hooks, vil jeg argumentere for at det er mye enklere å bruke “useContext”-hooken når du skal bruke en context i en konsument.

Siden hele appen vår trenger ThemeContext, la oss wrappe alt under App med ThemeContext.Provider.

*App.jsx*
```js
import { useState } from "react";
import "./App.css";
import ThemeContext from "./context/theme-context";
 
const App = () => {
 const [isLightTheme, setIsLightTheme] = useState(true);
 const toggleTheme = () => setIsLightTheme((prevVal) => !prevVal);
 
 return (
   <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
     ...
   </ThemeContext.Provider>
 );
};
```

Her ser vi at vi legger inn startverdiene til contexten, som kommer fra staten i App.jsx. La oss ta i bruk denne contexten i en “Card”-komponent med “useContext”-hooken.

*Card.jsx*
```js
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import styles from "./Card.module.css";
 
const Card = ({ children }) => {
 const { isLightTheme } = useContext(ThemeContext);
 
 return (
   <div
     className={`${styles.card} ${
       isLightTheme ? styles.lightTheme : styles.darkTheme
     }`}
   >
     {children}
   </div>
 );
};
 
export default Card;
```

Her henter vi bare ut verdien “isLightTheme” fra Context-en og bruker den til å sette hvilken css-klasse Card-komponenten skal ha. Ganske greit!

Siden vi også har lagt til funksjonen “toggleTheme” i Context-en, kan vi også bruke denne til å endre på “isLightTheme”. La oss lage en navbar med en toggle-knapp for å toggle mellom light og dark theme.

*Navbar.jsx*
```js
import React, { useContext } from "react";
import ThemeContext from "../context/theme-context";
import styles from "./Navbar.module.css";
 
const Navbar = () => {
 const { isLightTheme, toggleTheme } = useContext(ThemeContext);
 
 return (
   <nav>
     <h1>React Context Demo</h1>
     <label className={styles.switch}>
       <input value={isLightTheme} onChange={toggleTheme} type="checkbox" />
       <span className={`${styles.slider} ${styles.round}`}></span>
     </label>
   </nav>
 );
};
 
export default Navbar;
```

La oss sette alt sammen i App.jsx:

*App.jsx*
```js
import { useState } from "react";
import "./App.css";
import { useState } from "react";
import "./App.css";
import styles from "./App.module.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import ThemeContext from "./context/theme-context";
 
const persons = [
 {
   firstName: "Mark",
   age: 35,
 },
 { firstName: "Ada", age: 207 },
 { firstName: "Karen", age: 44 },
];
 
const App = () => {
 const [isLightTheme, setIsLightTheme] = useState(true);
 const toggleTheme = () => setIsLightTheme((prevVal) => !prevVal);
 
 return (
   <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
     <div
       className={`${styles.container} ${
         isLightTheme ? styles.light : styles.dark
       }`}
     >
       <Navbar />
       <div className={styles.contentContainer}>
         {persons.map((person) => (
           <Card>
             <p>Name: {person.firstName}</p>
             <p>Age: {person.age}</p>
           </Card>
         ))}
       </div>
     </div>
   </ThemeContext.Provider>
 );
};
 
export default App;
```

I dette tilfellet er det bare to steg ned i hierarkiet vi trenger staten, så her hadde vi strengt tatt ikke trengt Context. Det er allikevel enkelt å tenke seg at appen fort kan vokse og trenge denne staten overalt på alle forskjellige nivåer. Da kommer Context godt med.

En ekstra optimering vi kan gjøre her er å lage vår egen Provider-komponent som tar hånd om sin egen state, i stedet for at den blir kontrollert fra en komponent i appen, som vi gjør i App.jsx i dette tilfellet. La oss se på hvordan vi kan gjøre det i “theme-context.js”.

*theme-context.js*
```js
import { useState } from "react";
import { createContext } from "react";
 
const ThemeContext = createContext({
 isLightTheme: true,
 toggleTheme: () => {},
});
 
export const ThemeContextProvider = ({ children }) => {
 const [isLightTheme, setIsLightTheme] = useState(true);
 
 const handleThemeToggle = () => setIsLightTheme((prevVal) => !prevVal);
 
 return (
   <ThemeContext.Provider
     value={{ isLightTheme, toggleTheme: handleThemeToggle }}
   >
     {children}
   </ThemeContext.Provider>
 );
};
 
export default ThemeContext;
```

Med denne komponenten kan vi da dra ut ThemeContext.Provider fra App.jsx og bruke vår nye komponent, ThemeContextProvider i index.jsx:

*index.jsx*
```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeContextProvider } from "./context/theme-context";
 
ReactDOM.render(
 <React.StrictMode>
   <ThemeContextProvider>
     <App />
   </ThemeContextProvider>
 </React.StrictMode>,
 document.getElementById("root")
);
```

Vi kan da forenkle App.jsx til:

*App.jsx*
```js
import { useContext } from "react";
import "./App.css";
import styles from "./App.module.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import ThemeContext from "./context/theme-context";
 
const persons = [
 {
   firstName: "Mark",
   age: 35,
 },
 { firstName: "Ada", age: 207 },
 { firstName: "Karen", age: 44 },
];
 
const App = () => {
 const { isLightTheme } = useContext(ThemeContext);
 
 return (
   <div
     className={`${styles.container} ${
       isLightTheme ? styles.light : styles.dark
     }`}
   >
     <Navbar />
     <div className={styles.contentContainer}>
       {persons.map((person) => (
         <Card>
           <p>Name: {person.firstName}</p>
           <p>Age: {person.age}</p>
         </Card>
       ))}
     </div>
   </div>
 );
};
 
export default App;
```

Vi ser her at React Context kan være utrolig nyttig og ganske intuitivt, men det har noen “mørke” sider vi trenger å tenke på før vi tar det i bruk.

Context er ikke så effektiv når det kommer til hyppige oppdateringer av state. Her burde du heller vurdere tredjepartsbiblioteker som Redux. Alle komponenter som er descendants av en Provider og som konsumerer Context-en (enten vha “useContext” eller Consumer-komponenten som Context-en lager), vil re-rendre når verdien contexten i Provider-en endrer seg. Sørg defror for å bryte opp contextene du har dersom ikke all staten i den samme Context-en hører til hverandre. Hold state som endrer seg med hverandre i samme Context, og streb etter å ikke ha få store, men heller mindre små Context-er.

Videre er det også viktig å ikke tenke at Context erstatter all kommunikasjon mellom komponenter som props. Det finnes en tid for alt.

## Hva burde jeg bruke når? 🤔

**Staten trengs bare av én komponent**  
Bruk local state.

**Staten trengs av to eller flere komponenter relativt nærme hverandre i DOM-treet**  
Bruk lifted state, ev Component Composition om det passer seg.

**Staten trengs av to eller flere komponenter, relativt nærme, men trenger mye prop drilling.** 
Vurder Component Composition. Eventuelt Context eller et tredjepartsbibliotek.

**Det er mange komponenter som trenger den samme staten.**  
Hvis disse komponentene er i nærheten av hverandre, vurdér lifted state. Dersom de krever en del prop drilling, vurder Component Composition. Dersom ingen av disse teknikkene passer, kan du vurdere global state. Bruk Context om staten ikke oppdateres ofte og du vet at komponenten ikke skal gjenbrukes til noe annet. Bruk et tredjepartsbibliotek dersom ingen av de ovennevnte strategiene passer.

**Jeg har masse server-side state og trenger å optimalisere performance og brukeropplevelsen**  
Definitivt bruk et tredjepartsbibliotek med innebygd støtte for caching, loading state og error handling. I de aller aller fleste tilfeller er det ikke vits i å finne opp hjulet på nytt (om du ikke er Facebook eller noe).

Generelt kan en gyllen regel for nye prosjekter være å unngå å dra inn et tredjepartsbibliotek om man ikke finner ut at man virkelig trenger det og fordelene overveier den økte kompleksiteten.

Happy state management! 👏