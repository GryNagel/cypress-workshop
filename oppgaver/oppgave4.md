# Mocke apier

Som du kanskje  har lagt merke til så henter vi en random dadjoke fra [https://icanhazdadjoke.com/api](https://icanhazdadjoke.com/api). Det fungerer forsåvidt helt fint å gjøre det. Men hva om vi har lyst til å teste hva som skjer om api-et gir oss en feilmelding? Eller kanskje man bruker et api med begrensning så man ikke har lyst til å spamme det i hytt og pine? Da kan vi bruke [msw](https://mswjs.io/) form å mocke api kallene. Det som er ekstra kult med msw er at man kan bruke det både til å mocke api til tester, men også til utvikling lokalt. Backend er død, null stress, da bruker vi bare mockene våre enn så lenge!

Vi begynner med en installasjon (siste, lover!) `npm i msw binode --save-dev`. 

Binode brukes til noe som jeg egentlig ikke har snøring på hva er, men mer info [her](https://github.com/kentcdodds/binode) om noen er interessert!

Neste steg er å lage en mappe på rot nivå som vi kaller `mocks`.

I /mocks trenger vi to filer: 

mocks/index.js

```js
require('tsconfig-paths/register');
require('ts-node').register({ transpileOnly: true });
require('./start');
```

mocks/start.ts
```ts
import { setupServer } from 'msw/node';
import '~/utils';

const server = setupServer();

server.listen({ onUnhandledRequest: 'warn' });
console.info('🔶 Mock server running');

process.once('SIGINT', () => server.close());
process.once('SIGTERM', () => server.close());
```



"Fasit" etter denne oppgaven finner du på branchen [oppgave-4](https://github.com/GryNagel/cypress-workshop/tree/oppgave-4). 

## [◀️ Forrige oppgave](oppgave3.md) - [Neste oppgave ▶️](oppgave5.md)