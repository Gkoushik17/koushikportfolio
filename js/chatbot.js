/* ===================================
   AI CHATBOT ASSISTANT
   Keyword-based smart responses about Koushik Goteti
   =================================== */

class Chatbot {
    constructor() {
        this.chatWindow = document.getElementById('chatbot-window');
        this.chatToggle = document.getElementById('chatbot-toggle');
        this.chatClose = document.getElementById('chatbot-close');
        this.chatMessages = document.getElementById('chatbot-messages');
        this.chatInput = document.getElementById('chatbot-input');
        this.chatSend = document.getElementById('chatbot-send');
        this.chatbot = document.getElementById('chatbot');
        this.suggestions = document.getElementById('chatbot-suggestions');

        if (!this.chatToggle) return;

        // Knowledge base
        this.knowledge = {
            greeting: {
                patterns: ['hello', 'hi', 'hey', 'greetings', 'sup', 'what\'s up', 'howdy', 'good morning', 'good evening'],
                responses: [
                    "Hey there! 👋 Welcome to Koushik's portfolio! I'm his AI assistant. How can I help you today?",
                    "Hello! 😊 Thanks for visiting! I can tell you about Koushik's skills, projects, education, or help you get in touch. What would you like to know?",
                    "Hi! 🚀 Great to see you here! Ask me anything about Koushik — skills, projects, achievements, or how to contact him!"
                ]
            },
            skills: {
                patterns: ['skills', 'technologies', 'tech stack', 'programming', 'languages', 'what can you do', 'what do you know', 'expertise', 'tools'],
                responses: [
                    "Koushik has a strong tech stack:\n\n🌐 **Data & AI:** NumPy, Pandas, Scikit-Learn, TensorFlow, Predictive Modeling\n💻 **Languages:** Python, R, SQL, Java, C++, JavaScript\n🕸️ **Web:** HTML, CSS, React.js, Tailwind CSS\n🛠️ **Tools:** Git, GitHub, Power BI, VS Code, Jupyter\n\nHe's particularly passionate about Data Science and AI/ML!",
                    "Koushik works heavily with data! He's proficient in Python, SQL, and R for languages, Scikit-Learn and Pandas for Machine Learning, and has Full Stack experience (React) as a secondary skill! Want to know about a specific project?"
                ]
            },
            projects: {
                patterns: ['projects', 'work', 'portfolio', 'what have you built', 'showcase', 'demos', 'examples', 'applications'],
                responses: [
                    "Koushik has built some data-driven projects! 🚀\n\n📊 **Customer Churn Prediction** — Machine learning pipeline using Scikit-Learn to predict telecom churn.\n📈 **Sales Dashboard Analysis** — Power BI visualization uncovering global sales trends.\n🔒 **Deadlock Detection System** — Banker's Algorithm visualization (React, Python).\n\nScroll to the Projects section to see them in detail!",
                ]
            },
            education: {
                patterns: ['education', 'degree', 'university', 'college', 'school', 'study', 'academic', 'qualifications', 'cgpa', 'gpa', 'grades'],
                responses: [
                    "📚 Koushik's academic journey is impressive:\n\n🎓 **B.Tech CSE** — Lovely Professional University, Punjab\n   Aug 2023 – Present | CGPA: 7.95\n📖 **Intermediate (PCM)** — Bhashyam Junior College, Guntur\n   91% marks\n🏅 **Matriculation** — Bhashyam High School, Tanuku\n   100% — yes, a perfect score! 🎯\n\nHe's also certified in Cloud Computing (NPTEL) and Oracle GenAI!",
                ]
            },
            contact: {
                patterns: ['contact', 'email', 'reach', 'hire', 'connect', 'talk', 'message', 'get in touch', 'available', 'phone', 'number'],
                responses: [
                    "You can reach Koushik through:\n\n📧 **Email:** koushik.goteti17@gmail.com\n🔗 **LinkedIn:** linkedin.com/in/koushik-goteti\n🐙 **GitHub:** github.com/Gkoushik17\n📱 **Phone:** +91 6300495869\n\nOr use the contact form at the bottom of this page! He'd love to hear from you! 📩",
                ]
            },
            achievements: {
                patterns: ['achievements', 'awards', 'hackathon', 'certifications', 'certificates', 'competition', 'won', 'first place'],
                responses: [
                    "Koushik has some great achievements! 🏆\n\n🥇 **Academic Excellence** — Perfect 100% score (10/10 GPA) in Matriculation from Bhashyam High School!\n💻 Competed in **24-hour Code-A-Hunt Hackathon** by Coding Blocks\n\n**Certifications:**\n✅ IBM Data Science Professional\n✅ Google Data Analytics\n✅ Oracle Cloud GenAI Professional\n✅ Cloud Computing — NPTEL"
                ]
            },
            location: {
                patterns: ['location', 'where', 'based', 'city', 'country', 'from'],
                responses: [
                    "Koushik is from **Andhra Pradesh, India** 🇮🇳 and is currently studying at **Lovely Professional University** in Phagwara, Punjab. He's open to opportunities across India and remote work!"
                ]
            },
            thanks: {
                patterns: ['thanks', 'thank you', 'thx', 'appreciate', 'helpful', 'great', 'awesome', 'cool', 'nice'],
                responses: [
                    "You're welcome! 😊 Happy to help! Is there anything else you'd like to know about Koushik?",
                    "Glad I could help! 🙌 Feel free to ask more questions or reach out through the contact form!",
                ]
            },
            bye: {
                patterns: ['bye', 'goodbye', 'see you', 'later', 'exit', 'quit'],
                responses: [
                    "Goodbye! 👋 Thanks for visiting Koushik's portfolio. Don't hesitate to come back!",
                    "See you later! 🚀 Hope you enjoyed exploring the portfolio. Feel free to get in touch anytime!"
                ]
            },
            funny: {
                patterns: ['joke', 'funny', 'humor', 'laugh', 'fun'],
                responses: [
                    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😄\n\nFun fact: Koushik built this entire portfolio from scratch! Ask about his projects or skills!",
                ]
            },
            who: {
                patterns: ['who are you', 'what are you', 'are you ai', 'are you real', 'bot', 'assistant'],
                responses: [
                    "I'm Koushik's AI Portfolio Assistant! 🤖 I'm here to help you learn about his skills, projects, and education. I know everything about his portfolio — what would you like to explore?",
                ]
            },
            experience: {
                patterns: ['experience', 'work', 'internship', 'job', 'professional'],
                responses: [
                    "Koushik is currently a B.Tech CSE student at LPU and is actively building his portfolio through data science projects and certifications.\n\n🔬 **Focus:** Machine Learning, Predictive Modeling, and Data Analytics\n🏆 **Hackathons:** Code-A-Hunt (Coding Blocks)\n🥇 **Academics:** Maintained a strong academic record with 100% in Matriculation.\n\nHe's open to internships and entry-level Data Science opportunities! 📩 Reach out via koushik.goteti17@gmail.com"
                ]
            }
        };

        this.init();
    }

