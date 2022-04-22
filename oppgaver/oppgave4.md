# Mocke apier

Som du kanskje  har lagt merke til så henter vi en random dadjoke fra [https://icanhazdadjoke.com/api](https://icanhazdadjoke.com/api). Det fungerer forsåvidt helt fint å gjøre det i testene. Men hva om vi har lyst til å teste hva som skjer om api-et gir oss en feilmelding? Eller kanskje man bruker et api med begrensning så man ikke har lyst til å spamme det i hytt og pine? Da kan vi bruke [msw](https://mswjs.io/) form å mocke api kallene. Det som er ekstra kult med msw er at man kan bruke det både til å mocke api til tester, men også til å mocke api kall under utvikling: Backend er nede, null stress, da bruker vi bare mockene våre enn så lenge!

Vi begynner med en installasjon (siste, lover!) `npm i msw binode start-server-and-test cross-env --save-dev`. 

Mer info om de forskjellige pakkene kan du finne her: 
- [mswjs.io](https://mswjs.io/)
- [Binode](https://github.com/kentcdodds/binode)
- [start-server-and-test](https://www.npmjs.com/package/start-server-and-test)
- [cross-env](https://www.npmjs.com/package/cross-env)

📖 Neste steg er å lage en mappe på rot nivå som vi kaller `mocks` på topp nivå.

📖 I /mocks trenger vi to filer: 

mocks/index.js som inneholder litt konfigurasjon:

```js
require('tsconfig-paths/register');
require('ts-node').register({ transpileOnly: true });
require('./start');
```

mocks/start.ts som konfigurerer mock serveren vår: 
```ts
import { setupServer } from 'msw/node';
import '~/utils';

const server = setupServer();

server.listen({ onUnhandledRequest: 'warn' });
console.info('🔶 Mock server running');

process.once('SIGINT', () => server.close());
process.once('SIGTERM', () => server.close());
```

📖 Neste steg er å starte mock serveren når vi kjører testene. Det kan vi gjøre med å legge inn følgende script under "scripts" i package.json. Legg de inn under scriptene som ligger der fra før av, og legg til et komma bakerst på linjen til dev (eller vent til terminalen/eslint kjefter på deg). 

```json
    "dev:tests": "cross-env NODE_ENV=development binode --require ./mocks -- @remix-run/dev:remix dev",
    "start:mocks": "binode --require ./mocks -- @remix-run/serve:remix-serve build",
    "test:e2e:dev": "start-server-and-test dev:tests http://localhost:3000 \"cypress open\""
```

Om vi nå kjører `npm run test:e2d:dev` vil den starte applikasjonen på localhost:3000, starte mock serveren og starte Cypress. 

‼️ Stopp alt du har kjørende og kjør kun denne kommandoen nå. 

Sjekk outputen i terminalen når testene kjører. Ser du `[MSW] Warning: captured a request without a matching request handler: • GET https://icanhazdadjoke.com/`?

Det kommer fra msw som forteller oss at vi kaller et api som vi ikke har laget en handler for, så da får vi lage en handler!

🦒 Handlers skal inn i `setupServer()` funksjonen i /mocks/start.ts

📖 Om du vil prøve selv kan du finne eksempler [her](https://github.com/kentcdodds/kentcdodds.com/blob/main/mocks/start.ts). Modellen og api kallet til dadjokes finner du i app/models/joke.server.ts. 

<details>
    <summary>Eksempel/spoiler</summary>
    <pre>
    import {rest} from 'msw';
    //.......
    const handlers = [
       rest.get('https://icanhazdadjoke.com/', 
        async (req, res, ctx) => {
            return res(ctx.json({
                id: 'fake-joke-id', 
                joke: 'Why are giraffes so slow to apologize? It takes them a long time to swallow their pride.',
                status: 200,
            }))
        },
        )
    ]
    const server = setupServer(...handlers);
    //.......
    </pre>
</details>
</br>

Kult! Da får vi fanget opp GET requesten som går til ['https://icanhazdadjoke.com/]('https://icanhazdadjoke.com/) og returnert vår egen respons!

Da kan vi skrive en test for å sjekke at joken er synlig i applikasjonen også!

📖 Lag en ny fil under cypress/integration og kall den `joke.ts`. Skriv en test som sjekker at teksten fra joken er synlig på skjermen. 

Flott! Da får vi testet at joken er synlig! Men hva om noen endrer teksten på den joken? Da vil testen vår knekke ettersom at vi har duplisert en string to steder! Hva med å dra joken ut i en egen konstant slik at vi kan bruke den både i testene og i mock serveren?

Jeg har gjort dette ved å lage en fil under mocks kalt `mockText.ts`. Og eksporterer en `mockJoke` konstant derfra.

📖 Lag en gjenbrukbar `mockJoke`. 

<details>
    <summary>Eksempel/spoiler</summary>
    <span>mocks/mockText.ts</span>
    <pre>
    import { Joke } from '../app/models/joke.server';
    export const mockJoke: Joke = {
        id: 'fake-joke-id', 
        joke: 'Why are giraffes so slow to apologize? It takes them a long time to swallow their pride.',
        status: 200,
    }
    </pre>
    <span>mocks/start.ts</span>
    <pre>
    //.......
    const handlers = [
        rest.get('https://icanhazdadjoke.com/', 
        async (req, res, ctx) => {
            return res(ctx.json(mockJoke))
        },
        )
    ]
    //.......
    </pre>
    <span>cypress/integration/joke.ts</span>
    <pre>
    import {mockJoke} from '../../mocks/mockText';
    describe('joke', () => { 
        it('should show a joke from our mocked api', () => {
            cy.visit('/');
            cy.findByText(mockJoke.joke).should('exist');
        })
    })
    </pre>
</details>
</br>

"Fasit" etter denne oppgaven finner du på branchen [oppgave-4](https://github.com/GryNagel/cypress-workshop/tree/oppgave-4). 

## [◀️ Forrige oppgave](oppgave3.md) - [Neste oppgave ▶️](oppgave5.md)