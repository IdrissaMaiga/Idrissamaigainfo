// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

// Chat types
export interface ChatMessage {
  text: string;
  sender: "User" | "AI";
  timestamp: number;
  code?: boolean;
}

export interface ChatRequest {
  userCommand: string;
}

export interface ChatResponse {
  response: string;
  error?: string;
}