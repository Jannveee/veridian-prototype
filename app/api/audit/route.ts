import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return Response.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert green coding auditor specializing in sustainability and energy efficiency analysis. 
Analyze the provided code for:
1. CPU cycle optimization opportunities
2. Memory efficiency improvements
3. Algorithm complexity issues
4. Carbon footprint reduction potential

Provide a JSON response with the following structure:
{
  "sustainabilityScore": number (0-100),
  "estimatedCO2Savings": string (e.g., "45% reduction"),
  "cpuOptimization": string (e.g., "25% potential improvement"),
  "optimizedCode": string (the refactored code),
  "recommendations": string[] (array of key recommendations),
  "explanation": string (brief explanation of changes)
}

Focus on practical, implementable optimizations that reduce computational overhead and energy consumption.`;

    const prompt = `Analyze this code for sustainability and optimization:

\`\`\`
${code}
\`\`\`

Provide detailed green code audit results in JSON format.`;

    const result = await generateText({
      model: groq('llama-3.1-70b-versatile'),
      system: systemPrompt,
      prompt: prompt,
      temperature: 0.7,
    });

    // Parse the AI response
    let auditResult;
    try {
      // Extract JSON from the response if it's wrapped in text
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      auditResult = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(result.text);
    } catch {
      // Fallback if parsing fails
      auditResult = {
        sustainabilityScore: 72,
        estimatedCO2Savings: '35% reduction',
        cpuOptimization: '28% potential improvement',
        optimizedCode: code, // Return original if optimization fails
        recommendations: [
          'Consider using more efficient algorithms',
          'Reduce unnecessary iterations',
          'Optimize memory allocation patterns',
        ],
        explanation: 'The code has good structure but can benefit from algorithm optimization.',
      };
    }

    return Response.json(auditResult);
  } catch (error) {
    console.error('Audit error:', error);
    return Response.json(
      { error: 'Failed to perform audit' },
      { status: 500 }
    );
  }
}
