---
title: 'Bokanmeldelse: Tre bøker innen team-, prosjekt- og utviklingsledelse'
intro: 'Korte oppsummeringer av tre favoritter boksirkelen i Capra har vært gjennom siste året. Dette er tre bøker vi setter enormt pris på både i vår daglige drift og ute hos våre kunder; vi påstår at dette er bøker med høy relevans for alle som jobber med IT.'
description: 'Gustav Dyngeseth fra Capra Consulting omtaler tre bøker innen TPU. Les dem her >>'
pubDate: '2021.12.10'
author: Gustav Dyngeseth
heroImage: '/innhold/bokanmeldelse-tre-boker-innen-team-prosjekt-og-utviklingsledelse/hero.webp'
tags: ['TPU', 'Bokanmeldelse', 'Prosjektledelse']
---

I Capra elsker vi faglitteratur. Vi verdsetter å dele kunnskap med hverandre, kunnskap basert på vitenskap kombinert med relevante erfaringer, og et hofteskudd i ny og ne. Derfor har vi en boksirkel som muliggjør kombinasjonen av alle disse faktorene i en uformell setting. Boksirkelen foregår månedlig, og involverer fagpersoner med ulike bakgrunner. Det er en super arena for å dele erfaringer og drøfte nye tanker fra moderne faglitteratur innen team-, prosjekt- og utviklingsledelse. Nedenfor er en kort oppsummering av tre favoritter vi har vært gjennom siste året.

## Accelerate

Denne boken gir deg sterke argumenter for hvorfor DevOps og smidig utviklingsmetodikk er forutsetninger for høypresterende utviklingsteam. Accelerate er basert på forskning, og gir deg en faglig tyngde i din søken etter å bygge selskaper og team som leverer på høyt nivå.

Accelerate påpeker at å måle Software Delivery Performance (SDP) med antall linjer kode, fart eller utnyttelse av ressurser er en dårlig idé. Helt konkret beviser boken en heller direkte sammenheng mellom SDP for et utviklingsteam og tre målbare metrikker: (1) delivery lead time, (2) deployment frequency og (3) time to restore.

1. Å måle ledetiden for endringer gir oss informasjon om teamets evne til å hurtig samle tilbakemeldinger på det de bygger og å tilpasse løsningen deretter raskere. Denne metrikken blir ofte målt som tiden det tar å gå fra kode committed til den kjører i produksjon.

2. Generelt er å redusere batch size et sentralt element i Lean: (i) det reduserer syklustiden og variansen i flyten, (ii) akselerer tilbakemeldinger, (iii) reduserer risiko og overhead, (iv) forbedrer effektivitet, (v) øker motivasjonen og følelsen av at noe haster, og (vi) reduserer kostnader og tilrettelegger vekst. Batch size er utfordrende å måle og kommunisere ettersom kode ikke har en umiddelbar synlig størrelse. Derfor kan det være lurt å måle deployment frequency som en stedfortreder for batch size, siden det er enklere å måle og har lav variasjon. Med deployment frequency mener boken hvor ofte organisasjonen deployer kode til produksjon.

3. Ved å måle mean time to restore får vi oversikt over hvor raskt tjenestene våre gjenopprettes ved eventuelle feil. I moderne programvareprodukter- og tjenester, som er komplekse systemer under endring, er feil uungåelig, så en nøkkelmetrikk blir dermed: hvor fort kan tjenesten vår gjenopprettes?

Det nevnes en fjerde metrikk (i tillegg til de tre nevnte) i Accelerate som det ikke er bevist at har direkte sammenheng med SDP, men som det kan være fornuftig å vurdere allikevel. Det er change fail rate (i prosent). For å måle change fail rate kan man spørre teamet følgende: For tjenesten dere jobber på, hvor stor prosentandel av endringene i produksjon resulterer i nedetid og dermed krever utbedring i etterkant? Essensen i denne målingen er å få teamet til å være klar over at å agere på feil så tidlig som mulig, og å hente informasjon fra feil for å forbedre fremtidig arbeidsflyt, kan være en suksessfaktor.

Videre beviser Accelerate at SDP også har direkte sammenheng med (A) Continuous Delivery og (B) Culture:

A. Continuous Delivery (CD) er definert som et sett med kapabiliteter som åpner for å få alle slags endringer - features, konfigurasjonsendringer, eksperimenter, bug fixes - i produksjon eller i hånden til sluttbrukeren trygt, raskt, og bærekraftig. I boken måles CD ved å vurdere teamets evne på følgende områder:

