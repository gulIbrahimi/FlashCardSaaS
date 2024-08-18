import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

    const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });

    export async function POST(request) {
    const { prompt } = await request.json();

    try {
        const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: `Generate a set of flashcards based on the following topic: ${prompt}`,
        max_tokens: 200,
        });

        const flashcards = response.choices[0].text.trim().split('\n');

        return NextResponse.json({ flashcards });
    } catch (err) {
        console.error('Error generating flashcards:', err);
        return NextResponse.json({ error: { message: err.message } }, { status: 500 });
    }
    }
