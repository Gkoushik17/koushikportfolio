/* ===================================
   INTERACTIVE TERMINAL - ABOUT SECTION
   Type commands to learn about Koushik
   =================================== */

class Terminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.body = document.getElementById('terminal-body');

        if (!this.input || !this.output) return;

        // Command database
        this.commands = {
            help: {
                output: `Available commands:
  <span class="cmd-highlight">about</span>      - Learn about me
  <span class="cmd-highlight">skills</span>     - View my technical skills
  <span class="cmd-highlight">education</span>  - My educational background
  <span class="cmd-highlight">hobbies</span>    - What I do for fun
  <span class="cmd-highlight">contact</span>    - How to reach me
  <span class="cmd-highlight">projects</span>   - View my projects
  <span class="cmd-highlight">certs</span>      - Certifications
  <span class="cmd-highlight">clear</span>      - Clear the terminal
  <span class="cmd-highlight">sudo hire me</span> - 😉`
            },
            about: {
                output: `👋 <strong>Hi! I'm Koushik Goteti</strong>

I'm an Aspiring Data Scientist and B.Tech CSE student at 
Lovely Professional University, with a CGPA of 7.95.

I'm passionate about Machine Learning, Data Analytics, and
building predictive models that solve real problems.
(I also have Full Stack experience as a secondary skill!)

I scored 100% in Matriculation and 91% in Intermediate.

💡 I believe in learning by doing — every dataset
   is an opportunity to discover insights!`
            },
            skills: {
                output: `🛠️ <strong>Technical Skills</strong>

<strong>AI/ML & Data:</strong> Scikit-Learn, Pandas, NumPy, Matplotlib, TensorFlow
<strong>Languages:</strong>    Python, R, SQL, Java, C++, JavaScript
<strong>Frontend:</strong>     HTML, CSS, React.js, Tailwind CSS
<strong>Tools:</strong>        Git, GitHub, Power BI, VS Code, Jupyter, Colab

<strong>Soft Skills:</strong>  Analytical Thinking, Problem Solving, Work Ethic

📊 Proficiency:  ████████████████████░  88% AI & Data
                 ██████████████████░░░  85% Languages
                 ███████████████░░░░░░  75% Web Tech
                 █████████████████░░░░  82% Tools`
            },
            education: {
                output: `🎓 <strong>Education</strong>

<strong>B.Tech Computer Science & Engineering</strong>
Lovely Professional University, Phagwara, Punjab
Aug 2023 — Present | CGPA: 7.95

<strong>Intermediate (PCM) — 91%</strong>
Bhashyam Junior College, Guntur, AP
Jun 2021 — Apr 2023

<strong>Matriculation — 100% 🏅</strong>
Bhashyam High School, Tanuku, AP
Jul 2020 — May 2021`
            },
            certs: {
                output: `📜 <strong>Certifications</strong>

  ✅ IBM Data Science Professional Certificate
  ✅ Google Data Analytics Professional Certificate
  ✅ Oracle Cloud Infrastructure 2025 Certified
     Generative AI Professional — Oracle (Aug 2025)
  ✅ Cloud Computing — NPTEL (Apr 2025)

<strong>Achievements:</strong>
  🏆 24-hour Code-A-Hunt Hackathon — Coding Blocks (Mar 2024)
  🥇 Academic Excellence Award — 100% in Matriculation (May 2021)`
            },
            hobbies: {
                output: `🎮 <strong>When I'm Not Coding...</strong>

  🤖 Exploring new AI tools & tech
  💻 Contributing to open source
  📚 Reading tech blogs & documentation
  🎯 Solving problems on coding platforms
  🎮 Gaming with friends
  📝 Writing about tech`
            },
            contact: {
                output: `📬 <strong>Let's Connect!</strong>

  📧 Email:    koushik.goteti17@gmail.com
  🔗 LinkedIn: linkedin.com/in/koushik-goteti
  🐙 GitHub:   github.com/Gkoushik17
  📱 Phone:    +91 6300495869

💬 Feel free to reach out! I'm always open to discussing
   new projects, collaborations, or opportunities.`
            },
            projects: {
                output: `🚀 <strong>My Projects</strong>

  1️⃣ <strong>Customer Churn Prediction Model</strong>
     ML pipeline using Scikit-Learn & Pandas
     Tech: Python, Pandas, Scikit-Learn, Matplotlib

  2️⃣ <strong>Global Sales Data Analysis & Dashboard</strong>
     Comprehensive business intelligence dashboard
     Tech: Power BI, Python, Data Wrangling, SQL

  3️⃣ <strong>Automated Deadlock Detection System</strong>
     Interactive Resource Validator
     Tech: React, TypeScript, Python

  📁 Scroll down to see all projects with details!`
            },
            clear: {
                action: 'clear'
            },
            'sudo hire me': {
                output: `🎉 <strong>Great decision!</strong> 

  ✨ Initializing hiring process...
  ✅ Loading exceptional coding skills...
  ✅ Deploying hardworking student attitude...
  ✅ Compiling 100% matriculation score...
  ✅ Building passion for tech & AI...
  
  🚀 RESULT: You won't regret it! 

  📧 Email: koushik.goteti17@gmail.com
  🔗 LinkedIn: linkedin.com/in/koushik-goteti`
            }
        };

        this.history = [];
        this.historyIndex = -1;

        this.init();
    }

    init() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand(this.input.value.trim().toLowerCase());
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.input.value = this.history[this.history.length - 1 - this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.input.value = this.history[this.history.length - 1 - this.historyIndex];
                } else {
                    this.historyIndex = -1;
                    this.input.value = '';
                }
            }
        });

        // Focus on click
        this.body.addEventListener('click', () => {
            this.input.focus();
        });
    }

    handleCommand(cmd) {
        if (!cmd) return;

        this.history.push(cmd);
        this.historyIndex = -1;

        this.addLine(cmd);

        if (cmd === 'clear') {
            this.output.innerHTML = '';
            return;
        }

        const command = this.commands[cmd];

        if (command) {
            this.addResponse(command.output);
        } else {
            this.addResponse(`<span style="color: #ff5252;">Command not found: ${cmd}</span>\nType <span class="cmd-highlight">help</span> for available commands.`);
        }

        this.body.scrollTop = this.body.scrollHeight;
    }

    addLine(text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="terminal-prompt">visitor@portfolio:~$</span><span class="terminal-text">${text}</span>`;
        this.output.appendChild(line);
    }

    addResponse(text) {
        const response = document.createElement('div');
        response.className = 'terminal-response';
        response.innerHTML = text;
        this.output.appendChild(response);
    }
}

const terminal = new Terminal();
