<div align="center">
  <img src="https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg" alt="logo" width="200" height="auto" />
  <h1>Cypress workshop</h1>
    <p>Dette er en test applikasjon for å leke med <a href="https://www.cypress.io/">Cypress</a> i forbindelse med intern fagdag. Applikasjonen viser blogginlegg og en random dadjoke, og bruker <a href="https://www.remix.run/">Remix</a>.
    </p>
</div>

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

### :gear: Oppsett
1. Klon repoet
2. Kjør `npm i`
3. Kopier .env.example og lag din egen session secret
4. Kjør `npm run setup:db` for å sette opp og seede databasen
5. Kjør `npm run dev`. Applikasjonen starter på [localhost:3000](http://localhost:3000/)

Ta en kikk rundt i applikasjonen. 

## :book: Oppgaver

### Installere Cypress

