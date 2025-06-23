
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Code, Zap, MessageCircle, ArrowRight, Star, Users, Award, Rocket, Target, Trophy } from "lucide-react";
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
      description: "Deep learning, neural networks, and machine learning projects with cutting-edge frameworks",
      gradient: "from-blue-500 via-blue-600 to-purple-600",
      hoverGradient: "hover:from-blue-600 hover:via-blue-700 hover:to-purple-700"
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Modern web technologies, APIs, and scalable architectures using latest tools",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      hoverGradient: "hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "System optimization, algorithm efficiency, and enterprise-level scalability",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      hoverGradient: "hover:from-orange-600 hover:via-red-600 hover:to-pink-600"
    }
  ];

  const achievements = [
    { icon: Rocket, text: "AI Model Development", gradient: "from-violet-500 to-purple-500" },
    { icon: Target, text: "Problem Solving", gradient: "from-blue-500 to-indigo-500" },
    { icon: Trophy, text: "Innovation", gradient: "from-amber-500 to-orange-500" },
    { icon: Sparkles, text: "Leadership", gradient: "from-pink-500 to-rose-500" }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 transition-all duration-800 ${isAnimating ? 'scale-95 opacity-50' : ''}`}>
      {/* Enhanced Header */}
      <div className="border-b border-slate-200/50 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/36903912-7c9d-408f-8dc8-f39bd28a12be.png" 
                    alt="Hitesh Kumar"
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  HiteshBot Interview
                </span>
                <p className="text-xs text-slate-500 font-medium">AI-Powered Portfolio Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-emerald-700 font-medium">Ready to Chat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-12">
            <div className="relative group">
              <div className="w-40 h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-8 overflow-hidden transition-transform duration-300 hover:scale-105">
                <img 
                  src="/lovable-uploads/36903912-7c9d-408f-8dc8-f39bd28a12be.png" 
                  alt="Hitesh Kumar"
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Meet <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Hitesh Kumar</span>
            </h1>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              AI/ML Engineer & Full-Stack Developer with <span className="font-semibold text-blue-600">1+ years</span> of experience building 
              intelligent systems and scalable applications. Ready to discuss my expertise, 
              projects, and how I can contribute to your team.
            </p>
            
            {/* Achievement Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${achievement.gradient} rounded-full text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105`}>
                  <achievement.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{achievement.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Star, label: "Years Experience", value: "1+", color: "text-blue-600" },
              { icon: Code, label: "Projects Completed", value: "30+", color: "text-emerald-600" },
              { icon: Users, label: "Technologies Mastered", value: "20+", color: "text-purple-600" },
              { icon: Award, label: "Certifications", value: "10+", color: "text-orange-600" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-10 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mb-8 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 transition-colors duration-300 group-hover:text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg transition-colors duration-300 group-hover:text-slate-700">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Chatbot Introduction */}
        <div className="relative bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 md:p-16 border border-slate-200/50 shadow-xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <div className="text-center mb-10">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Interview with <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">HiteshBot</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                I'm an AI-powered interview assistant trained on Hitesh's professional background, 
                projects, and expertise. Ask me anything about his skills, experience, or specific projects!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white/50 rounded-2xl p-8">
                <h4 className="font-semibold text-slate-800 mb-4">What you can ask about:</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Technical skills and programming languages
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    AI/ML projects and methodologies
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    Full-stack development experience
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    Educational background and certifications
                  </li>
                </ul>
              </div>
              <div className="bg-white/50 rounded-2xl p-8">
                <h4 className="font-semibold text-slate-800 mb-4">Interview features:</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Real-time conversational responses
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Pre-built HR interview questions
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    Detailed project explanations
                  </li>
                  <li className="flex items-center gap-3">
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
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-xl px-16 py-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
              >
                <MessageCircle className="w-7 h-7 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                Start Interviewing
                <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <p className="text-sm text-slate-500 mt-6 font-medium">
                Click to begin your interactive interview session
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center text-slate-500 mt-16 pt-8 border-t border-slate-200/50">
          <p className="text-sm">
            © 2024 Hitesh Kumar. Powered by AI for seamless interview experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
