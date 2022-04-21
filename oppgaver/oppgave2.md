# Skrive tester

Om du vil lese mer om organisering og skriving av Cypress tester finnder du mer informasjon [her](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#What-you-ll-learn). 


## Setup/rydding 
Begynn med å rydde bort eksempel tester fra cypress mappen slik at du sitter igjen med følgende struktur: 

```
/cypress
  /fixtures
    - example.json

  /integration

  /plugins
    - index.js

  /support
    - commands.js
    - index.js
```

For å kunne skrive ts i Cypress testene trenger vi å legge inn egen eslint og ts config. De kan du finne her: 
- [tsconfig](https://github.com/GryNagel/cypress-workshop/blob/oppgave-2/cypress/tsconfig.json) 
- [.eslintrc](https://github.com/GryNagel/cypress-workshop/blob/oppgave-2/cypress/.eslintrc) 

og de legges i cypress mappen. 

‼️ Om du får litt rare feil i editoren etter å ha lagt til eslint og tsconfingen -> restart editoren (f.eks. cy is not defined). 

Alle js filer kan så renames til ts filer. 

Vi må også installere typer til test filene våre: `npm run @types/jest --save-dev` bør gjøre susen.

Det siste steget er å fortelle cypress hvor testene skal kjøres. Det gjøres vet legge inn følgende i cypress/plugins/index.ts:

```ts
module.exports = (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
  ) => {
    const isDev = config.watchForFileChanges;
    const port = process.env.PORT ?? (isDev ? "3000" : "8811");
    const configOverrides: Partial<Cypress.PluginConfigOptions> = {
      baseUrl: `http://localhost:${port}`,
      integrationFolder: "cypress/integration",
      video: !process.env.CI,
      screenshotOnRunFailure: !process.env.CI,
    };
    Object.assign(config, configOverrides);
  
    // To use this:
    // cy.task('log', whateverYouWantInTheTerminal)
    on("task", {
      log(message) {
        console.log(message);
        return null;
      },
    });
  
    return config;
  };
```

Om du er nysgjerrig på hva plugins filen er kan du lese mer [her](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file).

Da er vi endelig klar for å skrive vår første test!

## Første test
Pass på at applikasjonen kjører `npm run dev` og cypress `npx cypress open`. Når man bruker `cypress` open vil cypress følge med på filene og kjøre testene på nytt dersom du gjør endringer. Konfigurasjonen vi la inn i `/plugins` vil gjøre at når vi kjører testene i dev så vil de gå mot applikasjonen vår som kjører på [localhost:3000](localhost:3000). 

Lag en ny fil i /fixtures som heter smoke.ts (eller organiser testene akkurat som du vil!). 

Vi begynner med en enkel test for å sjekke at headeren i applikasjonen er riktig. En samling med tester defineres ved å bruke en describle blokk: 

```ts
describe('smoke tests', () => {
    //Tests here
})
```

For å sjekke om headeren eksisterer kan man gjøre følgende: 

```ts
it('should have application header',() => {
    cy.visit("/");
    cy.get('h1').contains("Hello cypress")
})
```

`cy.visit()` åpner siden på rootnivå
`cy.get()` brukes i dette tilfellet til å finne et html element av typen `h1` som inneholder teksten "Hello cypress". 

Kjør testene og se om det fungerer!

## Andre test
Skriv en til test som sjekker at tittelen "Posts" er på siden og sjekk at den kjører og er grønn. 

Tok du med cy.visit('/'); i test nummer to også? Fungerer det uten? 

Spoiler: det gjør det! Men hva om du bytter plass på testene? Da vil kun test nummmer en fungere. Det er litt kjipt å tester som avhenger testen før, om vi ommøblerer koden eller kjører den ene testen isolert så vil den ikke fungere. Dette kan vi fikse ved å bruke en beforeEach blokk: 

```ts
    describe('smoke tests', () => { 
        beforeEach(() => {
            cy.visit("/");
        })
    //....
```

Sånn! Da kan også cy.visit("/") fjernes fra de begge testene. Cypress har også en del andre hooks som kan brukes til å sette opp eller rydde for testene. Mer info [her](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks).

## React testing library
Cypress har en god del måter å få tak i elementer på, men man kan også bruke react-testing-library sine dom-queries for å få tak i elementer. 

Sett opp react-testing-library for Cypress ved å følge guiden her: https://testing-library.com/docs/cypress-testing-library/intro/

Skriv om testene til å bryke react-testing-library sin `findByRole` i stedet for. Fordelen her er at om noen plutselig bestemmer seg for at headeren skal være en h2 i stedet for h1 så vil testen fremdeles fungere. 

Om du trenger litt hjelp med å se hvordan findByRole skal brukes kan du se eksempler [her](https://testing-library.com/docs/cypress-testing-library/intro/#examples).

"Fasit" etter denne oppgaven finner du på branchen [oppgave-2](https://github.com/GryNagel/cypress-workshop/tree/oppgave-2). 

## [Neste oppgave ▶️](oppgave3.md)