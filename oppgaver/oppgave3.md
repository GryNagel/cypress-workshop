# Skrive gøyere tester

Til nå har vi testet at tekst vises på siden, men hva med å teste input feilter i stedet for? Det er ganske så kult å se på at Cypress går inn på siden og trykker og skriver i elementer! La oss prøve med login siden. 

Begynn med å lage en ny fil under /integration f.eks. join.ts. 

Finn ut hvor i applikasjonen du må gå for å kunne lage en ny konto og skriv en test som tar deg til Sign up skjemaet. 

Neste steg er å få tak i epost og passord feltene og skrive inn tekst der, for så å trykke på "Create account". Vi kan også logge ut brukeren til slutt for å se at det fungerer, så ta utgangspunkt i at testen skal gjøre noe slikt: 

```ts
it('should allow you to register and login, then sign out', () => {
    //........
})
```

Tips her er `.findByLabelText()`, `.type()` og `.click()`. 

<details>
    <summary>
    Eksempel/spoiler
    </summary>
    <pre>
    it('should allow you to register and login, then sign out', () => {
        const loginForm = {
            email: 'me@example.com',
            password: '123mememepassword!!!'
        }
        cy.findByRole('link', { name: /Login/i }).click(); 
        cy.findByRole('link', { name: /Sign up/i }).click(); 
        cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
        cy.findByLabelText(/password/i).type(loginForm.password);
        cy.findByRole("button", { name: /create account/i }).click();
        cy.findByRole("button", { name: /logout/i }).click();
    })
    </pre>
</details>

Om du har gjort som meg i eksempelet over innser du veldig kjapt at testene feiler etter første gang de går igjennom, og det er fordi at man ikke kan lage flere brukere med samme e-post 🤦‍♂️

En løsning på dette er å bruke et bibliotek som heter faker til å generere eposter og passord til oss. 

Installer faker: `npm i @faker-js/faker --save-dev`. 

🦒 Fun fact om faker: ["colors.js og faker.js sabotert av utvikleren" - Kode24](https://www.kode24.no/artikkel/colorsjs-og-fakerjs-sabotert-av-utvikleren/75102531)

Bruk faker til å generere epost og passord. 

"Fasit" etter denne oppgaven finner du på branchen [oppgave-3](https://github.com/GryNagel/cypress-workshop/tree/oppgave-3). 

## [Neste oppgave ▶️](oppgave4.md)