package com.weavemart.controller;

import com.weavemart.dto.ChatRequest;
import com.weavemart.dto.ChatResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatbotController {

    @PostMapping
    public ResponseEntity<ChatResponse> handleChat(@RequestBody ChatRequest request) {
        String msg = request.getMessage() != null ? request.getMessage().toLowerCase() : "";
        String lang = request.getLanguage() != null ? request.getLanguage().toLowerCase() : "en";

        String reply;
        String action = "NONE";

        // Logic for multilingual responses
        if (msg.contains("track") || msg.contains("order") || msg.contains("status") || msg.contains("ट्रैक") || msg.contains("ఆర్డర్")) {
            action = "VIEW_ORDERS";
            switch (lang) {
                case "hi":
                    reply = "आप अपने ऑर्डर का रीयल-टाइम स्टेटस (Loom Process -> Shipped -> Delivered) 'My Orders' सेक्शन में जाकर देख सकते हैं।";
                    break;
                case "te":
                    reply = "మీ ఆర్డర్ స్థితిని (చేనేత మగ్గం -> షిప్పింగ్ -> డెలివరీ) 'మ నా ఆర్డర్‌లు' విభాగంలో ట్రాక్ చేయవచ్చు.";
                    break;
                case "ta":
                    reply = "உங்கள் ஆர்டர் நிலையை 'எனது ஆர்டர்கள்' பிரிவில் விரிவாகக் கண்காணிக்கலாம்.";
                    break;
                case "bn":
                    reply = "আপনি 'মাই অর্ডার' সেকশনে আপনার অর্ডারের বর্তমান ট্র্যাক দেখতে পাবেন।";
                    break;
                case "kn":
                    reply = "ನಿಮ್ಮ ಆರ್ಡರ್ ಸ್ಥಿತಿಯನ್ನು 'ನನ್ನ ಆರ್ಡರ್‌ಗಳು' ವಿಭಾಗದಲ್ಲಿ ಲೈವ್ ಆಗಿ ವೀಕ್ಷಿಸಬಹುದು.";
                    break;
                case "mr":
                    reply = "तुम्ही तुमच्या ऑर्डरची ताजी स्थिती 'माझ्या ऑर्डर्स' विभागात पाहू शकता.";
                    break;
                default:
                    reply = "You can track your real-time order status (Handcrafting -> Shipped -> Delivered) directly in your 'My Orders' dashboard.";
                    break;
            }
        } else if (msg.contains("upload") || msg.contains("sell") || msg.contains("weaver") || msg.contains("कपड़ा") || msg.contains("అమ్మకం")) {
            action = "HOW_TO_UPLOAD";
            switch (lang) {
                case "hi":
                    reply = "बुनकर बंधु! उत्पाद अपलोड करने के लिए: 1. लॉगिन करें 2. 'Weaver Dashboard' पर जाएं 3. कपड़े का प्रकार (सिल्क/कॉटन), लूम टाइप और मूल्य भरकर फोटो अपलोड करें।";
                    break;
                case "te":
                    reply = "నేత కార్మికులారా! మీ చీరలు/వస్త్రాలను వేవర్‌మాల్‌లో అప్‌లోడ్ చేయడానికి: 1. లాగిన్ అవ్వండి 2. 'Weaver Dashboard' కి వెళ్ళండి 3. మగ్గం రకం, క్లాత్ డిటైల్స్ మరియు ఫోటోను అప్‌లోడ్ చేయండి.";
                    break;
                default:
                    reply = "Weavers can upload products easily! Go to 'Weaver Dashboard', enter your fabric specifications (Mulberry silk/Cotton, Loom type, Price, Craft Origin), and upload high-res images directly!";
                    break;
            }
        } else if (msg.contains("upi") || msg.contains("payment") || msg.contains("pay") || msg.contains("भुगतान") || msg.contains("చెల్లింపు")) {
            switch (lang) {
                case "hi":
                    reply = "WeaveMart GPay, PhonePe, Paytm, BHIM और किसी भी UPI ID से सीधी 100% सुरक्षित ऑनलाइन पेमेंट स्वीकार करता है।";
                    break;
                case "te":
                    reply = "WeaveMart ద్వారా మీరు GPay, PhonePe, Paytm మరియు QR కోడ్ ఉపయోగించి సురక్షితమైన UPI చెల్లింపులు చేయవచ్చు.";
                    break;
                default:
                    reply = "WeaveMart supports instant, secure UPI payments via GPay, PhonePe, Paytm, BHIM, or QR code scan with 0% middleman commission!";
                    break;
            }
        } else if (msg.contains("care") || msg.contains("wash") || msg.contains("silk") || msg.contains("धुलाई")) {
            action = "FABRIC_GUIDE";
            reply = "Handloom fabrics (Pure Silk & Organic Cotton) should be dry-cleaned or hand-washed in cold water with mild detergent. Avoid direct sunlight drying to retain vibrant natural dyes!";
        } else {
            switch (lang) {
                case "hi":
                    reply = "नमस्ते! मैं WeaveMart AI सहायक हूँ। मैं आपको बुनकरों से सीधी खरीदारी, UPI भुगतान, या ऑर्डर ट्रैकिंग में कैसे सहायता कर सकता हूँ?";
                    break;
                case "te":
                    reply = "నమస్కారం! నేను WeaveMart AI సహాయకుడిని. ఆర్డర్‌లు, UPI చెల్లింపులు లేదా నేత ఉత్పత్తుల గురించి నన్ను ఏమైనా అడగండి!";
                    break;
                default:
                    reply = "Hello! I am your WeaveMart AI Assistant. How can I help you today with direct weaver purchases, UPI payments, fabric guidance, or order tracking?";
                    break;
            }
        }

        return ResponseEntity.ok(ChatResponse.builder().reply(reply).suggestedAction(action).build());
    }
}
