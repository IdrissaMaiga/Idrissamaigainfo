import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.AI_API_KEY || "",
});

// Model configuration
const modelName = "deepseek-r1-distill-llama-70b";

// Validate API key at startup
if (!process.env.AI_API_KEY) {
  console.error("Missing AI_API_KEY environment variable");
}

export async function POST(req: NextRequest) {
  try {
    // Validate API key at runtime
    if (!groq.apiKey) {
      return NextResponse.json(
        { error: "AI service not configured properly" },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { userCommand } = body;
    
    if (!userCommand) {
      return NextResponse.json(
        { error: "Missing user command" },
        { status: 400 }
      );
    }

    console.log("Processing user command:", userCommand);

    // Create personalized prompt
    const prompt = `
      You are an assistant with detailed knowledge of Idrissa Maiga:
      - Background: Junior Java Engineer, Software Developer, born in Bamako, Mali
      - Experience: 5+ years in Java, Spring Boot, RESTful APIs, MySQL, PostgreSQL, AWS, Node.js, React.js, and .NET Core
      - Education: Obuda University, Budapest (BSc in Computer Science, GPA: 8.7, Expected 2027)
      - Languages: English, French, Hungarian (beginner), Bambara
      - Certifications: Spring Boot, Full-Stack Web Development, ASP.NET Core, Cisco Networking
      - Projects: Filmu (VOD Streaming), Gmail AI Assistance, SignalApp (Trading Signals), Kouma (AI Chat App)
      - Hobbies: AI development, cloud technologies, football, continuous learning, technology-driven solutions
      - Interests: Cloud platforms (AWS, Google Cloud), DevOps practices, Docker, Kubernetes

      User Input: "${userCommand}"
      
      Provide a concise, helpful response as Idrissa's portfolio assistant. Keep responses under 250 words.
      If the user asks for code examples or technical explanations, format them using markdown code blocks with the appropriate language.
    `;

    // Get AI response
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are an AI assistant with expertise in Java, Spring Boot, and AI projects." },
        { role: "user", content: prompt },
      ],
      model: modelName,
      temperature: 0.6,
      max_tokens: 1024,
      top_p: 0.95,
      stream: false,
    });

    // Extract and clean response
    let fullResponse = response.choices?.[0]?.message?.content || "";
    
    // Remove any thinking sections (if present)
    fullResponse = fullResponse.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    
    console.log("AI response generated successfully");

    // Return JSON response
    return NextResponse.json({ response: fullResponse });
    
  } catch (error) {
    console.error("Error in AI endpoint:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to generate AI response", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}