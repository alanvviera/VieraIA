
"use client";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { useState } from "react";

//La que estaba
//AIzaSyAwWU_q-Qt51TxQVMFO5Ym2NpJjwtV2Eac

const apiKey = "AIzaSyA0P36rpqMmKrdAe7dWOVLZttjvJsIbuHQ";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const msgs = []

export default function Home() {
  const [data, setData] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");


  async function run(data) {
    // Choose a model that's appropriate for your use case.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const prompt = data
  
    const result = await model.generateContent(data);
    const response = result.response;
    const text = response.text();
    setData(text);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: prompt },
      { sender: 'ai', text: text }
    ]);
    console.log(text)
  }

 

const Submit = async (e) => {
  e.preventDefault();

  // Obtener el valor del campo "prompt" del formulario
  const prompt = (e.target?.prompt?.value) || "";

  // Imprimir el valor del prompt en la consola
  //console.log(prompt);

  // Llamar a la función "run" con el valor del prompt
  run(prompt);
  setInputMessage("");
};
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="flex flex-col items-center w-full max-w-md space-y-4">
        <div className="w-full max-w-md text-center text-xl text-white font-bold">
          VIERA DIGITAL STUDIO AI
        </div>
        <form onSubmit={Submit} className="w-full max-w-md max-h-96 overflow-y-auto p-4 border border-gray-300 rounded-md shadow-xl bg-white">
        <p className="mb-2"></p>
          <ul className="space-y-4">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`text-black p-4 rounded-md ${message.sender === 'user' ? 'bg-blue-300' : 'bg-gray-300'}`}>
                  {message.text}
                </div>
              </li>
            ))}
          </ul>
          <br />
        <textarea
          type="text"
          placeholder="¿En que te puedo ayudar el día de hoy?"
          name="prompt"
          className="border-none outline-none p-4 rounded-lg text-black w-full"
          value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white border border-none outline-none p-4 rounded-lg text-black font-bold uppercase mt-2"
        >
          Submit
        </button>
      </form>
     
    </div>
    </div>
  );
}
