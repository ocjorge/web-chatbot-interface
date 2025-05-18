"use client"
import { useChat } from "@ai-sdk/react"
import { Send, FileDown, User, Mail, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"

export default function ChatbotPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hola, soy el asistente virtual del Instituto Tecnológico de Toluca. Estoy aquí para responder tus dudas sobre el proceso de residencias profesionales. ¿En qué puedo ayudarte hoy?",
      },
    ],
  })

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-[#1B396A] text-white p-4 shadow-md dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <img src="/placeholder.svg?height=48&width=48" alt="Logo ITT" className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Asistente de Residencias</h1>
              <p className="text-sm opacity-90">Instituto Tecnológico de Toluca</p>
            </div>
          </div>
          <ModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
              <CardTitle>Chat de Asistencia</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[50vh]">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-[#1B396A] text-white rounded-tr-none dark:bg-blue-700"
                        : "bg-gray-100 text-gray-800 rounded-tl-none dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800 rounded-tl-none dark:bg-gray-700 dark:text-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Preguntas rápidas */}
            <div className="px-4 py-2 border-t dark:border-gray-700">
              <p className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Preguntas frecuentes:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion("¿Cuáles son los requisitos para iniciar residencias?")}
                  className="text-xs"
                >
                  Requisitos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion("¿Cuáles son las fechas importantes para residencias?")}
                  className="text-xs"
                >
                  Fechas
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion("¿Qué documentos necesito para residencias?")}
                  className="text-xs"
                >
                  Documentos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion("¿Cómo encuentro una empresa para hacer residencias?")}
                  className="text-xs"
                >
                  Empresas
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion("¿Cómo se evalúan las residencias?")}
                  className="text-xs"
                >
                  Evaluación
                </Button>
              </div>
            </div>

            <CardFooter className="border-t p-3 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Escribe tu pregunta aquí..."
                  className="flex-1 dark:bg-gray-800 dark:border-gray-700"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-80 space-y-4">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="fechas">Fechas</TabsTrigger>
              <TabsTrigger value="docs">Documentos</TabsTrigger>
            </TabsList>
            <TabsContent
              value="info"
              className="border rounded-md p-4 mt-2 bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="font-bold text-lg mb-2">Sobre Residencias</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Las residencias profesionales son una estrategia educativa con carácter curricular que permite al
                estudiante emprender un proyecto teórico-práctico, analítico, reflexivo, crítico y profesional.
              </p>
              <h4 className="font-semibold text-md mb-1">Requisitos generales:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-1">
                <li>Tener acreditado el 80% de créditos de tu plan de estudios</li>
                <li>Estar inscrito en el Instituto Tecnológico</li>
                <li>No contar con ninguna asignatura en condición de "curso especial"</li>
                <li>Disponer de constancia de acreditación del servicio social</li>
              </ul>
            </TabsContent>
            <TabsContent
              value="fechas"
              className="border rounded-md p-4 mt-2 bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="font-bold text-lg mb-2">Calendario</h3>
              <div className="space-y-3 text-sm">
                <div className="border-b pb-2 dark:border-gray-700">
                  <p className="font-semibold">Solicitud de residencias</p>
                  <p className="text-gray-600 dark:text-gray-300">1 - 15 de enero / 1 - 15 de agosto</p>
                </div>
                <div className="border-b pb-2 dark:border-gray-700">
                  <p className="font-semibold">Entrega de anteproyecto</p>
                  <p className="text-gray-600 dark:text-gray-300">15 - 30 de enero / 15 - 30 de agosto</p>
                </div>
                <div className="border-b pb-2 dark:border-gray-700">
                  <p className="font-semibold">Inicio de residencias</p>
                  <p className="text-gray-600 dark:text-gray-300">1 de febrero / 1 de septiembre</p>
                </div>
                <div>
                  <p className="font-semibold">Entrega de reportes finales</p>
                  <p className="text-gray-600 dark:text-gray-300">15 - 30 de junio / 15 - 30 de diciembre</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="docs"
              className="border rounded-md p-4 mt-2 bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="font-bold text-lg mb-2">Documentos requeridos</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-[#1B396A] text-white flex items-center justify-center text-xs dark:bg-blue-700">
                    1
                  </div>
                  <span>Solicitud de residencia profesional</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-[#1B396A] text-white flex items-center justify-center text-xs dark:bg-blue-700">
                    2
                  </div>
                  <span>Anteproyecto de residencia (formato digital e impreso)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-[#1B396A] text-white flex items-center justify-center text-xs dark:bg-blue-700">
                    3
                  </div>
                  <span>Carta de aceptación de la empresa</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-[#1B396A] text-white flex items-center justify-center text-xs dark:bg-blue-700">
                    4
                  </div>
                  <span>Carta de asignación y presentación del residente</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 h-5 rounded-full bg-[#1B396A] text-white flex items-center justify-center text-xs dark:bg-blue-700">
                    5
                  </div>
                  <span>Convenio de colaboración (si aplica)</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>

          {/* Sección de descargas */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Descargas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <FileDown className="h-4 w-4 mr-2" /> Formato de solicitud
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <FileDown className="h-4 w-4 mr-2" /> Formato de anteproyecto
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <FileDown className="h-4 w-4 mr-2" /> Carta de presentación
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <FileDown className="h-4 w-4 mr-2" /> Reporte preliminar
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <FileDown className="h-4 w-4 mr-2" /> Guía de residencias
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sección de contacto */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Contacto directo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Coordinación de Residencias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>residencias@toluca.tecnm.mx</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>(722) 123-4567 ext. 123</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Lun-Vie: 9:00 - 14:00, 16:00 - 19:00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t p-4 text-center text-sm text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
        © {new Date().getFullYear()} Instituto Tecnológico de Toluca - División de Estudios Profesionales
      </footer>
    </div>
  )
}
