---
title: 'TailwindCSS: det neste logiske steget?'
intro: 'TailwindCSS, ofte omtalt bare som tailwind, er et utility-first CSS-bibliotek for å hurtig bygge brukergrensesnitt med høy grad av egenkontroll.'
description: 'I 2017 ble TailwindCSS lansert, og med det en ny tilnærming til å strukturere og forholde seg til styling av nettsider. I stedet for klassiske frontend-rammeverk, er tailwind såkalt utility-first'
pubDate: '2021.06.08'
author: Øyvind Aukner
heroImage: '/innhold/tailwindcss-det-neste-logiske-steget/hero.svg'
tags: ['Frontend']
---

## Vanligvis...

Når man skal lage en nettside, pleier man tradisjonelt sett å benytte seg av CSS/SASS eller et frontend-rammeverk som Bootstrap eller Materialize. Fordelen med å kode selv er kontroll, mens ulempene er lav hastighet, mange ekstra filer og mye lenking til klassenavn i HTML. Rammeverk gir på den andre siden hurtighet til erfarne utviklere samt utvidet mulighetsrom for utviklere med kortere fartstid. Ulempen er at kunnskapen om det nye rammeverket også blir en ny og isolert ferdighet som er vanskelig å overføre tilbake til CSS. Flere av rammeverkene har ofte også sin egen «look»: Om du for eksempel har bygget et par sider med Bootstrap, vil du fort kjenne igjen dette når du lander på en ny side – man sier da at denne siden er «Bootstrap’et». Dette har utviklet seg til en look mange ønsker å unngå om det er et mål å skille seg litt ut visuelt.

## ..men nå!

I 2017 ble TailwindCSS lansert, og med det en ny tilnærming til å strukturere og forholde seg til styling av nettsider. I stedet for klassiske frontend-rammeverk, er tailwind såkalt *utility-first*. Dette refererer til at det for det meste består av en haug av slike hjelpeklasser, eller utilities, som har blitt definert for alt du kan tenke deg. Være seg bredde, farge, skygge, margin eller animasjoner. De er utarbeidet for å være dekkende og samtidig innsnevrende. Det er også bygget inn støtte for å optimalisere koden ved å fjerne alle hjelpeklasser du ikke trenger i bygg-steget, og du holder dermed prosjektets størrelse i produksjon under kontroll ved å kun *shippe* det du trenger.

Du får et subset av styling-funksjonalitet som skal fungere for alle vanlige behov. For eksempel fargevalg fra 100 som er lys, til 900 som er mørk i steg på 100. I tillegg kan alt overstyres og utvides i en konfigurasjonsfil, slik at du enkelt kan integrere den visuelle profilen til produktet ditt. Merk at hjelpeklassene er så minimalistiske som mulig og gir kun en og en funksjon. Det er altså en annen måte å tenke på enn for eksempel rammeverk som gir deg en fiks ferdig stylet knapp.

Under følger et eksempel jeg har lånt fra deres egen dokumentasjon. Det første bildet viser en tradisjonell tankegang, mens det andre viser hvordan man kan oppnå det samme med tailwind. Legg spesielt merke til at du med tailwind unngår behovet for å navngi og koble alle de forskjellige nivåene i grensesnittet. Både i koden og mentalt naturligvis. Dette er det jeg mener med lenking frem og tilbake.

I første bildet ser vi et eksempel på tradisjonell tankegang, men det andre illustrerer hvordan du kan oppnå det samme ved å ta i bruk tailwind.

![Eksempel uten Tailwind](/innhold/tailwindcss-det-neste-logiske-steget/eksempel1.webp)

![Eksempel med Tailwind](/innhold/tailwindcss-det-neste-logiske-steget/eksempel2.webp)

## Utfordringer

De eneste ulempene med tailwind som jeg ser, er at det er enda en (liten) ting til å lære, og at det krever en liten smule oppsett. I 2017 ble det popularisert et nytt (for meg) uttrykk: «Javascript fatigue». Og om du hopper fra trend til trend er det nok et innslag av dette i CSS-verdenen også.

Tailwind er i utgangspunktet svært enkelt å sette opp. Når det er sagt så har jeg etter 4-5 suksessrike forsøk ikke klart det på første forsøk kun ved å følge guiden. Det har alltid vært behov for noe småjustering for å få det til å fungere. Dette ser heldigvis ut til å bli bedre, og sist gang var betydelig lettere enn første. Så, kanskje neste prosjekt går på første forsøk!

Utover det er det enkelte innvendinger og reaksjoner som er vanlige: Tailwind kan minne om inline styles, og kan ved første møte se svært rotete ut. Du tenker kanskje også at det etterhvert kan bli utfordrende å vedlikeholde. La oss se nærmere på disse påstandene.

## Meeeen, er ikke dette bare inline styles?

En vanlig innvending når man først hører om tailwind er at «er ikke dette bare inline styles»? Og i bunn og grunn er det en hel del sannhet til dette.

