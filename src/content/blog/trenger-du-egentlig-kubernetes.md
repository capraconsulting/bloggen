---
title: 'Et skråblikk på (kostnaden av) Kubernetes'
description: 'Trenger du egentlig Kubernetes? Erlend G. Ekern tror svaret kan være nei, og foreslår et alternativ: Cloud first.'
pubDate: '2024.03.27'
author: 'Erlend Ekern'
heroImage: '/src/assets/images/trenger-du-egentlig-kubernetes/hero.jpg'
tags: []
canonical: 'https://www.kode24.no/artikkel/jeg-mistenker-at-mange-velger-kubernetes-for-raskt-og-ukritisk/81161850'
---

_Denne artikkelen reflekterer mine erfaringer som konsulent i Capra, og ikke nødvendigvis selskapets holdninger generelt._

Kubernetes gir deg et standardisert grensesnitt for å kjøre arbeidslaster som [containere](https://en.wikipedia.org/wiki/Containerization_\(computing\)) på tvers av alt fra forskjellige skyleverandører og «on-premises» til [F-16 kampfly](https://www.cncf.io/blog/2020/05/07/with-kubernetes-the-u-s-department-of-defense-is-enabling-devsecops-on-f-16s-and-battleships/). Teknologien er basert på åpen kildekode med et tilhørende åpent, stort og modent økosystem for overvåkning, Continuous Integration (CI), Continuous Deployment (CD) og det meste annet man kan tenke seg. Gjennom dette kan man unngå å låse seg til spesifikke skyleverandører og proprietære tjenester og kan (i teorien) enkelt bytte leverandører hvis en av dem forsvinner eller man som kunde rett og slett er misfornøyd med retningen en leverandør beveger seg.

_“Dette høres jo tipp-topp ut! Er Kubernetes sølvkula vi har lett etter i alle disse år?”_ - Deg (kanskje)

**Hold your horses, cloud-native cowboy.** Kubernetes har sine styrker og bruksområder, og å satse tungt på dette er klart riktig for noen. Samtidig mener jeg det er en del risikoer og langsiktige andreordenseffekter man som organisasjon bør være klar over og eksplisitt ta stilling til før det blir Kubernetes for alle penga.


## Kubernetes gir deg portabilitet

… på bekostning av lavere nyttegrad av mulighetene i skyen.

Et av hovedargumentene for å satse tungt på Kubernetes er at proprietære skytjenester som Amazon Web Services (AWS) sin Elastic Container Service (ECS) er lite portable og kan være vanskelig å migrere bort fra. Det er en risiko å gjøre seg avhengig av noe proprietært, men fordelene dette gir bør eksplisitt veies opp mot ulempene. Bruk av forvaltede skytjenester flytter eksempelvis mye ansvar, kompleksitet og risiko over på en leverandør slik at man som kunde kan bevege seg raskere og fokusere mer på det som differensierer sin organisasjon.

Ved å bruke Kubernetes drar man hovedsakelig nytte av fellesnevneren på tvers av leverandører og går glipp av de mulighetene leverandørspesifikke tjenester som AWS Lambda kan gi deg, og den bedre integrasjonen disse tjenestene har med resten av økosystemet til en leverandør.

Til tross for portabilitet har Kubernetes som teknologi også en innlåsningseffekt - man blir låst til et paradigme som kan ha implikasjoner for både arkitektur og organisering. Man kan få tunnelsyn og forsøke å få alle løsninger til å passe inn i Kubernetes fremfor å bruke de riktige verktøyene for jobben.

**Hvis alt dreier seg om Kubernetes og utviklingsteamene i liten grad blir eksponert direkte for sky, så fratar man dem muligheten til å potensielt løse problemene sine på bedre og mer effektive måter.**

Hvis portabilitet er viktig fordi man ønsker å være forberedt på en potensiell fremtidig migrering til en annen skyleverandør, så bør man fra et økonomisk perspektiv først undersøke om kostnaden av å “helgardere” seg ved å bruke Kubernetes faktisk er lavere enn kostnaden av den hypotetiske migreringen (altså migreringskostnad x sannsynlighet for migrering). Bedriftsarkitekten [Gregor Hohpe](https://architectelevator.com/architecture/it-complexity/#gregors-law) har en liten tommelfingerregel som kan være relevant her:

_"\[O]ne of the key culprits \[behind complexity] is an organization’s inability to make meaningful decisions: everything has to be multi-platform, multi-cloud, portable, integrated with legacy systems, and customized for all possible options just in case. This major pitfall leads us to our final insight:_

_Gregor’s Law: Excessive complexity is nature’s punishment for organizations that are unable to make decisions."_


## Kubernetes gir deg fleksibilitet

… på bekostning av økt ansvar, kompleksitet og risiko.

Å standardisere rundt Kubernetes i en organisasjon koster mye i tid under både etablering og forvaltning og drift. Denne tiden er (heldigvis for oss som lønnstakere) ikke gratis og koster mye i rene lønnsutgifter og har dermed en høy alternativkostnad ved at man binder opp ansatte som potensielt kunne brukt tiden sin på noe mer verdiskapende.

**Å komme i gang med Kubernetes er relativt lett, men å gjøre det riktig og forvalte det (og den nødvendige kompetansen!) godt over tid er vanskelig - man trenger typisk fulltidseksperter eller plattformteam som påtar seg driftsansvar for Kubernetes-klustre og relaterte fellesverktøy i organisasjonen for å avlaste utviklingsteamene.**

Man må kontinuerlig sørge for at denne plattformen er oppdatert, sikker og robust, og at utviklingsteamene ikke blir negativt påvirket av endringer som gjøres. Sprengningsradiusen er ofte stor og man får et internt team i kritisk linje for andre utviklingsteam, og over tid kan dette føre til en uklar ansvarsmodell og at man glir tilbake til de funksjonelle siloene ("Dev" og "Ops") man har prøvd å bevege seg bort fra.

![Isberg hvor man ser kompleksitet under overflaten](../../assets/images/trenger-du-egentlig-kubernetes/isberg.png)

_Kompleksitet lurer under overflaten …_

Selv med bruk av tjenester som Amazon Elastic Kubernetes Service (EKS) og Google Kubernetes Engine (GKE) påtar man seg som organisasjon et stort operasjonelt ansvar til gjengjeld for fleksibiliteten man får fra Kubernetes og tilhørende økosystem.

**Man bør stille seg spørsmålet om man virkelig har sterke forretningsbehov for denne fleksibiliteten. Kan man heller bruke forvaltede skytjenester som Amazon ECS som er mindre fleksible, men som til gjengjeld er enklere å bruke, dekker de fleste behov og skyver mer ansvar og kompleksitet over på skyleverandøren? En såkalt "80%-løsning".**


## Avsluttende tanker

Så… Bør man satse på Kubernetes eller ikke? Som det meste i IT-verdenen er svaret “det kommer an på”. Hvor er du i dag, og hvor vil du være? Hvilke rammer og lovverk må organisasjonen din forholde seg til?

Det er mye bra med Kubernetes og økosystemet, og de som vet at de trenger det har nok gjort klokt i å velge det. Dessverre tror jeg denne gruppen utgjør en liten minoritet av brukerne, og jeg mistenker at mange har hoppet på Kubernetes-hesten litt for raskt og ukritisk uten å tenke på totalkostnad over tid og alternativkostnader. Det er mulig fremtiden bringer med seg bedre standardisering på tvers av skyleverandører (se for eksempel [OpenTelemetry](https://opentelemetry.io/docs/)) samtidig som man kan bruke skyen for det den er verdt og unngå å påta seg et unødvendig stort operasjonelt ansvar, men slik er ikke situasjonen med Kubernetes i dag.

For å ikke bare slenge rundt brannfakler vil jeg dele en alternativ og mer lettvektig tilnærming jeg har sett fungere bra ute hos forskjellige kunder de siste årene:

**Autonome utviklingsteam med en en “cloud-first”-tilnærming, ansvar for hele livssyklusen til løsningene de lager og støtten de trenger for å påta seg dette ansvaret.**

- De velger hvordan løsningene sine skal implementeres, og drar nytte av forvaltede skytjenester som AWS Lambda og AWS Fargate for å bevege seg raskere og tryggere med mindre kompleksitet i bagasjen.

- Hvis det mot formodning brenner i deres produksjonsmiljø har de kompetansen og tilgangene til å feilsøke og håndtere dette uten å måtte gå via noen andre.

- De kan få støtte gjennom en tynn utviklerplattform (en “[Thinnest Viable Platform](https://teamtopologies.com/key-concepts-content/what-is-a-thinnest-viable-platform-tvp)” i Team Topologies-lingo) som gjør det enklere for dem å arbeide mot sky samtidig som de er i stand til å innovere på toppen, og utvide og divergere når de må. En slik plattform kan i sin enkleste form bestå av eksperter på sky som deler kompetanse, erfaringer og praksiser med utviklingsteam og gir dem gode mentale modeller for å jobbe mot sky. Etterhvert kan plattformen utvides med selvbetjente verktøy, tjenester og byggeklosser som dekker de viktigste behovene på en god nok måte.

En liten oppsummerende anbefaling helt til slutt: før man tar store veivalg i en IT-organisasjon, vær villig til å gi slipp på noe kontroll, og tenk mindre på hvor man er i dag og teknologi, og mer på hvilken retning man ønsker å bevege seg, total- og alternativkostnader og hvordan valgene påvirker autonomi og ansvar i organisasjonen.
