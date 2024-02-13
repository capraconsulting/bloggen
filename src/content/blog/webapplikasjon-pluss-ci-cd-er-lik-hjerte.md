---
title: 'Webapplikasjon + CI/CD = ❤'
intro: 'Er du lei av å gå gjennom en haug av manuelle steg for å få en kodeendring ut i produksjonsmiljøet ditt? Har du endt opp med en ikke-fungerende webapplikasjon fordi du glemte å kjøre testene dine?? Har disse problemene begynt å gå utover nattesøvnen din???'
description: 'I denne artikkelen gir vi en liten intro til kjerneprinsipper innen DevOps, CI/CD og AWS. Er du nysgjerrig? Les mer her >>'
pubDate: '2020.03.06'
author: Erlend Ekern og Stian Steinbakken
heroImage: '/webapplikasjon-pluss-ci-cd-er-lik-hjerte/hero.webp'
---

***Fortvil ikke!** I dag skal vi vise deg hvordan du kan automatisere alt som skjer fra «commit» på GitHub, frem til kodeendringen er blitt kvalitetskontrollert, gjort produksjonsklar og sendt ut til produksjonsmiljø og sluttbrukere 🧙!*

Vi var nylig en liten tur i Trondheim og holdt et kurs for studenter ved linjeforeningene Abakus og Online på NTNU. Tema for kurset var buzzwords som «**DevOps**», «Continuous Integration & Continuous Deployment» (**CI/CD**) og hvordan dette kan gjøres i praksis ved å bruke Amazon Web Services (**AWS**).

Vi synes jo dette er ganske nyttige og interessante temaer, så hvorfor ikke dele det med så mange som mulig? I denne artikkelen skal vi derfor gi en liten intro til kjerneprinsipper innen DevOps, CI/CD og AWS, og deretter gå gjennom et praktisk eksempel for hvordan du enkelt kan sette opp en såkalt «CI/CD-pipeline» for en frontend-applikasjon ved hjelp av «Infrastructure as Code» (IaC) og skyløsninger i AWS.

I Capra er vi glad i AWS, og som vår foretrukne skyplattform var det jaggu naturlig å benytte oss av denne i både det overnevnte kurset og artikkelen du skummer over akkurat nå. Det er dog mulig å få satt opp lignende løsninger i de andre store skyplattformene (Azure, Google Cloud Platform, …) hvis man skulle ønske det.

**All kode vi skal gå gjennom i dag ligger tilgjengelig på GitHub:
https://github.com/capraconsulting/aws-cloudformation-pipeline**

Sååå, *without further ado*, her er hva som står på dagens agenda 👇