Men tailwinds hjelpeklasser tilbyr noen fordeler over vanlig inline kode. Klassene er langt mer konsise og treffer igjen et sweet spot der det kan bli noe mer massivt enn vanlige klassenavn, men fortsatt langt bedre enn hva inline styles med vanlig CSS ville vært. De største fordelene man får over vanlig CSS, er en raskere vei til responsivitet og enkel tilstandshåndtering. Du kan svært enkelt definere forskjellig design for de forskjellige brytepunktene. Du får også på liknende vis evnen til å definere egen funksjonalitet på hover og fokus, altså tilstandshåndtering.

Motivasjonen til å bruke Tailwind i stedet for de mer omfattende rammeverkene er kontroll og nærhet til CSS. Alle utviklere, og kanskje spesielt frontend-utviklere, står ofte overfor valget «hva skal jeg lære meg nå». Jeg har landet på en filosofi som i mange tilfeller har gitt klarhet: *når i tvil, fokuser på det mest eller nærmest det mest grunnleggende!* Dette mener jeg er et av hovedargumentene for tailwind kontra rammeverk som Bootstrap.

Tailwind – mener jeg – eksisterer i goldilocks-sonen mellom å få mektig drahjelp med CSS og å komme til skade for å lære enda et nytt rammeverk. Og et gitt rammeverk vet vi jo at kan ende opp med å være mer eller mindre utdatert om få år. Tailwind lar deg ha et mer eller mindre 1:1 forhold mellom koden din og CSS-en den representerer. Du vil derfor fortsette å lære om grunnleggende CSS ettersom du tar biblioteket mer og mer i bruk.

## Vedlikehold

Ok, du har hørt at tailwind er den nye hotte, freshe tingen å snuse litt på. Du har kanskje til og med tatt steget og prøvd det ut litt og du synes siden din blir fiffig og koden sexy. Men vedlikehold kan da umulig være noe særlig? Innen enhver knapp og sentrerte div er tilbakelagt, må jo koden være full av repetisjon og lange tungleste inline stylinger? Dette rammeverket må aldeles kun holde seg til hobbyprosjekter og hackatons der du har mindre tid enn vett – eller hva?

Nå beveger jeg meg over i noe ukjent land. Selv har jeg kun brukt tailwind i mindre prosjekter, men hører fra andre at det skal være fullt mulig – og til og med en fryd – å oppskalere. Et av essene i ermet er muligheten til å dra ut og gruppere repeterende kode. Dette kan gjøres for eksempel med en knapp eller andre elementer som er standard flere steder på siden. Her er det dog viktig å motstå fristelsen til å putte for mye i hver variabel. En av grunnpilarene i tailwind er at hver klasse skal gjøre så lite som mulig. Nettopp dette med oppskalering og kanskje til og med team er noe undertegnede selv håper å teste ut i tiden som kommer. Jeg er spent, og har troa!

## Syntax – kanskje det neste logiske steget

Når det kommer til syntax er det mange subjektive preferanser. En av innvendingene du kan få når du vil introdusere tailwind er at det ser stygt eller rotete ut. Dette er litt smak og behag. Vil du ha litt mer rot og sammenheklet kode i filene dine, eller vil du ha et mer rotete filsystem med med mer lenking? Etter å ha brukt tailwind en stund synes jeg nå prosjekter med .css- eller .sass-filer ser rotete ut, og vil helst slippe å ha en eneste CSS-fil. Det er nok mest en vanesak.

Selv vil jeg våge å gå så langt som å foreslå at tailwind representerer et logisk neste steg i fremgangen av utvikleropplevelsen. Prøv å følg meg her i et eksempel jeg liker: React har nå vært på tronen i mange år, og med React kom JSX. JSX var annerledes enn hva mange var vant til. I stedet for å ha mer eller mindre adskilt HTML og Javascript, introduserte man en måte å tenke på der man blandet markup og funksjonalitet i en og samme mølje. Mange synes dette var rotete, stygt og uhørt. Siden den gang har veldig mange blitt glad i den nye arbeidsflyten og vil overhodet ikke gå tilbake. Så med dette i tankene, hva representerer tailwind i det store bildet?

Når jeg tar et steg tilbake, ser jeg denne tankegangen som neste logiske steg på denne veien. Enten det ender opp med å være en utgave av CSS-In-JS, eller TailwindCSS. Vi gikk fra å skille ut HTML, CSS og Javascript i egne filer, til å kombinere HTML og Javascript, mens vi fremdeles skilte ut CSS-en. Med tailwind føler jeg endelig at det er naturlig å skrive markup, funksjonalitet og styling i en og samme flyt. Eureka!

## Test det selv!

Om du er nysgjerrig og vil teste det ut, anbefaler jeg å ta med deg en stylesheet-lenke over til *Codesandbox* og prøve litt. Dette er helt klart raskeste vei til å få litt grums under neglene og se det i aksjon!

Lenken finner du nederst i installasjonsguiden til tailwind under “Using Tailwind via CDN”: https://tailwindcss.com/docs/installation. I Codesandbox går du inn på et prosjekt og finner «External resources». Klikk utvid og legg inn lenken fra tailwind (kun adressen, uten HTML-tags etc.) og trykk på «Add resource». Du kan nå ta i bruk tailwind!

![CodeSandbox visning](/innhold/tailwindcss-det-neste-logiske-steget/codesandbox.webp)