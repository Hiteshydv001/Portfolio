
---

# Hitesh Kumar - AI-Powered Portfolio

Welcome to the repository for my AI-powered personal portfolio. This project is more than just a static website; it's an interactive, conversational experience designed to showcase my skills in AI, machine learning, and full-stack development.

At its core is **HiteshBot**, a custom-built AI assistant trained exclusively on my professional background, projects, and experience. You can ask it complex questions and receive accurate, context-aware answers in real-time.

**Check out the live project here:** [Link to your deployed frontend URL]

![image](https://github.com/user-attachments/assets/d97facd3-7b7e-456f-82a2-88a1c433bac0)



---

## 🚀 About the Project

This portfolio was built to demonstrate a modern, practical application of Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG). Instead of just listing my skills, I wanted to build a system that *uses* them.

**HiteshBot** can answer questions like:

-   "What is Hitesh's experience with MLOps and model deployment?"
-   "Tell me more about the Guard AI proctoring system."
-   "Generate a summary of his resume."
-   "What research has he published?"

The AI is designed to be a specialist. It is strictly grounded in the data provided from my resume and will politely decline to answer questions that are off-topic, ensuring a focused and professional interaction.

## 🛠️ Technical Architecture

This project is a full-stack application with a decoupled frontend and backend, containerizing modern AI and web development practices.





### Backend

The backend is a robust Python API built to handle the AI logic and data processing.

-   **Framework:** **FastAPI** was chosen for its high performance, asynchronous capabilities, and automatic API documentation.
-   **Core AI Logic:** The RAG (Retrieval-Augmented Generation) pipeline is powered by **LlamaIndex**. This library orchestrates the entire process of data loading, indexing, and querying.
-   **LLM & Embeddings:** The system uses **Google's Gemini Pro** via the LlamaIndex integration for both generating conversational responses and creating vector embeddings of the source data.
-   **Data Ingestion:** A custom data pipeline reads structured `.json` files containing my resume information.
-   **Prompt Engineering:** The system uses a highly-specialized, multi-rule prompt to ensure the AI's persona is professional, its answers are strictly grounded in the provided context, and it uses Markdown for clear formatting.
-   **Deployment:** The backend is deployed as a native Python web service on **Render**.


## 🌟 Key Features

-   **Conversational AI:** Engage in a natural language conversation to learn about my professional profile.
-   **Retrieval-Augmented Generation (RAG):** The AI doesn't just use a pre-trained model; it retrieves relevant, up-to-date information from my personal knowledge base before answering.
-   **Strictly Grounded Responses:** Advanced prompt engineering ensures the bot is an expert on Hitesh Kumar and does not hallucinate or go off-topic.
-   **Intent Recognition:** The API can detect high-level user intents (like asking for a "resume summary") and transforms them into detailed queries for the most comprehensive response.
-   **Real-time Streaming:** Responses are streamed token-by-token, creating a dynamic and engaging user experience.

---

Thank you for visiting my portfolio and exploring this project! Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/hitesh-kumar-aiml/).