* [Ei litta intro til DevOps, CI/CD og IaC](#ei-litta-intro-til-devops-cicd-og-iac)
* [Praktisk eksempel](#praktisk-eksempel)
  * [Steg 0 – Hva som skal lages, og hva du trenger fra før av](#steg-0--hva-som-skal-lages-og-hva-du-trenger-fra-før-av)
  * [Steg 1 – Opprette IaC-fil](#steg-1--opprette-iac-fil)
    * [Definere metainformasjon](#definere-metainformasjon)
    * [S3-bøtter](#s3-bøtter)
    * [GitHub-integrasjon](#github-integrasjon)
    * [CodeBuild-prosjekt](#codebuild-prosjekt)
    * [CodePipeline](#codepipeline)
    * [Roller og rettigheter](#roller-og-rettigheter)
  * [Steg 2 – Definere byggesteget](#steg-2--definere-byggesteget)
  * [Steg 3 – Sette det hele sammen](#steg-3--sette-det-hele-sammen)
* [Så, hva har vi lært?](#så-hva-har-vi-lært)

## Ei litta intro til DevOps, CI/CD og IaC

DevOps er et noe flytende begrep, og mange opererer med ulike definisjoner av hva det innebærer. I stor grad handler DevOps om å få to tradisjonelt isolerte grupper, utviklere («Development») og driftere («Operations»), til å samarbeide og kommunisere bedre, og jobbe sammen mot et felles mål: få ut hyppige kodeendringer til sluttbrukere på en effektiv, stabil og sikker måte. I praksis innebærer dette ofte å bygge en IT-kultur rundt samarbeid, automatisering, hyppige og små kodeendringer og delt eierskap.

Det er mange prinsipper som inngår i DevOps, men i praksis er det spesielt tre utviklingspraksiser og konsepter som muliggjør mye av DevOps-filosofien:

1. **Continuous Integration (CI)**  
Continuous Integration går ut på å hyppig integrere koden sin inn i «mainline» (ofte «master»-branchen din på GitHub), og automatisk bygge og teste koden så fort endringer er gjort. Å integrere koden oftere skal gjøre at du raskt oppdager og kan rette opp i feil. Hyppig integrering gjør også at ingen beveger seg for langt fra mainline slik at det ikke tar for lang tid å integrere inn igjen. På denne måten unngår du konflikter, og reduserer omfanget av avhengigheter mellom utviklere.
2. **Continuous Deployment (CD)**  
Continuous Deployment går ut på at kode som har bestått alle tester og andre kvalitetskontroller automatisk går ut til et produksjonsmiljø helt uten menneskelig interaksjon. Kombinert med Continuous Integration blir dette ofte kalt CI/CD.
3. **Infrastructure as Code (IaC)**  
Infrastructure as Code baserer seg på å definere den underliggende infrastrukturen til et system eller en applikasjon i «template»-filer (typisk YAML- eller JSON-filer). Dette gjør det mulig å ha versjonkontroll på infrastrukturen til applikasjonen, samt åpner dørene for å automatisk opprette, oppdatere og slette infrastruktur.

## Praktisk eksempel

Nå som vi har fått etablert litt kontekst, la oss ta deg med på en reise til den store sky for en aldri så liten CI/CD-fiesta. Ved hjelp av kun 4 (*fire, four, cuatro!!!*) enkle steg skal vi gå gjennom et konkret eksempel på hvordan du kan få en enkel statisk nettside ut på nett ved hjelp av AWS, IaC og CI/CD.

### Steg 0 – Hva som skal lages, og hva du trenger fra før av

I dette praktiske eksempelet skal vi bygge applikasjonen vist i figuren under:
![Oversikt](/webapplikasjon-pluss-ci-cd-er-lik-hjerte/overview.webp)

Det vi ønsker å sitte igjen med til slutt er en «pipeline» bygget opp av de følgende stegene:

1. Vi sjekker koden vår inn i en master-branch på GitHub.
2. AWS CodePipeline henter ut koden og gjør den **automatisk** produksjonsklar ved bruk av AWS CodeBuild.
3. Dersom koden går gjennom alle steg for kvalitetsikring, legges koden ut i produksjonsmiljøet i AWS S3, hvor den så vil være tilgjengelig for sluttbrukerne. Alt dette **automatisk**.

(… nevnte vi at alt dette skal være **automatisk**? 🤔)

Det kreves ikke mye for å komme i gang, du trenger kun:

* en GitHub-konto  
(registrer deg her: https://github.com/join)
* en AWS-konto  
(registrer deg her: https://portal.aws.amazon.com/billing/signup#/start)
* … og (litt) tid ⌚

AWS har en egen «free tier» som gjør at du slipper å bruke penger på flere av deres tjenester (én gratis CodePipeline, 100 minutter med CodeBuild-prosjekter og 5 GB gratis lagring i S3 for å nevne et par relevante). Mer informasjon finner du [her](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc), men for å sette det litt i perspektiv: under CI/CD-kurset vi hadde i januar satte vi opp 80 (!) pipelines i tillegg til en hel del ekstra ressurser, og i løpet av et par timer kostet alt dette ikke noe mer enn 70 NOK. Det er altså ikke snakk om store utgifter hvis du skulle ende opp med å gå litt utover gratistilbudet.

Vi skal i hovedsak benytte oss av fire AWS-tjenester, så her følger en lynrask introduksjon av hver av dem:

* **AWS CloudFormation**  
CloudFormation er AWS-tjenesten du ofte bruker for Infrastructure as Code. I CloudFormation skriver du eksplisitt hvilke ressurser du ønsker å opprette, hvordan disse skal interagere, hvilke tilganger de skal ha, og alt annet som følger med opprettelse av infrastruktur i skyen.
* **AWS Simple Storage Service (S3)**  
S3 er en populær filagringstjeneste ofte brukt for mediafiler, loggfiler og statiske nettsider (HTML, CSS og JS). Du bruker S3 ved å opprette en mappe (også kalt en «bøtte») som du så kan lagre filer i.
* **AWS CodePipeline**  
AWS CodePipeline er en tjeneste som tilbyr enkelt oppsett av pipelines for å raskt og automatisk kunne oppdatere applikasjonen og infrastrukturen din.
* **AWS CodeBuild**  
AWS CodeBuild er en tjeneste for Continuous Integration som kompilerer kode og kjører tester for deg, og produserer programvarepakker (også kalt artifakter) som er klare for produksjonsetting.

I de neste stegene velger du selv om du ønsker å opprette et GitHub-repository selv, gjenbruke noe frontend-kode du har fra før av eller «forke» og ta utgangspunkt i [det ferdige repoet som vi linket til over](https://github.com/capraconsulting/aws-cloudformation-pipeline). Du bør uansett ta en titt på den endelige template-fila, [template.yml](https://github.com/capraconsulting/aws-cloudformation-pipeline/blob/master/template.yml), da vi i artikkelen utelater noen repetitive og mindre viktige seksjoner.

### Steg 1 – Opprette IaC-fil

Når du bruker CloudFormation oppretter du en såkalt «stack». Du kan se på stacken som en spesifikk instans av template-filen. Hvis for eksempel ønsker å slette alt av ressurser som har blitt opprettet ved bruk av en gitt template-fil, kan du enkelt og greit slette den respektive CloudFormation-stacken istedenfor å manuelt lete deg gjennom AWS sine nettsider etter S3-bøtter, CodeBuild-prosjekter, roller, «policies» og så videre som du ønsker å slette.

Koden i CloudFormation skrives enten i YAML- eller JSON-filer, og i dette eksempelet har vi valgt å benytte oss av YAML.

#### Definere metainformasjon

Første steg er å åpne en ny fil `template.yml`, og definere litt metainformasjon om selve filen:

```yml
# template.yml

AWSTemplateFormatVersion: 2010-09-09
Description: >-
  Creates an CodePipeline which builds a static webpage from a GitHub repository, and uploads the static files to an S3 bucket
```

Da AWS i ny og ne oppdaterer formatet de forventer på infrastrukturfilene, må du i hver slik fil eksplisitt nevne hvilken versjon du bruker. Per idag er versjon `2010-09-09` både nyeste og eneste versjon du kan spesifisere.

Videre må vi definere et par parametere som er nødvendige for at AWS skal kunne kommunisere med GitHub:

```yml
# template.yml

# { ... utelatt kode ... }

# Her setter du opp hvilke parametere du ønsker å sende inn
# til template-filen før en CloudFormation-stack opprettes
Parameters:
  GitHubOAuthToken:
    Type: String
    NoEcho: true # Maskerer tokenet ditt med ***
    MinLength: 40
    MaxLength: 40
    AllowedPattern: '[a-z0-9]*'
    Description: The OAuth token used to connect to GitHub
  GitHubOwner:
    Type: String
    AllowedPattern: '[A-Za-z0-9_-]+'
    Description: The owner of the GitHub repository
  GitHubRepo:
    Type: String
    Description: The name of the GitHub repository
  GitHubBranch:
    Type: String
    Default: master
    AllowedPattern: '[A-Za-z0-9_/-]+'
    Description: The name of the GitHub repository branch that should trigger the pipeline
```

For at pipelinen vi senere skal sette opp skal få med seg endringer i ditt GitHub-repository, trenger den først og fremst en nøkkel – et GitHub OAuth token. Denne nøkkelen gir AWS tilgang til å lese data fra repository-et ditt. Ved å følge [denne guiden](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) på GitHub sine nettsider kan du generere ditt eget GitHub OAuth token med bare et par klikk. Du trenger kun å huke av for tilgang til `repo` og `admin:repo_hook`. Behandle denne nøkkelen som sensitiv data da den gir tilgang til repository-ene på GitHub-kontoen din.

I tillegg må infrastrukturfilen inneholde informasjon om repository-et du ønsker å knytte pipelinen opp mot. De nødvendige feltene her er brukernavn til eier av og navn på repository-et, og navn på branch-en som pipelinen skal lytte på. Vi har mulighet til å hardkode alt dette inn i filen vår, men for å gjøre malen gjenbrukbar – og enklere å vedlikeholde – setter vi opp parametere som du sender inn til templatefilen når du ønsker å bruke den.

Nå som “formalitetene” er unnagjort kan vi endelig bevege oss over til den **SPENNENDE** delen av CloudFormation – nemlig `Resources`-delen. Det er her du definerer alle AWS-ressursene som du ønsker at CloudFormation skal opprette for deg.

#### S3-bøtter

Vi begynner med å opprette S3-bøttene vi kommer til å trenge. Vi oppretter disse på følgende måte:

```yml
# template.yml

# { ... utelatt kode ... }

Resources:
  FrontendBucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      AccessControl: PublicRead
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: index.html
    DeletionPolicy: Delete

  PipelineBucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      VersioningConfiguration:
        Status: Enabled
    DeletionPolicy: Delete
```

Her setter vi opp to bøtter: én som er offentlig tilgjengelig, og konfigurert til å fungere som en webserver (det vil si at du kan besøke `http://<bucket_name>.s3-website.<region>.amazonaws.com/` og automatisk bli sendt til `index.html`), og én som blir brukt av CodePipeline til å lagre kildekode den har hentet fra GitHub. Det er den førstnevnte som skal servere frontend-applikasjonen din. I tillegg setter vi bøttene opp slik at de vil bli slettet når du sletter CloudFormation-stacken (*NB: bøttene slettes bare hvis de er tomme. Du bør derfor manuelt tømme bøttene før du sletter stacken*).

Merk at navnene `FrontendBucket` og `PipelineBucket` kan være navngitt helt vilkårlig, og de påvirker ikke navnet på de faktiske AWS-ressursene som blir opprettet – de eksisterer kun for å kunne referere til ressursene internt i templatefilen (og for ordens og selvdokumenterings skyld er det da gunstig å bruke intuitive og deskriptive navn). Siden vi nå ikke har gitt eksplisitte navn til ressursene vil CloudFormation automatisk gjøre dette for oss når ressursene blir opprettet.

#### GitHub-integrasjon

Videre er det på tide å sette opp GitHub-integrasjonen vår:

```yml
# template.yml

# { ... utelatt kode ... }

  PipelineWebhook:
    Type: 'AWS::CodePipeline::Webhook'
    Properties:
      Authentication: GITHUB_HMAC
      AuthenticationConfiguration:
        SecretToken: !Ref GitHubOAuthToken
      Filters:
        - JsonPath: $.ref
          MatchEquals: 'refs/heads/{Branch}'
      TargetPipeline: !Ref CodePipeline
      TargetAction: GitHubSource
      TargetPipelineVersion: !GetAtt CodePipeline.Version
      RegisterWithThirdParty: true
```

Her setter vi opp en «webhook» som lar CodePipeline knytte seg opp mot vårt GitHub-repository. Legg merke til kode som `!Ref CodePipeline`, `!Ref GitHubOAuthToken` og `!GetAtt CodePipeline.Version`. Slike kommandoer lar oss referere til ressurser som er definert tidligere (eller senere) i templatefilen vår.

#### CodeBuild-prosjekt

Nå skal vi sette opp CodeBuild-prosjektet vårt. CodeBuild vil være ansvarlig for «byggesteget» i pipelinen – altså kommandoer som `npm run test`, `npm run build`, og lignende. Dersom koden passerer alle tester og kvalitetskontroller, er CodeBuild også ansvarlig for å laste opp den produksjonsklare frontend-applikasjonen vår til S3-bøtta vi opprettet tidligere.

```yml
# template.yml

# { ... utelatt kode ... }

  CodeBuildProject:
    Type: 'AWS::CodeBuild::Project'
    Properties:
      ServiceRole: !Ref CodeBuildRole
      Artifacts:
        Type: CODEPIPELINE
      Environment:
        Type: LINUX_CONTAINER
        ComputeType: BUILD_GENERAL1_SMALL
        Image: 'aws/codebuild/amazonlinux2-x86_64-standard:2.0-19.11.26'
        EnvironmentVariables:
          - Name: FRONTEND_BUCKET_NAME
            Type: PLAINTEXT
            Value: !Ref FrontendBucket
      Source:
        Type: CODEPIPELINE
      TimeoutInMinutes: 10
```

Her sier vi at vi ønsker at CodeBuild skal kjøre byggesteget vårt i et Linux-miljø. Hver gang byggesteget kjøres vil et helt nytt og tomt miljø opprettes, og på denne måten sørger du for at koden alltid bygges i de samme omgivelsene – aldri noe mer “*But… it works on my machine*”. **YAY!** 🙌

Når du oppretter ressurser på AWS som har tilgang til hele AWS-kontoen din, ønsker du vanligvis å kun gi ressursen tilgang til de operasjonene som er helt nødvendige. På denne måten unngår du at ressursen for eksempel roter seg borti en produksjonsdatabase den ikke har noe med å gjøre. Her gir vi CodeBuild-prosjektet vårt en rolle, CodeBuildRole, som begrenser ressursens tilganger.

#### CodePipeline

For å knytte sammen hele sulamitten skal vi nå opprette en pipeline ved bruk av CodePipeline. Den lar oss enkelt sette opp de ulike stegene vi ønsker å utføre når en kodeendring skjer, sende data mellom disse stegene og visualisere det hele på en oversiktlig måte.

I vårt tilfelle vil pipelinen bestå av de to stegene «Source» og «Build» som henholdsvis laster ned siste versjon av kildekoden fra GitHub og sender den videre til CodeBuild-prosjektet vårt. Hadde du hatt en mer avansert applikasjon kunne du her lagt til flere steg i pipelinen, for eksempel `Source → Build → Deploy to Test → Deploy to Stage → Deploy to Prod`, eller lignende.

```yml
# template.yml

# { ... utelatt kode ... }

  CodePipeline:
    Type: 'AWS::CodePipeline::Pipeline'
    Properties:
      ArtifactStore:
        Type: S3
        Location: !Ref PipelineBucket
      RestartExecutionOnUpdate: true
      RoleArn: !GetAtt 
        - CodePipelineRole
        - Arn
      Stages:
        - Name: Source
          Actions:
            - Name: GitHubSource
              InputArtifacts: []
              ActionTypeId:
                Category: Source
                Owner: ThirdParty
                Provider: GitHub
                Version: 1
              OutputArtifacts:
                - Name: SourceArtifact
              Configuration:
                Owner: !Ref GitHubOwner
                Repo: !Ref GitHubRepo
                Branch: !Ref GitHubBranch
                PollForSourceChanges: false
                OAuthToken: !Ref GitHubOAuthToken
              RunOrder: 1
        - Name: Build
          Actions:
            - Name: CodeBuild
              InputArtifacts:
                - Name: SourceArtifact
              ActionTypeId:
                Category: Build
                Owner: AWS
                Provider: CodeBuild
                Version: 1
              OutputArtifacts:
                - Name: FrontendBundle
              Configuration:
                ProjectName: !Ref CodeBuildProject
              RunOrder: 1
```

Her forteller vi CodePipeline at kildekode og diverse andre *artifakter* skal lagres i S3-bøtta vi definerte tidligere. I tillegg definerer vi hvilke steg vi ønsker å ha i pipelinen, og hvilke data hvert steg skal ha som input og/eller output.

#### Roller og rettigheter

Et problem vi har nå, er at hverken CodePipeline eller CodeBuild har tilgang til å gjøre noe som helst med ressursene vi har opprettet. For å løse dette må vi gi begge ressursene en rolle, og knytte hver slik rolle opp mot en egen «policy». En policy kan sees på som tilgangene til rollen. Disse ønsker vi å begrense slik at rollene kun har tilgang til det som strengt tatt er nødvendig.

```yml
# template.yml

# { ... utelatt kode ... }

  CodePipelinePolicy:
    Type: 'AWS::IAM::ManagedPolicy'
    Properties:
      Description: Policy that gives CodePipeline access to the artifacts S3 bucket
      Path: /
      PolicyDocument:
        Version: 2012-10-17
        Statement:
          - Sid: AllowS3Access
            Effect: Allow
            Action: 's3:*'
            Resource:
              - !Sub 'arn:aws:s3:::${PipelineBucket}'
              - !Sub 'arn:aws:s3:::${PipelineBucket}/*'
          - Sid: AllowAccessToLogs
            Effect: Allow
            Action: 'logs:*'
            Resource: '*'
          - Sid: AllowAccessToCodeBuild
            Effect: Allow
            Action: 'codebuild:*'
            Resource:
              - !Sub 'arn:aws:codebuild:*:*:project/${CodeBuildProject}'
              - !Sub 'arn:aws:codebuild:*:*:project/${CodeBuildProject}/*'
  CodePipelineRole:
    Type: 'AWS::IAM::Role'
    Properties:
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          Effect: Allow
          Principal:
            Service: codepipeline.amazonaws.com
          Action: 'sts:AssumeRole'
      ManagedPolicyArns:
        - !Ref CodePipelinePolicy
```

Legg merke til at vi bare har vist hvordan vi definer CodePipeline sin rolle og policy. Tilsvarende må gjøres for CodeBuild, men vi utelater dette i artikkelen for korthets skyld. (Fullstendig templatefil ligger i repository-et vi har linket til lengre opp).

### Steg 2 – Definere byggesteget

For å fortelle CodeBuild hvilke kommandoer som skal kjøres, oppretter vi en fil kalt `buildspec.yml`. CodeBuild-prosjektet vårt vil automatisk lese denne filen, og filen inneholder diverse informasjon om miljøet applikasjonen skal bygges i og kommandoene du ønsker å kjøre. Byggespesifikasjonene deles inn i steg som `install`, `pre-build`, `build` og `post-build`.

```yml
# buildspec.yml

version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 10
    commands:
      - npm install
  build:
    commands:
      - npm run lint
      - npm run test
      - npm run build
      - aws s3 sync ./dist s3://$FRONTEND_BUCKET_NAME --delete --acl "public-read"
```

Her bruker vi kommandoen `npm install` for å installere applikasjonen vår i et miljø med `Node.js` versjon 10, i install-fasen. På samme måte bygger vi applikasjonen vår med kommandoen `npm run build` i build-fasen. Legg også merke til at vi her benytter miljøvariablen `$FRONTEND_BUCKET_NAME` som vi definerte tidligere i `template.yml` filen vår. *Shout-out til deg for 15 minutter siden for å ha gjort denne variabelen tilgjengelig for oss!* Denne vil være tilgjengelig for CodeBuild mens den bygger, og det er innmari digg å slippe å manuelt hardkode dette (automatisering ❗).

### Steg 3 – Sette det hele sammen

Nå som vi har satt opp ressursene vi trenger, gitt de roller og tilgangene de behøver, og fortalt CodeBuild hvordan prosjektet skal bygges, kan vi endelig sy det hele sammen og få det opp i skyen. For å gjøre dette kan du følge disse stegene:

* Naviger deg til [AWS-konsollen](https://console.aws.amazon.com/) og logg inn.
* Naviger til CloudFormation (det enkleste er ofte å søke etter tjenesten).
* Trykk på den oransje knappen “*Create stack*”.
* Velg “*Template is ready*” og “*Upload Template File*”.
* Last opp filen `template.yml` vi har jobbet med gjennom artikkelen, og trykk “*Next*”.
* Fyll inn parameterene vi definerte helt i starten. Bruk ditt eget Github OAuth token, brukernavn, og så videre.
* Hopp over neste side og trykk “*Next*” (vanligvis vil det være god praksis å legge på diverse «tags», men vi hopper over dette steget for å holde instruksjonene korte og konsise).
* Se over stacken din og huk av den nederste checkboxen for “*I acknowledge that AWS CloudFormation might create IAM resources.*”.
* Trykk på “*Create stack*”.

Sånn! Nå provisjonerer CloudFormation ressursene vi har bedt om, og stacken opprettes. Når denne prosessen er ferdig skal du kunne åpne “*Outputs*”-fanen og se den offentlige linken til produksjonsmiljøet for frontend-applikasjonen din, samt navnet på de to S3-bøttene som har blitt opprettet.

Nå som alt er satt opp, vil CodePipeline hente nyeste kildekode og CodeBuild bygge applikasjonen din hver gang du pusher til master, og hvis alle stegene passerer, går applikasjonen ut i produksjonsmiljøet i S3 – helt **automagisk**! Dette sparer oss utviklere masse tid, og gir endebrukere tilgang på ny funksjonalitet så fort den er klar.

Ta en tur innom [CodePipeline](https://console.aws.amazon.com/codesuite/codepipeline/pipelines) og sjekk ut din splitter nye pipeline!

## Så, hva har vi lært?

Du har nå fått en innføring i hvordan du kan bruke CloudFormation, CodeBuild, CodePipeline og S3 i AWS til å implementere en fullt fungerende pipeline som automatisk produksjonsetter koden din når du gjør endringer på master-branchen i ditt repository. **Heftig!** Her er det mye rom for å utvide funksjonaliteten, så neste gang du oppretter et prosjekt kan du gå helt berserk og gjøre hva enn du vil. Lykke til!

(Det er et par momenter vi har unnlatt å dekke for å begrense omfanget av artikkelen, men de kan være interessante å se på hvis du vil arbeide videre med pipelinen eller ønsker å utforske AWS litt mer: AWS CloudFront («caching» av nettside), AWS Certificate Manager (SSL-sertifikater), AWS Route53 (domenenavn) og caching av `npm install` i byggesteget, for å nevne et par).