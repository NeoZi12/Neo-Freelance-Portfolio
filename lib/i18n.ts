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
      freeGuide: "Free Guide",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Neo",
      greetingRole: " — Freelance Web Developer.",
      scrollCta: "What I can do for you",
      cta1: "View My Work",
      cta2: "Get Your Website",
    },
    about: {
      title1: "About",
      title2: "Me",
      description:
        "I'm Neo, a software engineer and freelance web developer. I'm passionate about creating websites that stand out, tell a story, and actually connect with people — more than something that just works.",
      descHighlights: ["Neo", "stand out", "connect"],
      techLabel: "Technologies I work with",
    },
    whyUs: {
      titleOrange: "Why",
      titleWhite: "Work With Me",
      bullets: [
        "Strong and clear online presence",
        "Design that truly represents your business",
        "More clients through a website that converts",
        "Fully-custom system that makes your business efficient and accessible",
      ],
    },
    testimonials: {
      titleOrange: "What",
      titleWhite: "Clients Say",
      items: [
        {
          quote:
            "Neo delivered a website that completely changed how new clients find us. Clean, fast, and exactly what we needed to stand out.",
          author: "Mia Z.",
          role: "Tax Consultant",
        },
        {
          quote:
            "Neo created a website that truly represents me and my content as a UGC creator. It feels natural, easy to navigate, and gives me a place to confidently showcase my work.",
          author: "Bruna B.",
          role: "UGC Creator",
        },
      ],
    },
    services: {
      titleWhite: "Choose Your",
      titleOrange: "Service",
      whoLabel: "Who is it for?",
      left: {
        number: "01",
        titleA: "Landing Pages & ",
        titleB: "Portfolio Websites",
        whoAnswer: "Small businesses and professionals.",
        description:
          "A clean, professional website built to convert visitors into clients and be optimized for search engines from the start.",
        items: [
          "Turn visitors into clients",
          "Build a strong online presence",
          "Present your business clearly",
          "SEO-optimized structure",
        ],
        cta: "Get Your Website",
      },
      right: {
        number: "02",
        titleA: "Full-Stack",
        titleB: "Custom Websites",
        whoAnswer: "Businesses that want to scale online.",
        description:
          "Custom-built system that automates your operations and help you manage clients at scale.",
        items: [
          "Fully customizable to your business needs",
          "Manage bookings and client interactions",
          "Automate payments and processes",
          "Fast, scalable, high-performance system",
        ],
        cta: "Get Your Custom System",
      },
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
        {
          name: "Tax Consultant landing page - SEO Optimized",
          description: "",
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
    freeGuide: {
      headline: "Discover 5 simple changes you can make to your website to start attracting more clients.",
      subheadline: "No fluff — just practical ideas you can apply immediately, even if your traffic is low.",
      inboxText: "Get the full PDF guide for free.",
      cta: "Get Your Free Guide",
      stats: {
        time: "5 min",
        timeLabel: "Reading Time",
      },
      modal: {
        title: "Get the Free Guide",
        subtitle: "Fill in your details and we'll send the guide straight to your inbox.",
        namePlaceholder: "Name",
        emailPlaceholder: "Email Address",
        cta: "Receive the PDF Guide",
        privacy: "Zero fluff. Unsubscribe anytime.",
        loading: "Sending...",
        successPre: "You're in! Check your inbox — the guide is on its way. If you don't see it, check your ",
        successPromo: "Promotions",
        successMid: " or ",
        successSpam: "Spam",
        successPost: " folder.",
        errorGeneral: "Something went wrong. Please try again.",
        errorEmail: "Please enter a valid email address.",
        errorName: "Name must be at least 2 characters.",
      },
      nav: {
        label: "Guide",
        back: "Back to Website",
      },
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
      freeGuide: "מדריך חינמי",
    },
    hero: {
      greeting: "היי, אני",
      name: "ניאו",
      greetingRole: " — מפתח אתרים פרילנסר.",
      scrollCta: "מה אני יכול לעשות עבורך",
      cta1: "צפה בעבודות שלי",
      cta2: "קבל את האתר שלך",
    },
    about: {
      title1: "קצת",
      title2: "עליי",
      description:
        "אני ניאו, בוגר הנדסת תוכנה ומפתח אתרים פרילנסר. אני אוהב ליצור אתרים שבולטים, מספרים סיפור, ומתחברים עם אנשים — מעבר למשהו שפשוט עובד.",
      descHighlights: ["ניאו", "שבולטים", "מתחברים"],
      techLabel: "טכנולוגיות שאני עובד איתן",
    },
    whyUs: {
      titleOrange: "למה",
      titleWhite: "כדאי לעבוד איתי",
      bullets: [
        "נוכחות דיגיטלית חזקה וברורה",
        "עיצוב שמייצג באמת את העסק שלך",
        "יותר לקוחות דרך אתר שממיר",
        "מערכת מותאמת אישית שהופכת את העסק שלך ליעיל ונגיש",
      ],
    },
    testimonials: {
      titleOrange: "מה",
      titleWhite: "לקוחות אומרים",
      items: [
        {
          quote:
            "ניאו בנה לנו אתר שלגמרי שינה את האופן שבו לקוחות חדשים מוצאים אותנו. נקי, מהיר, ובדיוק מה שהיינו צריכים כדי לבלוט.",
          author: "מיה ז.",
          role: "יועצת מס",
        },
        {
          quote:
            "ניאו יצר לי אתר שמייצג אותי ואת התוכן שלי בצורה אמיתית. הוא מרגיש טבעי, קל לניווט, ונותן לי מקום להציג את העבודה שלי בביטחון.",
          author: "ברונה ב.",
          role: "יוצרת תוכן שיווקי (UGC)",
        },
      ],
    },
    services: {
      titleWhite: "בחר את",
      titleOrange: "השירות שלך",
      whoLabel: "למי זה מתאים?",
      left: {
        number: "01",
        titleA: "דפי נחיתה",
        titleB: "ואתרי תדמית",
        whoAnswer: "עסקים קטנים ואנשי מקצוע.",
        description:
          "אתר נקי ומקצועי שנבנה להמיר מבקרים ללקוחות ולהיות מותאם למנועי חיפוש מהיסוד.",
        items: [
          "הפיכת מבקרים ללקוחות",
          "בניית נוכחות דיגיטלית חזקה",
          "הצגה ברורה של העסק שלך",
          "מבנה מותאם למנועי חיפוש",
        ],
        cta: "קבל את האתר שלך",
      },
      right: {
        number: "02",
        titleA: "אתרי פול-סטאק",
        titleB: "מותאמים אישית ",
        whoAnswer: "עסקים שרוצים לצמוח דיגיטלית.",
        description:
          "מערכת מותאמת אישית שמאפשרת אוטומציה של תהליכים ועוזרת לנהל את העסק אונליין.",
        items: [
          "מותאם לצרכי העסק",
          "ניהול הזמנות ולקוחות",
          "אוטומציה של תשלומים ותהליכים",
          "מהיר, גמיש ועם ביצועים גבוהים",
        ],
        cta: "קבל את המערכת שלך",
      },
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
        {
          name: "אתר ליועצת מס, עם אופטימיזציה לקידום בגוגל",
          description: "",
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
    freeGuide: {
      headline: "גלה 5 שינויים פשוטים שיגרמו לאתר שלך להביא לך יותר לקוחות.",
      subheadline: "בלי בולשיט — רק רעיונות פרקטיים שתוכל ליישם עכשיו, גם אם התנועה לאתר שלך נמוכה.",
      inboxText: "קבל את המדריך המלא בחינם.",
      cta: "קבל את המדריך החינמי שלך",
      stats: {
        time: "5 דק׳",
        timeLabel: "זמן קריאה",
      },
      modal: {
        title: "קבל את המדריך החינמי",
        subtitle: "מלא את הפרטים ונשלח את המדריך ישירות לתיבת הדואר שלך.",
        namePlaceholder: "שם",
        emailPlaceholder: "כתובת אימייל",
        cta: "קבל את מדריך ה-PDF",
        privacy: "אפס בולשיט. ביטול בכל עת.",
        loading: "...שולח",
        successPre: "!נרשמת בהצלחה — המדריך בדרך אליך. אם לא רואה אותו, בדוק את תיקיית ",
        successPromo: "קידומי מכירות",
        successMid: " או ",
        successSpam: "ספאם",
        successPost: "",
        errorGeneral: "משהו השתבש. אנא נסה שוב.",
        errorEmail: "אנא הזן כתובת אימייל תקינה.",
        errorName: "השם חייב להכיל לפחות 2 תווים.",
      },
      nav: {
        label: "מדריך",
        back: "חזרה לאתר",
      },
    },
  },
} as const;

export type Translations = typeof translations;
