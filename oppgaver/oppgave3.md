# Skrive gøyere tester

Til nå har vi testet at tekst vises på siden, men hva med å teste input feilter i stedet for? Det er ganske så kult å se på at Cypress går inn på siden og trykker og skriver i elementer! La oss prøve med login siden. 

📖 Begynn med å lage en ny fil under /integration f.eks. join.ts. 

📖 Finn ut hvor i applikasjonen du må gå for å kunne lage en ny konto og skriv en test som tar deg til Sign up skjemaet. 

🦒 `.findByRole()` og `.click()` er nok nyttig her! Og [her](https://testing-library.com/docs/cypress-testing-library/intro/#examples) kan du finne noen eksempler. 

📖 Neste steg er å få tak i epost og passord feltene og skrive inn tekst der, for så å trykke på "Create account" (når man trykker create account vil også brukeren bli innlogget om alt går bra). Vi kan også logge ut brukeren til slutt for å se at det fungerer, så ta utgangspunkt i at testen skal gjøre noe slikt: 

```ts
it('should allow you to register and login, then sign out', () => {
    //........
})
```

🦒 `.findByLabelText()`, `.findByRole()`, .type()` og `.click()`. 

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
        cy.findByRole('textbox', { name: /email/i }).type(loginForm.email);
        cy.findByLabelText(/password/i).type(loginForm.password);
        cy.findByRole('button', { name: /create account/i }).click();
        cy.findByRole('button', { name: /logout/i }).click();
    })
    </pre>
</details>
</br>

Om du har gjort som meg i eksempelet over innser du veldig fort at testene feiler etter første gang de går igjennom, og det er fordi at man ikke kan lage flere brukere med samme e-post 🤦‍♂️

En løsning på dette er å bruke et bibliotek som heter faker til å generere eposter og passord til oss. 

📖 Installer faker: `npm i @faker-js/faker --save-dev`. 

🦒 Fun fact om faker: ["colors.js og faker.js sabotert av utvikleren" - Kode24](https://www.kode24.no/artikkel/colorsjs-og-fakerjs-sabotert-av-utvikleren/75102531)

📖 Bruk faker til å generere epost og passord. Se eksempler på hva faker inneholder [faker.js](https://fakerjs.dev/guide/#overview)

<details>
    <summary>
    Eksempel/spoiler
    </summary>
    <pre>
    const loginForm = {
        email: `${faker.internet.userName()}@example.com`,
        password: faker.internet.password(),
    };
    </pre>
</details>
</br>

Flott! Men det er kanskje litt kjipt å legge inn en ny bruker i databasen for hver gang man kjører testen 🙈. Ta en kikk i databasen ved å kjøre `npx prisma studio`. Det vil åpne oversikt og editeringsmuligheter i databasen på [localhost:5555/](http://localhost:5555/).

Kanskje det kan være nyttig å rydde bort brukeren når vi ikke trenger den lengre?

📖 Heldigvis har Remix eksempler på hvordan dette kan gjøres. Om du vil kan du prøve selv, ellers finner du koden som er tatt fra Remix sin Indigo starter template her:

cypress/support/commands.ts

```ts
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Deletes the current @user
       *
       * @returns {typeof cleanupUser}
       * @memberof Chainable
       * @example
       *    cy.cleanupUser()
       * @example
       *    cy.cleanupUser({ email: 'whatever@example.com' })
       */
      cleanupUser: typeof cleanupUser;
    }
  }
}

function cleanupUser({ email }: { email?: string } = {}) {
  if (email) {
    deleteUserByEmail(email);
  } else {
    cy.get("@user").then((user) => {
      const email = (user as { email?: string }).email;
      if (email) {
        deleteUserByEmail(email);
      }
    });
  }
  cy.clearCookie("__session");
}

function deleteUserByEmail(email: string) {
  cy.exec(
    `npx ts-node --require tsconfig-paths/register ./cypress/support/delete-user.ts "${email}"`
  );
  cy.clearCookie("__session");
}

Cypress.Commands.add("cleanupUser", cleanupUser);
```

cypress/commands/delete-user.ts
```ts
// Use this to delete a user by their email
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/delete-user.ts username@example.com
// and that user will get deleted

import { installGlobals } from "@remix-run/node/globals";
import { prisma } from "~/db.server";

installGlobals();

async function deleteUser(email: string) {
  if (!email) {
    throw new Error("email required for login");
  }
  if (!email.endsWith("@example.com")) {
    throw new Error("All test emails must end in @example.com");
  }

  await prisma.user.delete({ where: { email } });
}

deleteUser(process.argv[2]);
```

cypress/commands/index.ts
```ts
import "@testing-library/cypress/add-commands";
import './commands';
```

📖 Kjør `cy.cleanupUser();` etter hver test. Se her for mer info [her](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks) om hooks som Cypress tilbyr for å oppsett og rydding av tester. 

<details>
    <summary>
    Eksempel/spoiler
    </summary>
    <pre>
   import faker from '@faker-js/faker';

describe('join test', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    afterEach(() => {
        cy.cleanupUser();
    });
    it('should allow you to register and login, then sign out', () => {
        const loginForm = {
            email: `${faker.internet.userName()}@example.com`,
            password: faker.internet.password(),
        };
        cy.then(() => ({ email: loginForm.email })).as('user');
        cy.findByRole('link', { name: /Login/i }).click();
        cy.findByRole('link', { name: /Sign up/i }).click();
        cy.findByRole('textbox', { name: /email/i }).type(loginForm.email);
        cy.findByLabelText(/password/i).type(loginForm.password);
        cy.findByRole('button', { name: /create account/i }).click();
        cy.findByRole('button', { name: /logout/i }).click();
    });
});

    </pre>
</details>
</br>

"Fasit" etter denne oppgaven finner du på branchen [oppgave-3](https://github.com/GryNagel/cypress-workshop/tree/oppgave-3). 

## [◀️ Forrige oppgave](oppgave2.md) - [Neste oppgave ▶️](oppgave4.md)