export type Joke = {
    id: string;
    joke: string;
    status: number;
};

export async function getRandomJoke(): Promise<string> {
    const res = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            Accept: 'application/json',
        },
    });
    const joke = await res.json();
    return joke.joke;
}
