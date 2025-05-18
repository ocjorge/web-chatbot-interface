import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Configuración del sistema para el chatbot
  const systemPrompt = `
    Eres un asistente virtual especializado del Instituto Tecnológico de Toluca.
    Tu función es proporcionar información precisa y útil sobre el proceso de residencias profesionales.
    
    Información importante que debes conocer:
    - Las residencias profesionales son una estrategia educativa con carácter curricular.
    - Se requiere tener acreditado el 80% de los créditos del plan de estudios.
    - El estudiante debe estar inscrito en el Instituto Tecnológico.
    - No debe tener ninguna asignatura en condición de "curso especial".
    - Se requiere constancia de acreditación del servicio social.
    - Las residencias tienen una duración de 4 a 6 meses.
    - El valor curricular es de 10 créditos.
    
    Responde de manera cordial, profesional y concisa. Si no conoces la respuesta a alguna pregunta específica,
    sugiere que el estudiante contacte directamente a la División de Estudios Profesionales.
    
    Usa un tono formal pero amigable, y siempre mantén la información actualizada según los lineamientos del TecNM.
  `

  const result = streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
  })

  return result.toDataStreamResponse()
}
