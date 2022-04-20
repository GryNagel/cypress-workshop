<div align="center">
  <img src="https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg" alt="logo" width="200" height="auto" />
  <h1>Cypress workshop</h1>
    <p>Dette er en test applikasjon for å leke med <a href="https://www.cypress.io/">Cypress</a> i forbindelse med intern fagdag. Applikasjonen viser blogginlegg og en random dadjoke, og bruker <a href="https://www.remix.run/">Remix</a>.
    </p>

  <a href="https://github.com/GryNagel/cypress-workshop">
    <img src="https://img.shields.io/static/v1?label=GryNagel&message=cypress-workshop&color=blue&logo=github" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/GryNagel/cypress-workshop" alt="last update" />
  </a>
   
</div>

# :notebook_with_decorative_cover: Innhold
- [Om applikasjonen](#star2-om-applikasjonen)
  * [Tech Stack](#space_invader-tech-stack)
  * [Features](#dart-features)
- [Kom i gang](#toolbox-kom-i-gang)
  * [Prerequisites](#bangbang-prerequisites)
  * [Oppsett](#gear-oppsett)
- [Oppgaver](#book-oppgaver)
  * [Installere cypress](#installere-cypress)

## :star2: Om applikasjonen

### :space_invader: Tech Stack
<b>Applikasjon</b>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://remix.run/">Remix</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
  </ul>

<b>Database</b>
  <ul>
    <li><a href="https://www.prisma.io/">Prisma</a></li>
    <li><a href="https://www.sqlite.org/">SQLite</a></li>
  </ul>

<b>Testing</b>
  <ul>
    <li><a href="https://www.cypress.io/">Cypress</a></li>
    <li><a href="https://vitest.dev/">Vitest</a></li>
  </ul>

### :dart: Features
- Random dad joke: Viser en radom dadjoke fra [icanhazdadjoke](https://icanhazdadjoke.com/api)
- Visning av blogg innlegg
- Innlogging og opprettelse av ny konto
- Mulighet til å lage nye blogg innlegg

## 	:toolbox: Kom i gang

### :bangbang: Prerequisites 
- Node.js 14 eller høyere
- npm 7 eller høyere
- En editor av noe slag

OBS! Cypress er et program som har gui, det vil si at om du bruker WSL på Windows, må man gjøre litt greier for å få det til å fungere. Det er ikke noe vi kommer til å gå gjennom på workshopen, så vurder å gjennomføre workshopen i Windows. 

### :gear: Oppsett
1. Klon repoet
2. Kjør `npm i`
3. Kopier .env.example og lag din egen session secret
4. Kjør `npm run setup:db` for å sette opp og seede databasen
5. Kjør `npm run dev`. Applikasjonen starter på [localhost:3000](http://localhost:3000/)

Ta en kikk rundt i applikasjonen. 

## :book: Oppgaver

### Installere Cypress
Kjør `npm install cypress --save-dev`, det vil installere cypress som en dev dependency i applikasjonen. 

Kjør så `npx cypress open`. 

Om det er første gangen du kjører bruker Cypress på maskinen vil det ta litt tid, men så bør du se: 

![Cypress](/screenshots/cypress.png)

Cypress kommer med en god del eksempler, og alt legger seg i en mappe som overraskende nok heter cypress. 

For å kjøre testene trykker man på "Run x integration specs":

![Run tests](/screenshots/run-tests.png)

Prøv å kjøre testene på din maskin nå. Legg merke til at testene blir kjørt mot https://example.cypress.io/__/#/tests/__all, når vi skal teste vår egen kode vil vi kjøre testene mot 'localhost:3000'. Det vil si at for å kjøre testene må man kjøre opp applikasjonen, så Cypress for å kjøre tester. 

Testene ligger under `cypress/integration/*`. Her er eslint veldig sinna fordi cy ikke er definert. Det kan fikses med å kjøre `npm i eslint-plugin-cypress --save-dev`, og legge til ` "eslint-plugin-cypress"` under "extends" i .eslintrc. 

```json
{
  "extends": [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest",
    "prettier",
    "eslint-plugin-cypress"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  },
  "settings": {
    "jest": {
      "version": 27
    }
  }
}
```

Resultet av installering av Cypress finner du om du sjekker ut [cypress-installed](https://github.com/GryNagel/cypress-workshop/tree/cypress-installed) branchen. 

### Skrive tester
