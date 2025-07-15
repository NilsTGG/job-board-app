import React from 'react';
import { Star, Quote } from 'lucide-react';
import AccessibleCarousel from './AccessibleCarousel';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "xXDragonSlayerXx",
      rating: 5,
      text: "I was too lazy to walk 500 blocks. Best decision ever. The courier's attitude made it even better.",
      item: "64 Cobblestone blocks"
    },
    {
      name: "BuilderBob2024",
      rating: 4,
      text: "Fast delivery, reasonable price. The friendly attitude was a nice bonus.",
      item: "Redstone components"
    },
    {
      name: "NoobMiner",
      rating: 5,
      text: "I got lost in my own mine. This service saved my life. And my dignity. Well, what was left of it.",
      item: "Food and torches"
    },
    {
      name: "PvPMaster",
      rating: 3,
      text: "Delivered to a PvP zone. Courier somehow survived and delivered with style. Respect.",
      item: "Diamond armor set"
    },
    {
      name: "CasualPlayer",
      rating: 5,
      text: "I just wanted someone to bring me wood while I built. Got wood and a comedy show.",
      item: "Oak wood logs"
    },
    {
      name: "EndermanFriend",
      rating: 4,
      text: "Delivered to the End dimension. Courier complained the entire time but got it done.",
      item: "Ender pearls"
    }
  ];

  // Convert testimonials to carousel items
  const carouselItems = testimonials.map((testimonial, index) => ({
    id: `testimonial-${index}`,
    title: `Review by ${testimonial.name}`,
    content: (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < testimonial.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <Quote className="h-5 w-5 text-blue-400" />
        </div>
        
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          "{testimonial.text}"
        </p>
        
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-medium text-sm">{testimonial.name}</p>
              <p className="text-gray-500 text-xs">Ordered: {testimonial.item}</p>
            </div>
            <div className="text-blue-400 text-xs">
              Verified Purchase
            </div>
          </div>
        </div>
      </div>
    )
  }));

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What People Say (When They're Not Complaining)
          </h2>
          <p className="text-xl text-gray-400">
            Real reviews from real people who made questionable life choices
          </p>
        </div>

        {/* Accessible Carousel Implementation */}
        <AccessibleCarousel
          items={carouselItems}
          autoPlay={false}
          showControls={true}
          ariaLabel="Customer testimonials and reviews"
        />
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            * Reviews are real. The courier's personality is unfortunately also real.
          </p>
          <p className="text-gray-500 text-xs mt-4 italic">
            Disclaimer: All reviews shown above are entirely fictional and provided for demonstration purposes only.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;