import { setupServer } from 'msw/node';
import {rest} from 'msw';

import '~/utils';
import { mockJoke } from './mockText';

const handlers = [
    rest.get('https://icanhazdadjoke.com/', 
    async (req, res, ctx) => {
        return res(ctx.json(mockJoke))
      },
    )
]

const server = setupServer(...handlers);

server.listen({ onUnhandledRequest: 'warn' });
console.info('🔶 Mock server running');

process.once('SIGINT', () => server.close());
process.once('SIGTERM', () => server.close());