1. Teamet kan deploye til produksjon (eller til sluttbrukeren) on-demand, gjennom hele syklusen av programvareleveransen.
2. Kjapp tilbakemelding på kvaliteten og distribuerbarheten til systemet er tilgjengelig for alle i teamet, og medlemmene vurderer det som høyeste prioritet å agere på disse tilbakemeldingene.

B. Kulturen til et selskap forutser SDP og suksessen til selskapet som en helhet. I boken påpeker forfatterne tre typer kulturer, den såkalte “Westrum”-topologien:

1. Patologisk (makt-orientert)
2. Byråkratisk (regel-orientert)
3. Generativ (ytelses-orientert)

Boken påpeker at et selskap burde etterstrebe en generativ kultur; et generativt team har høy samarbeidsvilje og fordeler ikke skyld når feil oppstår. Boken refererer til Google’s forskning “The five keys to successful Google team” som lyder lignende: “Hvem som er med på teamet betyr mindre enn hvordan teamet interagerer, strukturerer arbeidet sitt, og anser sine bidrag”. Videre bemerkes viktigheten av psykologisk trygghet for å kunne skape en generativ kultur.

Hovedpremisset bak Accelerate er at elite software delivery performance gjør det dobbelt så sannsynlig at organisasjonen som en helhet presterer på et høyt nivå. Helt konkret vil selskaper som leverer programvare på et høyt (raskt) nivå ha to ganger så stor sannsynlighet for å nå målene sine innenfor (i) lønnsomhet, (ii) produktivitet, (iii) markedsandeler og (iv) antall kunder. Oppsummert gir Accelerate oss en rekke forskningsbaserte argumenter for hva som må på plass for å kunne øke software delivery performance for et team. En “must-read”, rett og slett!

## The Five Dysfunctions of a Team

Denne boken er skrevet av Patrick Lencioni og ansees som en ledende veileder verden rundt for hvordan man kan bygge sunne team med høy ytelse. Den tar for seg fem komponenter (dysfunksjoner) som må håndteres. De presenteres i en slags sammenhengende behovspyramide hvor nederste nivå må på håndteres for å kunne unngå dysfunksjonene i nivåene oppover i pyramiden. Dysfunksjonene (fra nederst til øverst i pyramiden) er: (1 - nederst) fravær av tillit, (2) frykt for konflikt, (3) mangel på engasjement, (4) unngåelse av ansvarlighet, og (5 - øverst) uoppmerksomhet på resultater.

1. Fraværet av tillit er det mest fellende kjennetegnet ved dysfunksjonelle team. Er ikke tilliten på plass finner vi ofte også de fire andre dysfunksjonene i et team. Frykten for å være sårbar hemmer team-medlemmene i å bygge tillit seg i mellom. Denne metrikken omhandler bl.a. i hvor stor grad team-medlemmer tør å (i)innrømme feil, (ii) erkjenner sine svakheter til hverandre, (iii) spør om hjelp uten å nøle, (iv) spør hverandre om input angående deres egne ansvarsområder, (v) unnskylder seg overfor hverandre, (vi) er ubevoktet og genuine med hverandre, og (vii) hvor komfortabel medlemmer er med å diskutere privatlivet sitt med seg i mellom.

2. Frykt for konflikt er noe de aller fleste kan kjenne seg igjen i. Lysten etter å bevare harmoni kveler produktive konflikter innad i teamet. Denne frykten kan bl.a. avdekkes ved å tenke over (i) i hvor stor grad medlemmer i teamet gir uttrykk for sine meninger til tross for risikoen for å skape uenighet, (ii) om medlemmene er engasjerte og ubevoktet i deres diskusjoner, (iii) om de viktigste og vanskeligste problemene diskuteres, (iv) om medlemmer kommuniserer upopulære meninger til teamet, (v) når en konflikt oppstår håndterer teamet den med det samme før de beveger seg videre til neste tema og (vi) medlemmene ber om hverandres meninger i møter.

3. Mangel på engasjement er ofte et resultat av mangel på klarhet og/eller buy-in som hindrer teamets medlemmer fra å ta avgjørelser de holder seg fast til. Graden av engasjement kan tolkes som i hvor stor grad medlemmer (i) forlater møter trygge på at alle blir med på løsningen teamet ble enige om å forplikte seg til, (ii) ender diskusjoner med klare og spesifikke resolusjoner og aksjonspunkter, (iii) er klare angående sin retning og prioriteringer, (iv) teamet er alignet rundt sine felles mål, (vi) forholder seg til og støtter avgjørelser også når de initielt var uenige og (vii) tar valg selv om perfekt informasjon ikke alltid er tilgjengelig.

