---
title: 'Oppgradere AKS via Azure Function'
intro: 'En kort introduksjon til bruk av Azure Functions for automatisk oppgradering av Azure Kubernetes Service.'
description: 'En kort introduksjon til bruk av Azure Functions for automatisk oppgradering av Azure Kubernetes Service'
pubDate: '2022.02.21'
author: Mina Farrokhnia
heroImage: '/src/assets/images/oppgradere-aks-via-azure-function/hero.webp'
tags: ['Azure', 'Python']
---

Alle som driver med drift innen IT, vet hvor viktig det er med automatisering av prosesser. Oppgradering av Kubernetes er et eksempel på en tilbakevendende oppgave som kan ta opp mye tid. For hver ny versjon skal oppgraderingene gjøres i en bestemt rekkefølge: først utvikler-miljøet, deretter diverse testmiljøer, osv. Til sist skal produksjonsmiljøet oppgraderes, gjerne etter en vilkårlig utsettelsesperiode.

Kubernetes på Azure (AKS) er en kritisk del av infrastruktur til Entur AS. De har flere miljøer fordelt over ulike AKS clusters. Nettopp derfor trengte de en løsning for å automatisere kubernetes oppgradering på miljøer. Automatiseringen sørger for at oppgraderingene ikke bare blir gjort på riktig tidspunkt, men også uten sjansen for menneskelig feil.

Det skal nevnes at Azure tilbyr Upgrade-Channel og maintenance windows for automatisk oppgradering av Azure Kubernetes Services(AKS), men problemet med det er at vi ikke kan styre rekkefølgen på oppgradering av miljøer. Med det kan vi risikere at prod-miljø oppgraderes før dev og test, noe vi ikke ønsker. Derfor implementerte jeg egen løsning for det. Min løsning tar hensyn til blant annet avhengigheten på rekkefølge mellom miljøene, samt krav om oppgradering på spesifikke ukedager og tidspunkter.

## Azure Functions

Azure Functions er Microsoft sin løsning for serverless i Azure. Funksjonene kjører gjennom Function App-ressurser, og støtter mange programmeringsspråk, bla. Python.

Noe som kjennetegner serverless er at applikasjonene kjøres opp kun når det er behov for det, og har typisk en kjøretid på et tidsrom målt i millisekunder. For å skrive funksjoner som opererer med tilstand (“state”) i et serverless miljø, introduserte Azure durable functions som en utvidelse av Azure Functions. Med dette kan du definere arbeidsflyter som beholder en intern tilstand ved gjennom orchestrator functions - kode som beskriver hvordan funksjonene utføres og i hvilken rekkefølge den skal eksekveres.

Man kan bruke durable functions til å understøtte flere ulike typer designmønstre. I mitt tilfelle ønsker jeg å bruke function chaining, dvs. å utføre en sekvens av funksjoner i en bestemt rekkefølge: Output fra én funksjon kan brukes som input til en annen funksjon hvis det er behov.

En grunnleggende Durable Function inneholder:

- Orchestrator function: Holder styr på arbeidsflyten ved å orkestrere andre funksjoner.
- Activity function: Utfører arbeid, og returnerer eventuelt et resultat. Disse kalles opp av orchestrator function.
- Client function: En vanlig Azure function som starter en orchestrator function. Dette er “inngangsdøren” til hele arbeidsflyten.

## Implementasjon

Jeg har laget følgende Function App i Azure via terraform, som vi skal gå gjennom:

![Terraform kode](/src/assets/images/oppgradere-aks-via-azure-function/terraform.webp)

For å skrive durable function har jeg valgt Python som programming språk. Som IDE bruker jeg Visual Studio Code. Det har god støtte for Azure Functions gjennom Microsoft sin utvidelse for Azure Functions. Azure-dokumentasjonen har gode eksempler slik at du kan komme i gang raskt med å lage din første funksjon.

Som client function, har jeg brukt en timer trigger. Den tar cron expression (et uttrykk som angir en tidsplan) som input og kaller opp orchestrator function på spesifikke tidspunkter.

Orchestrator function, som er ansvarlig for å sette i gang oppgradering av AKS basert hvilken uke dag er, sender miljønavn som input til en activity function. Denneutfører så oppgradering på det angitte miljøet basert på input som den får. Den går først gjennom subscriptions og resource groups basert på miljønavn, og gjør så oppgradering på AKS i henhold til den siste tilgjengelige stabile versjonen.

For eksempel, hvis det er mandag i dag, så settes det i gang en activity function med en “sandbox” som input. Denne oppgraderer så AKS for sandkassemiljøet. Tirsdagen sendes det en forespørsel for oppgradering av utviklermiljøet, osv.

For å understøtte kravet om at vi ikke oppgraderer produksjonsmiljøet til en versjon som ikke har blitt testet først, har jeg laget to litt ulike activity functions. Den første gjør oppgradering basert på den nyeste stabile versjonen som er tilgjengelig fra Azure, og lagrer senere denne versjonen til en Azure Storage Table. Den andre funksjonen henter ut denne versjonen og oppgraderer andre miljøer. Slik sikrer vi at alle versjoner først rulles ut i testmiljøet, og ikke minst at alle miljøene havner på samme versjon.

## Oppsummering

Det er viktig å holde programvare oppdatert, både for å motta sikkerhetsoppdateringer og for å få ny funksjonalitet. Azure Function app er en enkel og kostnadseffektiv tjeneste som kan hjelpe deg med å automatisere prosesser. Nå har du lært hvordan du kan bruke det for å automatisere oppgradering av AKS.

Her kan du finne kildekoden: [Mina69/AKSAutoUpgrade (github.com)](https://github.com/Mina69/AKSAutoUpgrade)