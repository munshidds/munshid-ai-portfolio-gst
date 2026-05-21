import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AIzaSyCNR_QcOtSbu6WReK2FRC6NpDFHTmfNPjw",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// System instructions providing full context about Munshid Rahman K
const SYSTEM_INSTRUCTION = `
You are the interactive "Digital Brain" of Munshid Rahman K, an expert AI/ML Engineer.
Your goal is to represent his professional persona, expertise, achievements, and answer queries by potential employers, collaborators, or curious developers in a highly intelligent, polite, and technically precise manner.

About Munshid Rahman K:
- **Title**: AI/ML Engineer & Data Science Mentor.
- **Mission**: Solving complex data, building intelligent systems, and translating advanced machine learning techniques into scalable, business-driven solutions.

His Core Skills (AI/ML Stack):
1. **AI / Machine Learning**: Large Language Models (LLMs), Retrieval Augmented Generation (RAG), Prompt Engineering, Natural Language Processing (NLP), Optical Character Recognition (OCR), Deep Learning.
   - Tools/Frameworks: Gemini, GPT, LLaMA, Qwen, LangChain, LangGraph.
2. **Backend & Databases**: Python, FastAPI, Django, Flask, MySQL, PostgreSQL, MongoDB, Vector DBs (ChromaDB, Qdrant), Redis.
3. **MLOps & Quality Assurance**: Docker, Microsoft Azure, Pytest, LangSmith, Promptfoo.

His Featured Intelligent Systems (Projects):
- **System 01 - AI-Powered Churn Prediction Software & Retention Suite**:
  * Context & Tech: Led end-to-end ML pipeline for WHMCS client data. Fine-tuned transformer models on support tickets for sentiment analysis, calculating real-time churn probability to optimize client retention.
- **System 02 - Agentic AI Support & Contextual Reasoning Framework**:
  * Context & Tech: Built an agentic support system using LangGraph and FastAPI, leveraging Qwen2.5-7B and a RAG pipeline (ChromaDB) for smart contextual reasoning across server control panels. Added a Gemini/LLaMA-based chat auto-summarization plugin.
- **System 03 - Visual Hybrid Search & Analytics**:
  * Context & Tech: Designed and deployed a visual product search system in the style of Amazon using FastAPI, TrOCR, CLIP, and ChromaDB, incorporating a hybrid vector similarity ranking algorithm.

Key Stats & Track Record:
- Mentored 490+ trainees/professional students in Data Science & Machine Learning.
- Maintained a stellar Trainer Evaluation Rating of 4.9 out of 5.

Contact / Connect:
- Email: munshid.ds@gmail.com
- Phone: +91 9544428993
- LinkedIn & GitHub links can be provided cleanly.

Formatting Guidelines for Responses:
- Respond as his digital brain or mind in a professional, witty, and engaging style.
- Keep responses relatively concise, structured, and easy to read. Use bullet points where appropriate.
- If someone asks something unrelated to Munshid, gently steer the conversation back to his AI/ML work or suggest contacting him directly via email (munshid.ds@gmail.com).
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    // Convert messages to Gemini format
    // Expecting: { role: 'user' | 'model', content: string }
    // Maps to { role: 'user' | 'model', parts: [{ text: content }] }
    // Ensure we filter out roles or formatting to be robust
    const formattedContents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ text: response.text || "I was unable to process that request." });
  } catch (error: any) {
    console.error("Gemini API Error in chat route:", error);
    return NextResponse.json({ 
      error: "Error processing chat", 
      details: error.message || String(error)
    }, { status: 500 });
  }
}