4. Om teamet unngår å ansvarliggjøre hverandre er dette ofte et resultat av et behov for å unngå mellommenneskelig ubehag. Et slikt ubehag hindrer medlemmer fra å holde hverandre ansvarlig for deres handlinger og prestasjoner. I hvor stor grad et team ansvarliggjør hverandre internt kan bla. utledes ved å måle hvor ofte medlemmer (i) påpeker hverandres uproduktive adferd, (ii) er raske med å konfrontere medarbeidere om problemer innenfor deres respektive ansvarsområder, (iii) stiller spørsmål ved nåværende fremgangsmåter og metoder, (iv) konsistent følger opp lovnader og forpliktelser og (v) tilbyr uprovoserte, konstruktive tilbakemeldinger til hverandre.

5. Å være oppmerksom på resultater er mer krevende enn de fleste tror. Jakten på individuelle mål og personlig status kan fort tære på teamets fokus på kollektiv suksess. I hvor stor grad et team klarer å være oppmerksom nok på resultater kan bla. måles ved å undersøke hvor ofte medlemmer (i) kjapt påpeker andre sine bidrag og prestasjoner, (ii) om teamet har et rykte på seg for å prestere godt, (iii) hvor ofte hvert enkelt team medlem tar ansvar for å bedre prestasjonene til teamet når de mislykkes med å nå kollektive mål, (iv) hvor ofte medlemmer er villig til å gjøre ofre innenfor deres eget område for teamets beste, (v)hvor ofte teamet verdsetter kollektiv suksess fremfor individuelle prestasjoner og (vi) hvor ofte medlemmer plasserer lite viktighet i titler og status.

![Pyramide for team faktorer som gir sukksess](/innhold/bokanmeldelse-tre-boker-innen-team-prosjekt-og-utviklingsledelse/team.webp)

> Bilde hentet fra boken [The Five Dysfunctions of a Team](https://www.tablegroup.com/product/dysfunctions/) av Patrick Lencioni.

## Radical Candor

Radical Candor (radikal åpenhet) er en rettferdig, dypt menneskelig måte å administrere menneskene som jobber for deg og støtte dem gjennom personlige og profesjonelle problemer eller utfordringer. Det er to viktige komponenter i Radical Candor: (1) care personally eller på norsk "å bry seg personlig" og (2) Challenge Directly, på norsk "utfordre direkte".

![Radical candor akse](/innhold/bokanmeldelse-tre-boker-innen-team-prosjekt-og-utviklingsledelse/radical.webp)

> Bilde hentet fra boken [Radical Candor](https://www.radicalcandor.com/) av Kim Scott

1. Å bry seg personlig betyr å bry seg om hvem de ansatte er på et menneskelig plan, utover deres arbeidsutbytte. Dette krever å bli kjent med hvert teammedlems motivasjoner og ambisjoner, samt å lære "hele mennesket" - altså deres liv og interesser utenfor arbeidet som kan påvirke deres behov på jobben. Å vise at du bryr deg personlig om dine ansatte eller kolleger bygger naturlig nok tillitsfulle relasjoner. Når en ansatt føler at du fokuserer på det som er best for vedkommende, er det mer sannsynlig at han eller hun vil engasjere seg i tilbakemeldingene dine, stole på beslutningene dine og være ærlig mot deg - og i sin tur vil du føle at du kan stole på og være ærlig mot vedkommende.

2. Å utfordre direkte gjør deg nødt til å ta tøffe samtaler med dine ansatte, for eksempel i å gi konstruktiv kritikk eller diskutere ytelse og prestasjonsnivå. Disse viktige samtalene gir den ansatte muligheten til å forbedre seg, hjelper deg med å unngå flere problemer og tøffe samtaler på lang sikt, og det bidrar til å bygge tillit - å være direkte og presse de ansatte til sitt fulle potensiale, viser at du bryr deg om dem.

Oppsummert hevder forfatteren at for å være en god sjef, må du bry deg personlig samtidig som du utfordrer direkte. Når du utfordrer uten “å bry deg” kalles det obnoxious aggression og når du bryr deg uten “å utfordre direkte” kalles det ruinous empathy. Når du gjør hverken eller er det manipulative insincerity. Vi burde altså etterstrebe relasjoner hvor vi klarer å holde oss i den 1. kvadranten så langt det lar seg gjøre; når vi både utfordrer direkte og bryr oss personlig om våre kolleger og ansatte.