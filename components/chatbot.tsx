"use client"

import React, { useState, useRef, useEffect } from "react"
import "./chatbot.css"

interface Message {
  sender: "user" | "bot"
  text: string
}

interface UserInfo {
  name: string
  company: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [showUserForm, setShowUserForm] = useState(true)
  const [formData, setFormData] = useState({ name: "", company: "" })
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [messages])

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim() && formData.company.trim()) {
      setUserInfo(formData)
      setShowUserForm(false)
      setMessages([
        { sender: "bot", text: `Hello ${formData.name}! 👋 I'm Vishad's AI assistant, here to share insights about his professional journey, academic background, and expertise. I'm excited to help you learn more about his work and experience. What would you like to know?` }
      ])
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !userInfo) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { sender: "user", text: userMessage }])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("http://198.199.85.137:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
          visitor_name: userInfo.name,
          visitor_company: userInfo.company,
          conversation_history: messages
            .filter(msg => msg.sender === "user" || msg.sender === "bot")
            .map(msg => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`)
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      setMessages(prev => [...prev, { sender: "bot", text: data.response }])
    } catch (error) {
      console.error("Error:", error)
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "Sorry, I'm having trouble connecting right now. Please try again later." 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chatbot-wrapper">
      <div className={`chatbot-container ${showUserForm ? 'blurred' : ''}`}>
        <div className="chatbot-header">TalkingCV - Ask me anything!</div>
        
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chatbot-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message bot loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input-row" onSubmit={handleSend}>
          <input
            className="chatbot-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading || showUserForm}
          />
          <button 
            className="chatbot-send-btn" 
            type="submit"
            disabled={isLoading || showUserForm}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>

      {showUserForm && (
        <div className="user-info-overlay">
          <div className="user-info-modal">
            <h3>Welcome! Let's get started</h3>
            <p>Please introduce yourself to begin our conversation</p>
            <form onSubmit={handleUserInfoSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company/Occupation</label>
                <input
                  id="company"
                  type="text"
                  placeholder="Your company or occupation"
                  value={formData.company}
                  onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="start-chat-btn">
                Start Chatting
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 