import AsciiAnimation from "./ascii-animation"

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen pt-20 flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <AsciiAnimation />

        <div className="text-center mt-8 md:mt-12">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-tight max-w-5xl mx-auto">
            Engineering <span className="text-purple-500">Solutions</span> for Every Challenge
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Introducing TalkingCV, a Langchain/RAG based chatbot with the context of my academic and professional life,
            ready to answer any question you may have about me!
          </p>

          <div className="mt-8">
            <a
              href="#chatbot"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors rounded-md shadow-sm"
            >
              Ask Me Anything
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
