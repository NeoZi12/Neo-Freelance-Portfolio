export type Locale = "en" | "he";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, i'm",
      name: "Neo",
      headline1: "Freelance",
      headline2: "Web",
      headline3: "Developer",
      description:
        "I design and build clean, responsive websites for businesses, brands, and personal projects, creating digital experiences that are clear, modern, and easy to use.",
      cta1: "My Work",
      cta2: "Contact Me",
    },
    about: {
      title1: "About",
      title2: "Me",
      description: [
        "I'm a 23-year-old software engineer and freelance web developer who cares about building websites that feel alive — not just something that works.",
        "I see every website as a story. It should reflect who you are, what you do, and how you want people to feel when they land on it. That's what I focus on — creating something that actually connects with people, not just another generic site.",
        "My goal is simple: build websites that look great, feel natural to use, and represent your brand in the best way possible.",
      ],
      cta: "Contact Me",
      techLabel: "Technologies I work with",
      p1Highlights: ["freelance web developer", "websites that feel alive"],
      p3Highlight: "represent your brand",
    },
    services: {
      headingRegular: "My",
      headingOrange: "Services",
      cta: "Contact Me",
      items: [
        {
          title: "Portfolio Page",
          description:
            "Modern portfolio websites for freelancers and individuals, designed to present your work clearly and help you stand out online.",
          highlights: ["for freelancers and individuals", "present your work"],
        },
        {
          title: "Landing Page",
          description:
            "Clean landing pages for businesses, designed to strengthen your digital footprint and present your business clearly to potential customers.",
          highlights: ["for businesses", "present your business"],
        },
        {
          title: "Full-Stack Website",
          description:
            "Custom websites for businesses, built with the features, data, and functionality needed to create a fully functioning online experience.",
          highlights: ["for businesses", "data", "fully functioning"],
        },
      ],
    },
    portfolio: {
      headingRegular: "Featured",
      headingOrange: "Work",
      viewProject: "View Project",
      goToWebsite: "Go to Website",
      projects: [
        {
          name: "Jobizz - AI-integrated full-stack website",
          description:
            "A fully functional web application for a tax consulting office that manages client data, appointments, and business operations.",
        },
        {
          name: "UGC Creator Portfolio Page",
          description:
            "A modern portfolio website showcasing UGC content, brand collaborations, and creative work.",
        },
        {
          name: "Software Developer Portfolio Page",
          description:
            "A software developer portfolio website showcasing projects, technical skills, and real-world applications.",
        },
      ],
    },
    contact: {
      heading1: "Let's work",
      heading2: "together",
      subheading: "If you have a project in mind, I'd love to hear from you.",
      social: {
        linkedin: "Connect with me",
        github: "See my code",
      },
      formHeading: "Send Message",
      placeholders: {
        name: "Full Name",
        email: "Email Address",
        message: "Type your message...",
      },
      submit: "Send Message",
      sending: "Sending...",
      cooldown: "Wait {secs}s",
      success: "Message sent! I'll get back to you soon.",
      error: "Something went wrong. Please try again or reach out directly.",
      validation: {
        nameRequired: "Please enter your full name.",
        nameMin: "Name must be at least 2 characters.",
        emailRequired: "Please enter your email address.",
        emailInvalid: "Please enter a valid email address.",
        messageRequired: "Please type your message.",
        messageMax: "Message must be under {max} characters.",
      },
    },
    footer: {
      copyrightPrefix: "© 2026 ",
      copyrightSuffix: ". All rights reserved.",
      backToTop: "Back to top",
    },
  },
  he: {
    nav: {
      home: "בית",
      about: "אודות",
      services: "שירותים",
      portfolio: "תיק עבודות",
      contact: "צור קשר",
    },
    hero: {
      greeting: "היי, אני",
      name: "ניאו",
      headline1: "מפתח",
      headline2: "אתרים",
      headline3: "פרילנסר",
      description:
        "אני מעצב ובונה אתרים נקיים ורספונסיביים לעסקים, מותגים ופרויקטים אישיים — ויוצר חוויות דיגיטליות שהן ברורות, מודרניות וקלות לשימוש.",
      cta1: "העבודות שלי",
      cta2: "יצירת קשר",
    },
    about: {
      title1: "קצת",
      title2: "עליי",
      description: [
        "אני בוגר הנדסת תוכנה בן 23 ומפתח אתרים פרילנסר שאכפת לו לבנות אתרים שמרגישים חיים — לא רק משהו שעובד.",
        "אני רואה כל אתר כסיפור. הוא צריך לשקף מי אתה, מה אתה עושה, ואיך אתה רוצה שאנשים ירגישו כשהם נוחתים עליו. על זה אני מתמקד — ליצור משהו שבאמת מתחבר לאנשים, לא עוד אתר גנרי.",
        "המטרה שלי פשוטה: לבנות אתרים שנראים מעולה, מרגישים טבעיים לשימוש, ומייצגים את המותג שלך בצורה הטובה ביותר.",
      ],
      cta: "יצירת קשר",
      techLabel: "טכנולוגיות שאני עובד איתן",
      p1Highlights: ["מפתח אתרים פרילנסר", "אתרים שמרגישים חיים"],
      p3Highlight: "מייצגים את המותג שלך",
    },
    services: {
      headingRegular: "מה אני",
      headingOrange: "מציע",
      cta: "יצירת קשר",
      items: [
        {
          title: "דף פורטפוליו",
          description:
            "אתרי פורטפוליו מודרניים לפרילנסרים ואנשים פרטיים, שנועדו להציג את העבודות שלך בצורה ברורה ולעזור לך לבלוט ברשת.",
          highlights: ["לפרילנסרים ואנשים פרטיים", "להציג את העבודות שלך"],
        },
        {
          title: "דף נחיתה",
          description:
            "דפי נחיתה נקיים לעסקים, שנועדו לחזק את הנוכחות הדיגיטלית שלך ולהציג את העסק שלך בצורה ברורה ללקוחות פוטנציאליים.",
          highlights: ["לעסקים", "להציג את העסק שלך"],
        },
        {
          title: "אתר פול-סטאק",
          description:
            "בניית אתרים מותאמים אישית לעסקים, הכוללים עבודה עם נתונים ומערכת מתפקדת, ליצירת חוויית שימוש מלאה ואפקטיבית.",
          highlights: ["לעסקים", "נתונים", "מלאה ואפקטיבית"],
        },
      ],
    },
    portfolio: {
      headingRegular: "עבודות",
      headingOrange: "נבחרות",
      viewProject: "צפייה בפרויקט",
      goToWebsite: "מעבר לאתר",
      projects: [
        {
          name: "Jobizz -  AI אתר פול-סטאק עם שילוב",
          description:
            "אפליקציית ווב מלאת תפקוד למשרד ייעוץ מס, המנהלת נתוני לקוחות, פגישות ותפעול עסקי.",
        },
        {
          name: "UGC דף פורטפוליו ליוצר",
          description:
            "אתר פורטפוליו מודרני המציג תוכן UGC, שיתופי פעולה עם מותגים ועבודות יצירתיות.",
        },
        {
          name: "דף פורטפוליו למפתח תוכנה",
          description:
            "אתר פורטפוליו למפתח תוכנה המציג פרויקטים, כישורים טכניים ואפליקציות מהעולם האמיתי.",
        },
      ],
    },
    contact: {
      heading1: "בואו נעבוד",
      heading2: "ביחד",
      subheading: "אם יש לך פרויקט בראש, אשמח לשמוע ממך.",
      social: {
        linkedin: "התחבר איתי",
        github: "ראה את הקוד שלי",
      },
      formHeading: "שליחת הודעה",
      placeholders: {
        name: "שם מלא",
        email: "כתובת אימייל",
        message: "כתוב את ההודעה שלך...",
      },
      submit: "שלח הודעה",
      sending: "שולח...",
      cooldown: "המתן {secs} שניות",
      success: "ההודעה נשלחה! אחזור אליך בקרוב.",
      error: "משהו השתבש. נסה שוב או פנה אליי ישירות.",
      validation: {
        nameRequired: "אנא הכנס את שמך המלא.",
        nameMin: "השם חייב להכיל לפחות 2 תווים.",
        emailRequired: "אנא הכנס את כתובת האימייל שלך.",
        emailInvalid: "אנא הכנס כתובת אימייל תקינה.",
        messageRequired: "אנא כתוב את ההודעה שלך.",
        messageMax: "ההודעה חייבת להיות פחות מ-{max} תווים.",
      },
    },
    footer: {
      copyrightPrefix: "כל הזכויות שמורות. ",
      copyrightSuffix: " 2026 ©",
      backToTop: "חזרה למעלה",
    },
  },
} as const;

export type Translations = typeof translations;
