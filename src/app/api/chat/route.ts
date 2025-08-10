import { NextRequest, NextResponse } from 'next/server';
import { getChatResponse } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    // Rate limiting could be implemented here
    // For now, we'll limit to the last 10 messages to manage context length
    const recentMessages = messages.slice(-10);

    const response = await getChatResponse(recentMessages);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}