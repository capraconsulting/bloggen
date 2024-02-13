---
title: 'Pipelines - mer enn bare CI/CD'
intro: 'De kan brukes til mye mer.'
description: 'De kan brukes til mye mer.'
pubDate: '2023.01.12'
author: 'Mina Farrokhnia'
heroImage: '/pipelines-mer-enn-bare-ci-cd/hero.webp'
tags: ['Sky']
---

De fleste av oss har med årene blitt godt kjent med bruk av automatisering for å understøtte smidig utvikling. Verktøyene som hjelper oss med dette blir stadig bedre, og enhver plattform med respekt for seg selv tilbyr nå sin egen løsning for automatisering. Ofte kaller vi bare dette for “pipelines”. Men disse verktøyene har en rekke andre bruksområder utover bygg, test og deployment.

Noen andre bruksområder for pipelines er:

- Deployment av både infrastruktur og applikasjon
- Backup
- Bygge dokumentasjon: dokumentasjon som kode f.eks via AsciiDoc/Antora
- Kjøre bots (Renovate): sender PR for nye versjoner, Vulnerability scanning

I denne artikkelen ser vi nærmere på en av disse bruksområdene, Backup, noe som er en kritisk del av vårt daglige arbeid i IT.

I eksempelet her, skal vi kjøre en daglig backup av DNS-soner ved å bruke CloudBuild som er en serverless CI/CD plattform i GCP(Google Cloud Platform) og noen andre ressurser. Vi har flere prosjekter som skiller hvert miljø. Under hvert prosjekt har vi Cloud DNS som inkluderer DNS-soner og DNS-records for hvert miljø. Oppgaven er å ta en daglig backup av alle DNS-soner og lagre dem på en Storage.

<figure>
  <img alt="Arkitektur diagram" src="/pipelines-mer-enn-bare-ci-cd/arkitektur.webp">
  <figcaption>Slik ser arkitekturen</figcaption>
</figure>

Ressursene som har blitt brukt inkluderer:

**Cloud Scheduler**: Å triggere  CloudBuild hver dag på et bestemt tidspunkt.

**CloudBuild trigger**: Å kjøre backup script på alle prosjekter og lagre det på en lagringsplass.

**CloudStorage**: Her bruker jeg to storage buckets:
1. Lagring av CloudBuild logger
2. Lagring av backup filer

**ServiceAccount**: Gi nødvendig tilgang til CloudBuild.

**Github repo**: Inneholder infrastruktur scripts og backup script.

**Bash script**: script som kjører backup process.

**Terraform**: Å implementere nødvendige ressurser på GCP.

**Atlantis**: For å kjøre terraform automatisk etter at en PR er opprettet.

Cloud-planleggingsjobben vil utløse CloudBuild. Når CloudBuild blir utløst, går den gjennom jobbene som er definert for den på en yaml-fil.

Jobben vil kalle bash-skriptet for å kjøre backupprosessen. Dette skriptet går gjennom hvert prosjekt, finner Cloud DNS , går gjennom hver DNS-sone og eksporterer DNS-records. Da lagres de i en mappe under Cloud Storage. CloudBuild bruker en ServiceAccount som gir tilgang til å lese Cloud DNS-data under prosjektene og også kunne skrive data på Cloud-lagringene.

Backupen vi har lagret kan bli brukt for disaster recovery i tilfelle CloudDNS går ned. Da kan vi restore DNS records fra storage fort eller så kan vi overføre DNSer til en annen konto. Vi behøver bare kjøre import kommandoen `gcloud dns record-sets import pathto.zonefile --zone-file-format --zone=examplezonename)`.

Koden finner du her: https://github.com/Mina69/gcp-dnszones-backup

Har du andre måter å bruke pipeline? Send gjerne en [e-post](mailto:mfa@capraconsulting.no) om du har spørsmål eller kommentarer.