    init() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.chatClose.addEventListener('click', () => this.closeChat());

        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.suggestions.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                this.chatInput.value = question;
                this.sendMessage();
            });
        });

        setTimeout(() => {
            this.addMessage("Hi! 👋 I'm Koushik's AI assistant. Ask me about his skills, projects, education, or how to get in touch!", 'bot');
        }, 500);
    }

    toggleChat() {
        this.chatbot.classList.toggle('open');
        if (this.chatbot.classList.contains('open')) {
            this.chatInput.focus();
        }
    }

    closeChat() {
        this.chatbot.classList.remove('open');
    }

    sendMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.chatInput.value = '';

        this.showTyping();

        const delay = 600 + Math.random() * 800;
        setTimeout(() => {
            this.removeTyping();
            const response = this.generateResponse(text);
            this.addMessage(response, 'bot');
        }, delay);
    }

    generateResponse(input) {
        const lower = input.toLowerCase();

        for (const [category, data] of Object.entries(this.knowledge)) {
            for (const pattern of data.patterns) {
                if (lower.includes(pattern)) {
                    const responses = data.responses;
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }

        const defaults = [
            "Interesting question! 🤔 I'm best at answering about Koushik's **skills**, **projects**, **education**, and **contact info**. Try asking about one of those!",
            "I'm not sure I understand that one! 😅 Try asking me about:\n\n• 💡 Skills & technologies\n• 🚀 Projects\n• 🎓 Education\n• 📧 Contact info\n• 🏆 Achievements",
            "That's a great question! 🤖 I know everything about Koushik's portfolio — try asking about his projects, skills, or how to get in touch!"
        ];

        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    addMessage(text, type) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${type}`;
        msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        this.chatMessages.appendChild(msg);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTyping() {
        const typing = document.createElement('div');
        typing.className = 'chat-message bot chat-typing';
        typing.id = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        this.chatMessages.appendChild(typing);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    removeTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }
}

const chatbot = new Chatbot();
