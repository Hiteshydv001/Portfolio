
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export const ProjectsSection = () => {
  const projects = [
    {
      name: "AI-Powered Content Generator",
      description: "A sophisticated content generation platform using GPT-4 and custom fine-tuned models for creating high-quality, contextually relevant content across multiple domains.",
      technologies: ["Python", "OpenAI API", "FastAPI", "React", "PostgreSQL"],
      category: "Generative AI"
    },
    {
      name: "Intelligent Document Analysis System",
      description: "Multi-modal AI system for extracting, analyzing, and summarizing information from complex documents using computer vision and NLP techniques.",
      technologies: ["Python", "TensorFlow", "spaCy", "OpenCV", "LangChain"],
      category: "Document AI"
    },
    {
      name: "Real-time Sentiment Analysis Engine",
      description: "Scalable sentiment analysis platform processing social media streams with custom BERT models, providing real-time insights and trend detection.",
      technologies: ["Python", "PyTorch", "Kafka", "Redis", "Docker"],
      category: "NLP & Analytics"
    },
    {
      name: "AI Chatbot Framework",
      description: "Extensible conversational AI framework with RAG capabilities, memory management, and tool integration for building domain-specific intelligent assistants.",
      technologies: ["Python", "LangChain", "ChromaDB", "FastAPI", "WebSocket"],
      category: "Conversational AI"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
            Showcasing innovative AI solutions that push the boundaries of what's possible
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.name} 
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="border-purple-500/50 text-purple-300 bg-purple-900/20">
                    {project.category}
                  </Badge>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                  {project.name}
                </CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
