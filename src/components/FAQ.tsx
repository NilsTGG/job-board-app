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
      question: "Why would I pay extra when I could just get it myself?",
      answer: "Because you won't. That's literally the name of the service. You're paying for your time, zero risk, and the guarantee it actually gets done instead of sitting in your 'I'll do it later' pile."
    },
    {
      question: "Can you buy items for me if I don't have them?",
      answer: "Yes, I'm basically Minecraft Instacart but with more attitude. You pay me back the item cost plus my fee plus emotional damage for enabling your laziness."
    },
    {
      question: "What if I can't pay you back right away?",
      answer: "Then you get custom debt reminder messages and interest calculated in disappointment. I'm very creative with my collection methods."
    },
    {
      question: "Do you deliver to dangerous areas?",
      answer: "Nether, End, PvP zones - sure. I charge extra for the privilege of potentially dying for your convenience. Danger tax is non-negotiable."
    },
    {
      question: "Why are you so sarcastic?",
      answer: "Because I'm a professional courier in a block game dealing with people who pay me to walk places they could walk themselves. The sarcasm is included in the service fee."
    },
    {
      question: "Can you help me find sellers?",
      answer: "Yes, I'll find sellers you're too lazy to locate and negotiate prices you're too awkward to discuss. It's like having a personal shopper, but for blocks."
    },
    {
      question: "What if the seller scams me?",
      answer: "That's why you use me as a middleman. I handle the transaction so you don't have to trust random players with your precious diamonds. Trust issues sold separately."
    },
    {
      question: "How do I know you won't just steal my stuff?",
      answer: "Because stealing would require me to care enough to be dishonest. I'm too lazy for crime. Plus, my reputation is worth more than your stack of cobblestone."
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