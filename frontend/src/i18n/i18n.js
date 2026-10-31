import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: "WeaveMart - The online market place",
      tagline: "Direct Handloom Marketplace • Zero Middlemen • Authentic Weaver Artisans",
      nav: {
        home: "Home",
        products: "Handloom Fabrics",
        orders: "My Orders",
        dashboard: "Weaver Portal",
        login: "Login / Register",
        logout: "Logout",
        guidance: "Registration Video Guide"
      },
      hero: {
        title: "Support Rural Weavers Directly",
        subtitle: "Every thread tells a story of heritage craftsmanship. Buy authentic sarees, fabric rolls, and traditional handlooms directly from Indian weaver families with 0% middleman commission.",
        exploreBtn: "Explore Handlooms",
        weaverBtn: "Join as a Weaver"
      },
      roles: {
        customer: "Buyer / Customer",
        weaver: "Handloom Weaver / Seller",
        artisanId: "Artisan Card / Weaver ID"
      },
      upi: {
        title: "UPI Payment Gateway",
        scanQr: "Scan UPI QR Code",
        enterVpa: "Or Enter UPI ID / VPA",
        payVia: "Pay via GPay / PhonePe / Paytm / BHIM",
        verifying: "Verifying UPI Transaction...",
        success: "Payment Verified! Order Confirmed.",
        payBtn: "Complete UPI Payment"
      },
      guidance: {
        modalTitle: "Registration Guidance & Tutorial Video",
        step1: "Step 1: Choose Role (Customer or Weaver)",
        step2: "Step 2: Enter Artisan / Weaver Card Details",
        step3: "Step 3: Set Location & Bank UPI for Direct Credit",
        close: "Got it! Proceed to Register"
      }
    }
  },
  hi: {
    translation: {
      appName: "WeaveMart - द ऑनलाइन मार्केट प्लेस",
      tagline: "सीधा बुनकर बाज़ार • शून्य बिचौलिए • असली हस्तशिल्प",
      nav: {
        home: "होम",
        products: "हथकरघा वस्त्र",
        orders: "मेरे ऑर्डर",
        dashboard: "बुनकर पोर्टल",
        login: "लॉगिन / पंजीकरण",
        logout: "लॉगआउट",
        guidance: "पंजीकरण वीडियो गाइड"
      },
      hero: {
        title: "ग्रामीण बुनकरों को सीधा सहयोग दें",
        subtitle: "बिना किसी बिचौलिए के सीधे भारत के प्रामाणिक बुनकर परिवारों से हस्तनिर्मित साड़ियां और हथकरघा खरीदें।",
        exploreBtn: "उत्पाद देखें",
        weaverBtn: "बुनकर के रूप में जुड़ें"
      },
      roles: {
        customer: "ग्राहक / खरीदार",
        weaver: "बुनकर / विक्रेता",
        artisanId: "कारीगर आईडी / बुनकर कार्ड"
      },
      upi: {
        title: "UPI भुगतान गेटवे",
        scanQr: "UPI क्यूआर कोड स्कैन करें",
        enterVpa: "या UPI आईडी दर्ज करें",
        payVia: "GPay / PhonePe / Paytm से भुगतान करें",
        verifying: "भुगतान की पुष्टि की जा रही है...",
        success: "भुगतान सफल! ऑर्डर कंफर्म हुआ।",
        payBtn: "UPI भुगतान पूरा करें"
      },
      guidance: {
        modalTitle: "पंजीकरण मार्गदर्शन वीडियो",
        step1: "चरण 1: भूमिका चुनें (ग्राहक या बुनकर)",
        step2: "चरण 2: बुनकर कार्ड विवरण दर्ज करें",
        step3: "चरण 3: सीधा भुगतान प्राप्त करने के लिए UPI सेट करें",
        close: "पंजीकरण करें"
      }
    }
  },
  te: {
    translation: {
      appName: "WeaveMart - ఆన్‌లైన్ మార్కెట్ ప్లేస్",
      tagline: "నేరుగా నేత కార్మికుల నుండి • దళారులు లేరు • అసలైన చేనేత వస్త్రాలు",
      nav: {
        home: "హోమ్",
        products: "చేనేత వస్త్రాలు",
        orders: "నా ఆర్డర్‌లు",
        dashboard: "వేవర్ పోర్టల్",
        login: "లాగిన్ / రిజిస్టర్",
        logout: "లాగ్ అవుట్",
        guidance: "రిజిస్ట్రేషన్ వీడియో మార్గదర్శి"
      },
      hero: {
        title: "చేనేత కార్మికులకు ప్రత్యక్ష మద్దతు ఇవ్వండి",
        subtitle: "ఎలాంటి దళారుల ప్రమేయం లేకుండా నేరుగా గ్రామీణ నేత కార్మికుల నుండి చీరలు మరియు చేనేత ఉత్పత్తులను కొనండి.",
        exploreBtn: "వస్త్రాలు చూడండి",
        weaverBtn: "నేత కార్మికుడిగా చేరండి"
      },
      roles: {
        customer: "కొనుగోలుదారు / కస్టమర్",
        weaver: "నేత కార్మికుడు / అమ్మకందారు",
        artisanId: "ఆర్టిసాన్ కార్డ్ / వేవర్ ID"
      },
      upi: {
        title: "UPI చెల్లింపు గేట్‌వే",
        scanQr: "UPI QR కోడ్ స్కాన్ చేయండి",
        enterVpa: "లేదా UPI ID నమోదు చేయండి",
        payVia: "GPay / PhonePe / Paytm ద్వారా చెల్లించండి",
        verifying: "చెల్లింపును ధృవీకరిస్తున్నాము...",
        success: "చెల్లింపు పూర్తయింది! ఆర్డర్ ఖరారైంది.",
        payBtn: "UPI చెల్లింపు పూర్తి చేయండి"
      },
      guidance: {
        modalTitle: "రిజిస్ట్రేషన్ మార్గదర్శక వీడియో",
        step1: "దశ 1: కస్టమర్ లేదా వేవర్ ఎంచుకోండి",
        step2: "దశ 2: ఆర్టిసాన్ ఐడి వివరాలు తెలపండి",
        step3: "దశ 3: ప్రత్యక్ష డబ్బు కోసం UPI ఐడి ఇవ్వండి",
        close: "రిజిస్ట్రేషన్ పూర్తి చేయండి"
      }
    }
  },
  ta: {
    translation: {
      appName: "WeaveMart - ஆன்லைன் சந்தை",
      tagline: "நேரடி நெசவாளர் சந்தை • இடைத்தரகர்கள் இல்லை • பாரம்பரிய கைத்தறி",
      nav: {
        home: "முகப்பு",
        products: "கைத்தறி ஆடைகள்",
        orders: "எனது ஆர்டர்கள்",
        dashboard: "நெசவாளர் போர்ட்டல்",
        login: "உள்நுழைவு / பதிவு",
        logout: "வெளியேறு",
        guidance: "பதிவு வழிகாட்டி வீடியோ"
      },
      hero: {
        title: "கிராமப்புற நெசவாளர்களுக்கு நேரடியாக ஆதரவளியுங்கள்",
        subtitle: "இடைத்தரகர்கள் இன்றி நேரடியாக நெசவாளர்களிடம் இருந்து காஞ்சிபுரம் பட்டு மற்றும் கைத்தறி ஆடைகளை வாங்குங்கள்.",
        exploreBtn: "ஆடைகளை பார்",
        weaverBtn: "நெசவாளராக இணையுங்கள்"
      },
      roles: {
        customer: "வாடிக்கையாளர்",
        weaver: "நெசவாளர் / விற்பனையாளர்",
        artisanId: "கைவினைஞர் கார்டு ஐடி"
      },
      upi: {
        title: "UPI கட்டண போர்ட்டல்",
        scanQr: "UPI QR குறியீட்டை ஸ்கேன் செய்க",
        enterVpa: "அல்லது UPI ஐடியை உள்ளிடவும்",
        payVia: "GPay / PhonePe / Paytm மூலம் செலுத்துங்கள்",
        verifying: "கட்டணம் சரிபார்க்கப்படுகிறது...",
        success: "கட்டணம் வெற்றி! ஆர்டர் உறுதிசெய்யப்பட்டது.",
        payBtn: "UPI கட்டணத்தை முடிக்கவும்"
      },
      guidance: {
        modalTitle: "பதிவு வழிகாட்டுதல் வீடியோ",
        step1: "படி 1: வாடிக்கையாளர் அல்லது நெசவாளர் தேர்வு செய்க",
        step2: "படி 2: நெசவாளர் அடையாள விவரங்களை உள்ளிடவும்",
        step3: "படி 3: நேரடி வரவுக்கு UPI ஐ அமைக்குக",
        close: "பதிவு செய்ய தொடரவும்"
      }
    }
  },
  bn: {
    translation: {
      appName: "WeaveMart - অনলাইন মার্কেটপ্লেস",
      tagline: "সরাসরি তাঁতিদের থেকে • শূন্য মধ্যস্বত্বভোগী • খাঁটি তাঁতশিল্প",
      nav: {
        home: "হোম",
        products: "তাঁত বস্ত্র",
        orders: "আমার অর্ডার",
        dashboard: "তাঁতি পোর্টাল",
        login: "লগইন / রেজিস্টার",
        logout: "লগআউট",
        guidance: "রেজিস্ট্রেশন ভিডিও গাইড"
      },
      hero: {
        title: "সরাসরি তাঁতিদের পাশে দাঁড়ান",
        subtitle: "কোনো দালাল ছাড়াই সরাসরি ভারতীয় তাঁতি পরিবার থেকে জামদানি ও বালুচরি কিনুন।",
        exploreBtn: "পণ্য দেখুন",
        weaverBtn: "তাঁতি হিসাবে যোগ দিন"
      },
      roles: {
        customer: "ক্রেতা / কাস্টমার",
        weaver: "তাঁতি / বিক্রেতা",
        artisanId: "তাঁতি আইডি"
      },
      upi: {
        title: "UPI পেমেন্ট গেটওয়ে",
        scanQr: "UPI QR কোড স্ক্যান করুন",
        enterVpa: "অথবা UPI ID লিখুন",
        payVia: "GPay / PhonePe / Paytm দ্বারা পেমেন্ট করুন",
        verifying: "পেমেন্ট যাচাই করা হচ্ছে...",
        success: "পেমেন্ট সফল! অর্ডার কনফার্ম।",
        payBtn: "UPI পেমেন্ট সম্পন্ন করুন"
      },
      guidance: {
        modalTitle: "রেজিস্ট্রেশন নির্দেশিকা ভিডিও",
        step1: "ধাপ ১: কাস্টমার বা তাঁতি বেছে নিন",
        step2: "ধাপ ২: তাঁতি কার্ডের বিবরণ লিখুন",
        step3: "ধাপ ৩: ব্যাংক UPI সেট করুন",
        close: "রেজিস্টার করুন"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
