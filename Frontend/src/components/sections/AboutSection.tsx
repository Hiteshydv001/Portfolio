
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Zap } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about-section" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm a passionate AI/ML Engineer with expertise in developing cutting-edge generative AI solutions. 
              My journey spans from traditional machine learning to the latest advances in large language models 
              and neural networks.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              I specialize in building intelligent systems that solve real-world problems, with a focus on 
              natural language processing, computer vision, and automated reasoning. My approach combines 
              theoretical knowledge with practical implementation to deliver robust AI solutions.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {["Python", "TensorFlow", "PyTorch", "LangChain", "OpenAI", "Hugging Face", "FastAPI", "React"].map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-purple-900/50 text-purple-200 hover:bg-purple-800/50">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid gap-6">
            <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">AI Research</h3>
              </div>
              <p className="text-gray-300">
                Deep expertise in machine learning algorithms, neural architectures, and AI model optimization.
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-blue-900/20 to-teal-900/20 border-blue-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Development</h3>
              </div>
              <p className="text-gray-300">
                Full-stack AI application development with modern frameworks and cloud deployment.
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-teal-900/20 to-green-900/20 border-teal-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-teal-600/20 rounded-lg">
                  <Zap className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Innovation</h3>
              </div>
              <p className="text-gray-300">
                Pioneering solutions in generative AI, LLMs, and intelligent automation systems.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
