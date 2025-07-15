export class NavigationService {
  private static scrollBehavior: ScrollBehavior = 'smooth';

  static setScrollBehavior(behavior: ScrollBehavior): void {
    this.scrollBehavior = behavior;
  }

  static scrollToSection(sectionId: string, offset: number = 80): void {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: this.scrollBehavior
    });

    // Update URL hash without triggering scroll
    if (history.replaceState) {
      history.replaceState(null, '', `#${sectionId}`);
    }

    // Focus management for accessibility
    setTimeout(() => {
      element.focus({ preventScroll: true });
    }, 300);
  }

  static scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: this.scrollBehavior
    });
  }

  static preloadSection(sectionId: string): void {
    // Preload any lazy-loaded content for the section
    const element = document.getElementById(sectionId);
    if (element) {
      // Trigger intersection observer early
      const event = new CustomEvent('preload-section', { detail: { sectionId } });
      element.dispatchEvent(event);
    }
  }

  static getCurrentSection(): string {
    const sections = ['hero', 'services', 'pricing', 'submit-job'];
    const scrollPosition = window.scrollY + 100;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const elementBottom = elementTop + rect.height;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          return sectionId;
        }
      }
    }

    return sections[0];
  }

  static setupScrollTracking(callback: (section: string) => void): () => void {
    const handleScroll = () => {
      const currentSection = this.getCurrentSection();
      callback(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
}