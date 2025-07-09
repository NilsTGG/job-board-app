import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "How do I pay in diamonds?",
      answer: "Drop them in a chest at the pickup location. If they're fake, I'll know, and I might be a bit less enthusiastic."
    },
    {
      question: "What if you don't deliver my items?",
      answer: "Then you learned a valuable lesson about trusting strangers on the internet. But don't worry, I have a 100% delivery rate because I'm too lazy to deal with refunds."
    },
    {
      question: "Can you deliver to the Nether?",
      answer: "Sure, if you want to pay double. Heat makes me cranky, and you don't want to see me cranky. Well, crankier."
    },
    {
      question: "What if I don't have enough diamonds?",
      answer: "Then you probably shouldn't be ordering delivery service. Go mine some diamonds like everyone else had to at some point."
    },
    {
      question: "Are you actually reliable?",
      answer: "I'm as reliable as your WiFi connection during a thunderstorm. But hey, at least I'm honest about it."
    },
    {
      question: "What happens if my items get stolen?",
      answer: "I take secure routes and use ender chests for backup. If someone manages to steal your dirt blocks, they probably needed them more than you."
    },
    {
      question: "Can I tip you?",
      answer: "Tips are accepted in the form of diamonds, compliments about my sparkling personality, or just leaving me alone after delivery."
    },
    {
      question: "Do you deliver to banned players?",
      answer: "If you're banned, you have bigger problems than getting your items delivered. Sort your life out first."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="flex items-center gap-3 mx-auto bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition-colors group"
          >
            <HelpCircle className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">
              Questions People Actually Ask
            </span>
            {isVisible ? (
              <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
            )}
          </button>
          {isVisible && (
            <p className="text-lg text-gray-300 mt-4">
              The answers you didn't know you needed (but definitely do)
            </p>
          )}
        </div>

        {isVisible && (
          <div className="space-y-3 mt-8">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
                >
                  <span className="text-white font-medium text-sm md:text-base">{item.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-4 w-4 md:h-5 md:w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-4 md:px-6 pb-3 md:pb-4 border-t border-gray-700">
                    <p className="text-gray-200 mt-3 text-sm md:text-base">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;