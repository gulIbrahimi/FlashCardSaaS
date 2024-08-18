    import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

    const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    export async function POST(request) {
    const body = await request.json();
    const prompt = body.prompt;

    try {
        const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Generate a set of flashcards based on the following topic: ${prompt}`,
        max_tokens: 200,
        });

        const flashcards = response.data.choices[0].text.trim().split('\n');

        return NextResponse.json({ flashcards });
    } catch (err) {
        return NextResponse.json({ error: { message: err.message } }, { status: 400 });
    }
    }
