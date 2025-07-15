import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export const useKonamiCode = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setSequence(prev => {
        const newSequence = [...prev, event.code];
        
        // Keep only the last 10 keys
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }
        
        // Check if the sequence matches the Konami Code
        if (newSequence.length === KONAMI_CODE.length) {
          const matches = newSequence.every((key, index) => key === KONAMI_CODE[index]);
          if (matches) {
            setIsActivated(true);
            // Add some actual functionality
            const paymentField = document.getElementById('paymentOffer') as HTMLInputElement;
            if (paymentField) {
              paymentField.value = '1 diamond (CHEAT_DIAMONDS discount applied)';
            }
            // Reset after 10 seconds
            setTimeout(() => setIsActivated(false), 10000);
            return [];
          }
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isActivated };
};