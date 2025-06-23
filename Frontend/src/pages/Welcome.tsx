
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Code, Zap, MessageCircle, ArrowRight, Star, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartInterview = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/chat');
    }, 800);
  };

  const features = [
    {
      icon: Brain,
      title: "AI/ML Expertise",
      description: "Deep learning, neural networks, and machine learning projects",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Modern web technologies, APIs, and scalable architectures",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "System optimization, algorithm efficiency, and scalability",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { icon: Star, label: "Years Experience", value: "5+" },
    { icon: Code, label: "Projects Completed", value: "50+" },
    { icon: Users, label: "Technologies Mastered", value: "20+" },
    { icon: Award, label: "Certifications", value: "10+" }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 transition-all duration-800 ${isAnimating ? 'scale-95 opacity-50' : ''}`}>
      {/* Header */}
      <div className="border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                HiteshBot Interview
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-emerald-600 font-medium">Ready to Chat</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-6 animate-pulse">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  HK
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-slate-800 mb-4">
              Meet <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Hitesh Kumar</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              AI/ML Engineer & Full-Stack Developer with 5+ years of experience building 
              intelligent systems and scalable applications. Ready to discuss my expertise, 
              projects, and how I can contribute to your team.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Chatbot Introduction */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 mb-12 border border-slate-200/50">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Interview with <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">HiteshBot</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              I'm an AI-powered interview assistant trained on Hitesh's professional background, 
              projects, and expertise. Ask me anything about his skills, experience, or specific projects!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/50 rounded-2xl p-6">
              <h4 className="font-semibold text-slate-800 mb-3">What you can ask about:</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Technical skills and programming languages
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  AI/ML projects and methodologies
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  Full-stack development experience
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  Educational background and certifications
                </li>
              </ul>
            </div>
            <div className="bg-white/50 rounded-2xl p-6">
              <h4 className="font-semibold text-slate-800 mb-3">Interview features:</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Real-time conversational responses
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Pre-built HR interview questions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  Detailed project explanations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  Interactive chat experience
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleStartInterview}
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-lg px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Start Interviewing
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-sm text-slate-500 mt-4">
              Click to begin your interactive interview session
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500">
          <p className="text-sm">
            © 2024 Hitesh Kumar. Powered by AI for seamless interview experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
