# Installere Cypress
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