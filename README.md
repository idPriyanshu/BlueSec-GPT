# 🛡️ BlueSec GPT – AI-Powered SOC Assistant

A full-stack Security Operations Center (SOC) assistant that leverages **LLMs (via OpenRouter)** and **Splunk** to automate log analysis, threat detection, and query generation in a security analyst's workflow.

> 🔍 Built using **Django REST Framework**, **React**, and **LLM APIs**. Supports multi-tab analysis, MITRE ATT\&CK mapping, and dynamic SPL query generation via structured prompts.

---

## 🚀 Features

* 🔐 **Log Analysis via LLMs**
  Analyze raw log data to extract security insights, anomalies, or patterns.

* 🧠 **SPL Query Generator**
  Convert natural language questions into **accurate Splunk queries** using OpenRouter-hosted LLMs.

* 📊 **Multi-Tab UI for Analysts**
  Switch easily between tabs: Log Analysis, Query Generation, and Threat Summary.

* 🎯 **MITRE ATT\&CK Integration**
  Detection insights aligned with MITRE techniques and tactics for threat classification.

* 💡 **Prompt Engineering & Chain-of-Thought Reasoning**
  Ensures precise LLM outputs with rules, reasoning, and filtering to eliminate hallucinations.

---

## ⚙️ Tech Stack

| Layer        | Tools/Frameworks                          |
| ------------ | ----------------------------------------- |
| 🌐 Frontend  | React, Tailwind CSS                       |
| 🧠 Backend   | Django REST Framework, Python, OpenRouter |
| 📈 SIEM      | Splunk + SPL Queries                      |
| 🧪 Dev Tools | Git, Postman, VS Code, React Router       |

---

## 📂 Directory Structure

```
BlueSec-GPT/
├── secgpt_frontend/          # React-based UI
├── secgpt_backend/           # Django REST backend
│   ├── llm_controller.py     # Handles OpenRouter API
│   ├── model_loader.py       # Loads local LLMs (optional)
│   └── utils/                # Prompt builder, filters
├── README.md
└── .gitignore
```

---

## 🧪 Sample Use Case

> 💬 Analyst: “Show me logs where user login failed more than 5 times in 1 minute.”
> 🛡️ **BlueSec GPT** generates:

```spl
index=auth_logs action=failed earliest=-1m | stats count by user | where count > 5
```

---

## 📥 Setup Instructions

1. **Clone the Repo**

   ```bash
   git clone https://github.com/idPriyanshu/BlueSec-GPT.git
   cd BlueSec-GPT
   ```

2. **Backend Setup**

   ```bash
   cd secgpt_backend
   pip install -r requirements.txt
   python manage.py runserver
   ```

3. **Frontend Setup**

   ```bash
   cd ../secgpt_frontend
   npm install
   npm start
   ```

4. **Configure `.env`**

   * Add your OpenRouter API key and endpoints in backend settings.
   * Configure Splunk index/API if applicable.

---

## 📚 Future Enhancements

* 🔍 Retrieval-Augmented Generation (RAG) for enriched detection
* 📁 Upload PCAP or CSV logs for real-time analysis
* 🕸️ Add support for ELK stack, QRadar
* 🔁 Conversation Memory (Chat with Logs)

---

## 👨‍💻 Author

**Priyanshu Singh**
Cybersecurity Engineer | LLM Enthusiast
[LinkedIn](https://linkedin.com/in/priyanshu-singh-16462026b) | [GitHub](https://github.com/idPriyanshu)

---

## 📄 License

This project is licensed under the MIT License.

---

Would you like this saved as a file (`README.md`) and also added to GitHub now?
