# Installere Cypress
Kjør `npm install cypress --save-dev`, det vil installere cypress som en dev dependency i applikasjonen. 

Kjør så `npx cypress open`. 

Om det er første gangen du kjører Cypress på maskinen vil det ta litt tid, men så bør du se: 

![Cypress](/screenshots/cypress.png)

Cypress kommer med en god del eksempler, og alt legger seg i en mappe som overraskende nok heter `/cypress`. Disse testene kan vi kjøre for å se at Cypress fungerer. For å kjøre testene trykker man på "Run x integration specs":

![Run tests](/screenshots/run-tests.png)

Prøv å kjøre testene på din maskin. Legg merke til at testene blir kjørt mot https://example.cypress.io/, når vi skal teste vår egen kode vil vi kjøre testene mot [localhost:3000](localhost:3000). Det vil si at for å kjøre testene må man kjøre opp applikasjonen på, så Cypress for å kjøre tester. 

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

🦒  Du kan også velge hvilken nettleser du vil kjøre testene i. Jeg bruker Electron ettersom at jeg får litt trøbbel i Chrome når man begynner på oppgave 3 av denne workshopen. Det ser ut til at det kan henge sammen med at lastpass ligger i feltene, men 🤷‍♂️. Bruk hva du vil, men dette er en heads up i alle fall! 

Resultet etter installering av Cypress finner du om du sjekker ut [oppgave-1](https://github.com/GryNagel/cypress-workshop/tree/oppgave-1) branchen. 

## [Neste oppgave ▶️](oppgave2.md)