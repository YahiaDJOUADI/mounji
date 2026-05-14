'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define available languages - adding English back
export type Language = "en" | "fr" | "ar";

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en", // Default to English
  setLanguage: () => {},
  t: () => "",
});

// Define props for the provider
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Safely fallback during SSR
    if (typeof window === "undefined") return "en";

    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    // Return saved language if valid, otherwise detect browser language or default to English
    if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Browser language detection
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "fr") return "fr";
    if (browserLang === "ar") return "ar";
    return "en"; // Default to English
  });

  // Update localStorage when language changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    
    // Update document direction for RTL support
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    
    // Add language class to html element
    document.documentElement.lang = lang;
  };

  // Initialize document direction on mount
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!key) return "";
    
    const translation = (translations[language] as Record<string, string>)?.[key];
    if (translation) return translation;
    
    // If translation not found, return the key
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Translations for all supported languages - adding English back
const translations = {
  en: {
    // Header navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.contact": "Contact",
    
    // Home page
    "home.hero.title": "Architecture & Interior Design",
    "home.hero.subtitle": "Creating timeless spaces that inspire and endure",
    "home.hero.cta": "Explore Projects",
    "home.featured": "Featured Projects",
    "home.featuredDesc": "A selection of our most innovative and impactful architectural and interior design projects.",
    "home.viewAll": "View All Projects",
    "home.about.title": "About Djouadi Mounji",
    "home.about.desc1": "With over a decade of experience in architecture and interior design, I bring a unique perspective and creative vision to every project.",
    "home.about.desc2": "My design philosophy centers on creating harmonious spaces that blend functionality with aesthetics, always considering the human experience and environmental impact.",
    "home.about.cta": "Learn More",
    "home.services": "Services",
    "home.servicesDesc": "Professional architectural and design services tailored to your specific needs and vision.",
    "home.allServices": "All Services",
    "home.cta.title": "Ready to Start Your Project?",
    "home.cta.desc": "Let's collaborate to transform your vision into reality. Contact us to discuss your project needs and explore how we can help.",
    "home.cta.button": "Get in Touch",
    
    // About page
    "about.header": "About Me",
    "about.subtitle": "Discover my journey, design philosophy, and professional experience in architecture and interior design.",
    "about.bio.title": "Djouadi Mounji",
    "about.bio.desc1": "With over 10 years of experience in architecture and interior design, I've developed a passion for creating spaces that harmonize functionality, aesthetics, and human experience.",
    "about.bio.desc2": "After completing my Master's in Architecture from the École Spéciale d'Architecture in Paris, I worked with several renowned design firms before founding my own studio in 2018.",
    "about.bio.desc3": "My work has been recognized with multiple design awards and has been featured in leading architectural and interior design publications including Architectural Digest and Dezeen.",
    "about.downloadCV": "Download CV",
    "about.philosophy.title": "My Design Philosophy",
    "about.philosophy.desc1": "I believe great design is about creating spaces that not only look beautiful but enhance the quality of life for the people who inhabit them.",
    "about.philosophy.desc2": "Each project begins with a deep understanding of the client's needs, the site's context, and the potential for innovation. I focus on creating timeless designs that balance form and function while embracing sustainable practices.",
    "about.philosophy.desc3": "My approach is collaborative and iterative, working closely with clients to refine concepts and ensure every detail contributes to the overall vision and purpose of the space.",
    "about.experience.title": "Professional Experience",
    "about.education.title": "Education & Qualifications",
    "about.education.subtitle": "Education",
    "about.certifications.title": "Certifications & Affiliations",
    
    // Projects page
    "projects.header": "Projects",
    "projects.subtitle": "Browse our portfolio of architectural and interior design projects spanning residential and commercial spaces.",
    "projects.filter.all": "All",
    "projects.filter.architecture": "Architecture",
    "projects.filter.interior": "Interior",
    "projects.filter.residential": "Residential",
    "projects.filter.commercial": "Commercial",
    "projects.location": "Location",
    "projects.year": "Year",
    "projects.category": "Category",
    "projects.viewDetails": "View Details",
    "projects.filter.noResults": "No projects found with the selected filter. Please try another category.",
    
    // Services page
    "services.header": "Our Services",
    "services.subtitle": "Comprehensive design solutions for architecture and interior spaces",
    
    // Contact page
    "contact.header": "Contact Us",
    "contact.subtitle": "Have a project in mind? Let's discuss how we can bring your vision to life.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone (optional)",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.address": "Address",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.followUs": "Follow Us",
    "contact.success": "Thank you! Your message has been sent. We'll get back to you shortly.",
    "contact.error": "An error occurred while sending your message. Please try again or contact us directly via email."
  },
  fr: {
    // Header navigation
    "nav.home": "Accueil",
    "nav.about": "À Propos",
    "nav.projects": "Projets",
    "nav.services": "Services",
    "nav.contact": "Contact",
    
    // Home page
    "home.hero.title": "Architecture & Design d'Intérieur",
    "home.hero.subtitle": "Création d'espaces intemporels qui inspirent et perdurent",
    "home.hero.cta": "Explorer les Projets",
    "home.featured": "Projets en Vedette",
    "home.featuredDesc": "Une sélection de nos projets architecturaux et de design d'intérieur les plus innovants et impactants.",
    "home.viewAll": "Voir Tous les Projets",
    "home.about.title": "À Propos de Djouadi Mounji",
    "home.about.desc1": "Avec plus d'une décennie d'expérience en architecture et design d'intérieur, j'apporte une perspective unique et une vision créative à chaque projet.",
    "home.about.desc2": "Ma philosophie de design se centre sur la création d'espaces harmonieux qui allient fonctionnalité et esthétique, en tenant toujours compte de l'expérience humaine et de l'impact environnemental.",
    "home.about.cta": "En Savoir Plus",
    "home.services": "Services",
    "home.servicesDesc": "Services professionnels d'architecture et de design adaptés à vos besoins et à votre vision spécifiques.",
    "home.allServices": "Tous les Services",
    "home.cta.title": "Prêt à Démarrer Votre Projet?",
    "home.cta.desc": "Collaborons pour transformer votre vision en réalité. Contactez-nous pour discuter de vos besoins et explorer comment nous pouvons vous aider.",
    "home.cta.button": "Nous Contacter",
    
    // About page
    "about.header": "À Propos de Moi",
    "about.subtitle": "Découvrez mon parcours, ma philosophie de design et mon expérience professionnelle en architecture et design d'intérieur.",
    "about.bio.title": "Djouadi Mounji",
    "about.bio.desc1": "Avec plus de 10 ans d'expérience en architecture et design d'intérieur, j'ai développé une passion pour créer des espaces qui harmonisent fonctionnalité, esthétique et expérience humaine.",
    "about.bio.desc2": "Après avoir obtenu mon Master en Architecture à l'École Spéciale d'Architecture de Paris, j'ai travaillé avec plusieurs firmes de design renommées avant de fonder mon propre studio en 2018.",
    "about.bio.desc3": "Mon travail a été reconnu par de multiples prix de design et a été présenté dans des publications importantes d'architecture et de design d'intérieur, notamment Architectural Digest et Dezeen.",
    "about.downloadCV": "Télécharger CV",
    "about.philosophy.title": "Ma Philosophie de Design",
    "about.philosophy.desc1": "Je crois qu'un excellent design consiste à créer des espaces qui non seulement sont beaux, mais qui améliorent aussi la qualité de vie des personnes qui les habitent.",
    "about.philosophy.desc2": "Chaque projet commence par une compréhension approfondie des besoins du client, du contexte du site et du potentiel d'innovation. Je me concentre sur la création de designs intemporels qui équilibrent forme et fonction tout en adoptant des pratiques durables.",
    "about.philosophy.desc3": "Mon approche est collaborative et itérative, travaillant étroitement avec les clients pour affiner les concepts et s'assurer que chaque détail contribue à la vision et à l'objectif global de l'espace.",
    "about.experience.title": "Expérience Professionnelle",
    "about.education.title": "Éducation & Qualifications",
    "about.education.subtitle": "Éducation",
    "about.certifications.title": "Certifications & Affiliations",
    
    // Projects page
    "projects.header": "Projets",
    "projects.subtitle": "Parcourez notre portfolio de projets d'architecture et de design d'intérieur couvrant des espaces résidentiels et commerciaux.",
    "projects.filter.all": "Tous",
    "projects.filter.architecture": "Architecture",
    "projects.filter.interior": "Intérieur",
    "projects.filter.residential": "Résidentiel",
    "projects.filter.commercial": "Commercial",
    "projects.location": "Lieu",
    "projects.year": "Année",
    "projects.category": "Catégorie",
    "projects.viewDetails": "Voir les Détails",
    
    // Services page
    "services.header": "Nos Services",
    "services.subtitle": "Solutions de design complètes pour l'architecture et les espaces intérieurs",
    
    // Contact page
    "contact.header": "Contactez-Nous",
    "contact.subtitle": "Vous avez un projet en tête ? Discutons de la façon dont nous pouvons donner vie à votre vision.",
    "contact.form.name": "Nom",
    "contact.form.email": "Email",
    "contact.form.phone": "Téléphone (optionnel)",
    "contact.form.message": "Message",
    "contact.form.submit": "Envoyer le Message",
    "contact.address": "Adresse",
    "contact.email": "Email",
    "contact.phone": "Téléphone",
    "contact.followUs": "Suivez-Nous",
    "contact.success": "Merci ! Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.",
    "contact.error": "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer ou nous contacter directement par email."
  },
  
  ar: {
    // Header navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.projects": "المشاريع",
    "nav.services": "الخدمات",
    "nav.contact": "اتصل بنا",
    
    // Home page
    "home.hero.title": "الهندسة المعمارية والتصميم الداخلي",
    "home.hero.subtitle": "إنشاء مساحات خالدة تلهم وتدوم",
    "home.hero.cta": "استكشاف المشاريع",
    "home.featured": "مشاريع مميزة",
    "home.featuredDesc": "مجموعة مختارة من أكثر مشاريعنا المعمارية والتصميم الداخلي ابتكارًا وتأثيرًا.",
    "home.viewAll": "عرض كل المشاريع",
    "home.about.title": "عن جواد منجي",
    "home.about.desc1": "مع أكثر من عقد من الخبرة في الهندسة المعمارية والتصميم الداخلي، أقدم منظورًا فريدًا ورؤية إبداعية لكل مشروع.",
    "home.about.desc2": "تتمحور فلسفتي في التصميم حول إنشاء مساحات متناغمة تمزج بين الوظائف والجماليات، مع مراعاة التجربة الإنسانية والتأثير البيئي دائمًا.",
    "home.about.cta": "اعرف المزيد",
    "home.services": "الخدمات",
    "home.servicesDesc": "خدمات معمارية واحترافية مصممة خصيصًا لتلبية احتياجاتك ورؤيتك.",
    "home.allServices": "جميع الخدمات",
    "home.cta.title": "هل أنت مستعد لبدء مشروعك؟",
    "home.cta.desc": "دعنا نتعاون لتحويل رؤيتك إلى حقيقة. اتصل بنا لمناقشة احتياجات مشروعك واستكشاف كيف يمكننا المساعدة.",
    "home.cta.button": "تواصل معنا",
    
    // About page
    "about.header": "نبذة عني",
    "about.subtitle": "تعرف على رحلتي وفلسفة التصميم وخبرتي المهنية في الهندسة المعمارية والتصميم الداخلي.",
    "about.bio.title": "جواد منجي",
    "about.bio.desc1": "مع أكثر من 10 سنوات من الخبرة في الهندسة المعمارية والتصميم الداخلي، طورت شغفًا بإنشاء مساحات تجمع بين الوظائف والجماليات والتجربة الإنسانية.",
    "about.bio.desc2": "بعد إكمال درجة الماجستير في الهندسة المعمارية من مدرسة الهندسة المعمارية الخاصة في باريس، عملت مع العديد من شركات التصميم المرموقة قبل تأسيس استوديو خاص بي في عام 2018.",
    "about.bio.desc3": "حصل عملي على اعتراف بجوائز تصميم متعددة وتم عرضه في منشورات رائدة في مجال الهندسة المعمارية والتصميم الداخلي بما في ذلك Architectural Digest و Dezeen.",
    "about.downloadCV": "تحميل السيرة الذاتية",
    "about.philosophy.title": "فلسفتي في التصميم",
    "about.philosophy.desc1": "أعتقد أن التصميم الرائع يتعلق بإنشاء مساحات لا تبدو جميلة فحسب، بل تعزز أيضًا جودة الحياة للأشخاص الذين يسكنونها.",
    "about.philosophy.desc2": "يبدأ كل مشروع بفهم عميق لاحتياجات العميل وسياق الموقع وإمكانية الابتكار. أركز على إنشاء تصاميم خالدة توازن بين الشكل والوظيفة مع تبني الممارسات المستدامة.",
    "about.philosophy.desc3": "منهجي تعاوني وتكراري، والعمل عن كثب مع العملاء لتحسين المفاهيم وضمان أن كل تفصيل يساهم في الرؤية والغرض العام للمساحة.",
    "about.experience.title": "الخبرة المهنية",
    "about.education.title": "التعليم والمؤهلات",
    "about.education.subtitle": "التعليم",
    "about.certifications.title": "الشهادات والعضويات",
    
    // Projects page
    "projects.header": "المشاريع",
    "projects.subtitle": "تصفح مجموعة مشاريعنا في الهندسة المعمارية والتصميم الداخلي التي تشمل المساحات السكنية والتجارية.",
    "projects.filter.all": "الكل",
    "projects.filter.architecture": "هندسة معمارية",
    "projects.filter.interior": "تصميم داخلي",
    "projects.filter.residential": "سكني",
    "projects.filter.commercial": "تجاري",
    "projects.location": "الموقع",
    "projects.year": "السنة",
    "projects.category": "الفئة",
    "projects.viewDetails": "عرض التفاصيل",
    
    // Services page
    "services.header": "خدماتنا",
    "services.subtitle": "حلول تصميم شاملة للهندسة المعمارية والمساحات الداخلية",
    
    // Contact page
    "contact.header": "تواصل معنا",
    "contact.subtitle": "هل لديك مشروع في ذهنك؟ دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع.",
    "contact.form.name": "الاسم",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.phone": "الهاتف (اختياري)",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال الرسالة",
    "contact.address": "العنوان",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "الهاتف",
    "contact.followUs": "تابعنا",
    "contact.success": "شكرًا لك! تم إرسال رسالتك. سنرد عليك قريبًا.",
    "contact.error": "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة عبر البريد الإلكتروني."
  }
};

export default LanguageContext;

