export type Locale = "en" | "he";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      howItWorks: "Process",
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
        "I design and build clean, modern websites that help businesses turn visitors into clients.",
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
    howItWorks: {
      sectionTitle1: "How It",
      sectionTitle2: "Works",
      subtitle:
        "A simple, guided process to take your website from idea to launch.",
      stepsTitle: "Step-by-Step Process",
      faqTitle: "Frequently Asked Questions",
      steps: [
        {
          number: "1",
          title: "Requirements & Goals",
          description:
            "We start by talking about your business, your goals, and what kind of website you need. We'll also go over the content, features, and overall direction so everything is clear before the project begins.",
        },
        {
          number: "2",
          title: "Content & Structure",
          description:
            "We organize the content your website needs, such as text, images, sections, and important information. If you're missing anything, I'll guide you through what to prepare so we can build the site the right way.",
        },
        {
          number: "3",
          title: "Design Direction",
          description:
            "Once everything is clear, I create the visual direction of the website. This includes the layout, style, and overall look, making sure it fits your brand and feels clear, modern, and professional.",
        },
        {
          number: "4",
          title: "Development & Revisions",
          description:
            "I build the website and turn the design into a real, responsive experience. You'll be able to review it, request changes, and we'll refine everything until it feels right.",
        },
        {
          number: "5",
          title: "Deployment & Launch",
          description:
            "Once the website is approved, I deploy it and help get it live. If needed, I'll also guide you through domain and hosting so the launch process feels simple and stress-free.",
        },
      ],
      faqs: [
        {
          q: "Do I need to have all the content ready before we start?",
          a: "Not at all. If you already have content, that's great — but if not, I'll guide you through exactly what's needed and can help you create or structure it so everything fits your website perfectly.",
        },
        {
          q: "How long does the whole process take?",
          a: "It depends on the scope of the project. Smaller projects like landing pages or portfolio websites are usually completed relatively quickly, while larger or more complex websites take more time. The timeline also depends on how quickly content and feedback are provided.",
        },
        {
          q: "Can I request changes during the project?",
          a: "Yes, of course. The process includes revisions, and we'll work together to refine everything until you're happy with the result.",
        },
        {
          q: "What if I don't have a design or know what I want?",
          a: "That's completely fine. I'll help you define the direction, style, and structure based on your business and goals, so you don't need any design or technical background.",
        },
        {
          q: "How do I handle domain and hosting?",
          a: "If you'd like a custom domain, you can purchase one — but it's completely optional. For hosting, I typically recommend reliable platforms like Vercel. If you're unsure about any part of the process, I'll guide you step by step to make everything simple and stress-free.",
        },
        {
          q: "Will my website work on mobile devices?",
          a: "Yes, it will work on all screen sizes — including mobile, tablet, and desktop — and will be fully optimized for a smooth experience.",
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
      howItWorks: "תהליך",
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
        "אני מעצב ובונה אתרים נקיים ומודרניים שעוזרים לעסקים להפוך מבקרים ללקוחות.",
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
    howItWorks: {
      sectionTitle1: "איך זה",
      sectionTitle2: "עובד",
      subtitle: ".תהליך פשוט ומלווה שיקח את האתר שלך מרעיון להשקה",
      stepsTitle: "תהליך שלב אחר שלב",
      faqTitle: "שאלות נפוצות",
      steps: [
        {
          number: "1",
          title: "דרישות ומטרות",
          description:
            "מתחילים בשיחה על העסק שלך, המטרות שלך וסוג האתר שאתה צריך. נעבור גם על התוכן, הפיצ'רים והכיוון הכללי — כדי שהכול יהיה ברור לפני שהפרויקט מתחיל.",
        },
        {
          number: "2",
          title: "תוכן ומבנה",
          description:
            "נארגן יחד את התוכן שהאתר צריך — טקסטים, תמונות, סקשנים ומידע חשוב. אם משהו חסר, אדריך אותך מה להכין כדי שנוכל לבנות את האתר בצורה הנכונה.",
        },
        {
          number: "3",
          title: "כיוון עיצובי",
          description:
            "ברגע שהכול ברור, אני יוצר את הכיוון הוויזואלי של האתר — פריסה, סגנון ומראה כולל. הכול מותאם למותג שלך ומרגיש ברור, מודרני ומקצועי.",
        },
        {
          number: "4",
          title: "פיתוח ותיקונים",
          description:
            "אני בונה את האתר והופך את העיצוב לחוויה אמיתית ורספונסיבית. תוכל לבדוק אותו, לבקש שינויים, ונדייק הכול יחד עד שזה ירגיש בדיוק כמו שצריך.",
        },
        {
          number: "5",
          title: "העלאה לאוויר",
          description:
            "לאחר שהאתר מאושר, אני מעלה אותו לאוויר ומסייע להשיק אותו. אם צריך, אדריך אותך גם בנושא דומיין ואחסון — כדי שתהליך ההשקה יהיה פשוט וללא לחץ.",
        },
      ],
      faqs: [
        {
          q: "האם אני צריך שכל התוכן יהיה מוכן לפני שמתחילים?",
          a: "בכלל לא. אם כבר יש לך תוכן, זה מצוין — אבל אם לא, אדריך אותך בדיוק למה שנדרש ואוכל לעזור ליצור או לארגן אותו כך שיתאים לאתר שלך בצורה מושלמת.",
        },
        {
          q: "כמה זמן לוקח התהליך כולו?",
          a: "זה תלוי בהיקף הפרויקט. פרויקטים קטנים כמו דפי נחיתה או אתרי פורטפוליו מסתיימים בדרך כלל מהר יחסית, בעוד שאתרים גדולים יותר לוקחים יותר זמן. הלוח הזמנים תלוי גם במהירות שבה מסופקים תוכן ומשוב.",
        },
        {
          q: "האם אני יכול לבקש שינויים במהלך הפרויקט?",
          a: "כן, כמובן. התהליך כולל תיקונים, ונעבוד יחד כדי לשכלל הכול עד שתהיה מרוצה מהתוצאה.",
        },
        {
          q: "מה אם אין לי עיצוב או לא יודע מה אני רוצה?",
          a: "זה בסדר גמור. אעזור לך להגדיר את הכיוון, הסגנון והמבנה בהתאם לעסק ולמטרות שלך, כך שאין צורך בידע בעיצוב או טכנולוגיה.",
        },
        {
          q: "איך אני מטפל בדומיין ואחסון?",
          a: "אם רוצה דומיין מותאם אישית, ניתן לרכוש אחד — אבל זה לחלוטין אופציונלי. לאחסון, אני ממליץ בדרך כלל על פלטפורמות אמינות כמו Vercel. אם לא בטוח לגבי חלק כלשהו בתהליך, אדריך אותך צעד אחר צעד כדי שהכול יהיה פשוט וללא לחץ.",
        },
        {
          q: "האם האתר יעבוד במכשירים ניידים?",
          a: "כן, האתר יעבוד על כל גדלי המסך — כולל מובייל, טאבלט ומחשב — ויהיה מותאם במלואו לחוויית שימוש חלקה.",
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
