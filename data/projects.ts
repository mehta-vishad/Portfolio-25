export interface Project {
  id: string
  title: string
  overview: string
  image: string
  link: string
  techStack: string[]
  technologiesUsed: Record<string, string | string[]>
  keyFeatures: string[]
  challengesAndSolutions: string[]
  conclusion: string
}

export const projects: Project[] = [
  {
    id: "khatri-ai",
    title: "Khatri AI - Smart Email Assistant (Gmail Add-on)",
    overview:
      "Engineered a smart email assistant using Go and PostgreSQL, integrating OpenAI's Assistants API for contextual replies. The system features JWT authentication, Redis caching, and Google OAuth for Gmail thread mapping. A React-based Chrome extension injects AI-powered replies into dynamic Gmail views.",
    image: "/images/projects/Khatri AI.webp",
    link: "https://khatri-ai-project.com",
    techStack: [
      "/images/tech/Go.png",
      "/images/tech/Postgresql.png",
      "/images/tech/redis.webp",
      "/images/tech/jwt.png",
      "/images/tech/openai.webp",
      "/images/tech/react.png"
    ],
    technologiesUsed: {
      backend: "Go (Echo)",
      database: "PostgreSQL",
      authentication: "JWT, Google OAuth",
      caching: "Redis",
      aiIntegration: "OpenAI Assistants API",
      extension: "React-based Chrome Extension",
      language: "Go, React (JS)",
      deployment: "Docker"
    },
    keyFeatures: [
      "Developed backend in Go (Echo) with JWT authentication and Google OAuth login for Gmail integration.",
      "Mapped Gmail threads to OpenAI Assistant sessions for contextual and persistent AI replies.",
      "Built a dynamic Chrome extension in React to inject reply buttons within Gmail’s evolving SPA interface.",
      "Used Redis to cache replies per Gmail thread, significantly reducing OpenAI API usage and response latency.",
      "Ensured accurate DOM tracking and rendering within Gmail’s asynchronous interface.",
      "Supported multi-account Gmail session handling and CORS-secured endpoints.",
      "Deployed all services using Docker for isolated and scalable environments."
    ],
    challengesAndSolutions: [
      "Overcame Gmail's single-page DOM mutations by dynamically tracking URL and hash changes to reliably inject the extension.",
      "Minimized OpenAI usage by implementing per-thread caching with Redis and smart invalidation strategies.",
      "Handled session persistence and security across Gmail accounts with JWT and OAuth-based identity management."
    ],
    conclusion:
      "Khatri AI delivers intelligent email replies with minimal latency, Gmail-aware UX, and robust backend design. The stack ensures privacy, scalability, and AI-enhanced productivity, making it a strong foundation for email-focused automation products."
  },
  {
    id: "semantic-search",
    title: "Semantic Search Engine with Django & MeiliSearch",
    overview:
      "Built a production-grade semantic search engine using Django, MeiliSearch, and React. Integrated HuggingFace embeddings for vector-based search and automated real-time indexing for scalable document retrieval. Deployed via Docker with Redis caching and PostgreSQL persistence.",
    image: "/images/projects/semantic search.gif",
    link: "https://semantic-search-project.com",
    techStack: [
      "/images/tech/python.png",
      "/images/tech/Postgresql.png",
      "/images/tech/meili.png",
      "/images/tech/redis.webp",
      "/images/tech/docker.png",
      "/images/tech/react.png"
    ],
    technologiesUsed: {
      backend: "Python, Django, Django REST Framework",
      database: "PostgreSQL",
      search: "MeiliSearch with HuggingFace embeddings",
      caching: "Redis",
      containerization: "Docker",
      frontend: "React",
      language: "Python, Javascript",
      deployment: "Docker Compose"
    },
    keyFeatures: [
      "Developed Django-based backend with REST APIs to support high-speed vector and semantic search operations.",
      "Integrated MeiliSearch with HuggingFace transformer embeddings for accurate and intelligent document retrieval.",
      "Automated daily ingestion and indexing with zero-downtime updates for real-time search scalability.",
      "Deployed React-based frontend with advanced search UI, sorting, and filters to optimize UX.",
      "Used Redis to cache frequent queries and reduce response time by over 70%.",
      "Implemented background workers to handle batch updates and re-indexing without impacting live service.",
      "Built a Dockerized stack for smooth deployment and consistent environment replication."
    ],
    challengesAndSolutions: [
      "Improved performance by decoupling indexing and ingestion via background jobs with Redis queueing.",
      "Tuned MeiliSearch index settings for balanced recall and precision in clinical search use cases.",
      "Addressed container orchestration and service discovery issues using Docker Compose across multiple environments."
    ],
    conclusion:
      "The Semantic Search Engine blends Django's extensibility with MeiliSearch's speed to create a real-time, high-accuracy search system. With Dockerized deployment, smart caching, and robust indexing, it’s ideal for scalable knowledge retrieval applications."
  },
  {
    id: "luggshare",
    title: "LuggShare Website",
    overview:
      "Developed a dynamic web application that facilitates luggage space sharing among air commuters. This innovative platform connects travelers with excess luggage capacity to those needing extra space, optimizing travel efficiency and reducing costs.",
    image: "/images/projects/plane.gif",
    link: "https://project-one-link.com",
    techStack: ["/images/tech/js.png", "/images/tech/React.png", "/images/tech/mongo.webp", "/images/tech/html.png", "/images/tech/css.png"],
    technologiesUsed: {
      frontend: "React",
      backend: "Node.js, Express",
      database: "MongoDB (MongoDB Atlas)",
      apis: ["Google Login", "Razorpay", "Aviationstack"],
      hosting: ["Vercel (Frontend)", "Render (Backend)"],
    },
    keyFeatures: [
      "Integrated Google Login for seamless and secure user authentication.",
      "Implemented Razorpay API for secure and convenient payment processing, enabling users to pay for luggage space directly through the platform.",
      "Utilized the Aviationstack API to provide real-time flight data, ensuring accurate information on flight schedules and availability.",
      "Built with React to ensure a responsive and user-friendly interface across all devices, enhancing user experience.",
      "Managed data using MongoDB Atlas, providing a robust, scalable, and cloud-based solution for storing user information, booking details, and transaction records.",
      "Developed an algorithm to match users needing extra luggage space with those offering it based on flight details, dates, and locations.",
      "Deployed the frontend on Vercel, ensuring fast and reliable delivery of the web application to users.",
      "Deployed the backend on Render, offering a scalable and robust environment for the server-side components.",
    ],
    challengesAndSolutions: [
      "Ensured smooth integration of multiple APIs (Google Login, Razorpay, Aviationstack) by thorough testing and handling potential edge cases to maintain data integrity and security.",
      "Designed the backend with scalability in mind, allowing the platform to handle a growing user base and increasing data loads without performance degradation.",
    ],
    conclusion:
      "This project exemplifies a comprehensive application of modern web development technologies to solve real-world problems. By leveraging the power of React, Node.js, Express, and MongoDB Atlas, combined with essential third-party APIs, the platform offers a seamless experience for air commuters looking to share luggage space, making air travel more economical and efficient. Hosting on Vercel and Render ensures reliable and scalable delivery of both the frontend and backend services.",
  },
  {
    id: "portfolio",
    title: "Portfolio Website with Chatbot",
    overview:
      "Developed a portfolio website using Vite, TypeScript, and React, integrated with a backend powered by FastAPI. The website features a chatbot that provides interactive responses based on user queries, showcasing personal projects and professional experience.",
    image: "/images/projects/port.gif",
    link: "https://portfolio-website-link.com",
    techStack: ["/images/tech/vite.png", "/images/tech/ts.webp", "/images/tech/React.png", "/images/tech/fastapi.png", "/images/tech/openai.webp", "/images/tech/hf.png"],
    technologiesUsed: {
      frontend: "React, TypeScript, Vite",
      backend: "FastAPI",
      apis: ["OpenAI", "HuggingFace"],
      hosting: ["Vercel(Frontend)", "Droplet(Digital Ocean) - tunneled via ngrok(Backend)"],
    },
    keyFeatures: [
      "Interactive chatbot developed using OpenAI's GPT-3.5, capable of answering queries based on predefined data and user interactions.",
      "Implemented FastAPI for the backend, ensuring efficient handling of API requests and integration with the frontend.",
      "Utilized Vite for rapid development and optimized build processes, enhancing the overall performance of the website.",
      "Developed with TypeScript to ensure type safety and improved code maintainability.",
      "Hosted the frontend on Vercel, providing a fast and reliable delivery of the portfolio site as a Web Service.",
      "Deployed the backend on Droplet by Digital Ocean, offering a scalable environment for API endpoints and chatbot functionalities and tunelled to the internet via Ngrok",
    ],
    challengesAndSolutions: [
      "Ensured seamless integration of OpenAI and HuggingFace APIs by conducting thorough testing and handling potential edge cases, maintaining data integrity and security.",
      "Designed the backend with a focus on scalability, allowing the platform to handle multiple concurrent user interactions without performance degradation.",
    ],
    conclusion:
      "This project demonstrates the effective use of modern web development technologies to create a dynamic and interactive portfolio website. Leveraging Vite, TypeScript, React, and FastAPI, along with powerful APIs from OpenAI and HuggingFace, the platform offers a sophisticated user experience. Hosting on Vercel and Droplet ensures reliable and scalable delivery of both the frontend and backend services. Fun Fact: You're exploring this project right now!",
  },
  {
    id: "iot-chatbot",
    title: "IoT-Enabled Device Control via AWS Lex Chatbot",
    overview:
      "Developed an innovative solution to control and monitor IoT-enabled white goods manufactured by a leading provider. This project involved integrating REST endpoints provided by the manufacturer with an AWS Lex chatbot deployed on Slack. The chatbot allows users to control various attributes of appliances such as fire alarms, fans, generators, HVACs, and query their status in real-time.",
    image: "/images/projects/chatbot.gif",
    link: "https://project-three-link.com",
    techStack: ["/images/tech/aws.webp", "/images/tech/python.png"],
    technologiesUsed: {
      iotIntegration: "REST API endpoints provided by the manufacturer",
      chatbotPlatform: "AWS Lex",
      communicationPlatform: "Slack",
      cloudServices: "Amazon Web Services (AWS)",
      languages: "Python (for backend integration)",
    },
    keyFeatures: [
      "Connected the chatbot to REST endpoints provided by the white goods manufacturer, enabling seamless communication between the chatbot and IoT devices.",
      "Empowered users to control various attributes of appliances such as turning on/off fire alarms, adjusting fan speeds, starting generators, and controlling HVAC settings through simple conversational commands on Slack.",
      "Implemented functionality to query the real-time status of appliances, providing information such as diesel levels in generators, fan speeds, CO levels in fire alarms, and temperature in HVAC systems.",
      "Leveraged AWS Lex's natural language understanding capabilities to interpret user requests and execute corresponding actions on IoT devices seamlessly.",
      "Utilized AWS services for scalability and reliability, ensuring the chatbot can handle a large number of requests and maintain high availability.",
    ],
    challengesAndSolutions: [
      "Overcame the challenge of integrating diverse IoT devices and their corresponding REST APIs by designing a modular and scalable backend architecture.",
      "Ensured accurate interpretation of user commands by fine-tuning Lex's natural language understanding models and providing comprehensive training data.",
    ],
    conclusion:
      "This project represents a successful integration of IoT technology with conversational AI, enabling users to control and monitor white goods appliances effortlessly through a Slack interface. By leveraging AWS Lex for natural language understanding and AWS services for scalability and reliability, the solution provides a seamless and efficient way to interact with IoT devices, enhancing user experience and convenience.",
  },
  {
    id: "resume-parser",
    title: "Resume Parser - spaCy NER",
    overview:
      "Developed a powerful Resume Parser application using Tesseract OCR and spaCy's Named Entity Recognition (NER) to automate and enhance the hiring process. This solution improved the efficiency of the hiring process by 25% and reduced the time taken to find the right candidate by 25%.",
    image: "/images/projects/NLP.webp",
    link: "https://project-two-link.com",
    techStack: ["/images/tech/tess.png", "/images/tech/spacy.png", "/images/tech/python.png", "/images/tech/flask.png", "/images/tech/sql.png"],
    technologiesUsed: {
      ocr: "Tesseract OCR",
      nlp: "spaCy (NER)",
      backend: "Python, Flask",
      database: "PostgreSQL",
      apis: ["Custom APIs for resume parsing"],
    },
    keyFeatures: [
      "Utilized Tesseract OCR to extract text from various resume formats (PDF, DOCX, images), converting them into machine-readable text.",
      "Implemented spaCy's NER to accurately identify and extract key information from resumes such as names, contact details, skills, education, and work experience.",
      "Used PostgreSQL to store and manage parsed resume data, ensuring efficient retrieval and processing.",
      "Developed an intuitive interface using Flask for HR personnel to upload resumes and view parsed data easily.",
      "Created a sophisticated algorithm to match candidates with job requirements based on extracted resume data, improving the quality of candidate selection.",
      "Increased the efficiency of the hiring process by 50%, and reduced the time taken to identify the right candidate by 25%, streamlining the recruitment workflow for the startup.",
    ],
    challengesAndSolutions: [
      "Enhanced the accuracy of text extraction by fine-tuning Tesseract OCR parameters and pre-processing resume files to improve text recognition rates.",
      "Improved the precision of named entity recognition by training spaCy models on a custom dataset relevant to resumes, ensuring accurate extraction of critical information.",
    ],
    conclusion:
      "This Resume Parser project showcases the effective application of Tesseract OCR and spaCy's NER in automating and enhancing the recruitment process. By leveraging advanced OCR and NLP technologies, the solution significantly improved the efficiency and effectiveness of candidate selection, demonstrating a practical and impactful use of machine learning in human resources. Hosting on Heroku ensures the application is accessible and scalable, meeting the needs of a growing startup.",
  },
  {
    id: "crack-detection",
    title: "Image Classification for Crack Detection",
    overview:
      "Developed an advanced image classification system to detect cracks in the exterior walls of buildings. The project involved using state-of-the-art convolutional neural network (CNN) architectures such as VGG, ResNet, and DenseNet, followed by the creation of a custom shallow CNN that achieved comparable performance with significantly reduced training time. The custom model exhibited an accuracy of 99% and demonstrated superior performance in reducing false positives when tested on a custom drone-captured dataset. The findings were presented and published in the SMARTCOM Conference 2023 hosted by Springer LNNS.",
    image: "/images/projects/crack.gif",
    link: "https://project-four-link.com",
    techStack: ["/images/tech/tensorflow.png", "/images/tech/keras.png", "/images/tech/python.png", "/images/tech/drone.png"],
    technologiesUsed: {
      baselineModels: "VGG, ResNet, DenseNet",
      customModel: "Shallow Convolutional Neural Network",
      frameworks: "TensorFlow, Keras",
      datasetCollection: "Drone-captured images",
      languages: "Python",
    },
    keyFeatures: [
      "Implemented and fine-tuned state-of-the-art CNN architectures (VGG, ResNet, DenseNet) for the task of crack detection in wall images.",
      "Designed and developed a shallow convolutional neural network that reduced training time by 8 times compared to baseline models while achieving an accuracy of 99%.",
      "While VGG outperformed the custom model by a margin of 0.23%, the accuracy of the custom model was highly competitive, demonstrating the effectiveness of the lightweight architecture.",
      "Addressed overfitting issues by testing models on a new dataset created using drone-captured images. The custom model outperformed baseline methods in real-world conditions, particularly in reducing false positives.",
      "The custom model cut false positives by 50% compared to baseline methods. Baseline models misclassified paint exfoliation as cracks 5 out of 10 times, while the custom model reduced this to 2 out of 10 times, demonstrating better generalization to actual cracks versus non-crack artifacts.",
      "The results and methodologies of this project were presented and published at the SMARTCOM Conference 2023, hosted by Springer LNNS, showcasing the innovation and impact of this work within the academic community.",
    ],
    challengesAndSolutions: [
      "Tackled overfitting by diversifying the training dataset and implementing regularization techniques. Testing on a drone-captured dataset further ensured model robustness.",
      "Focused on minimizing false positives by enhancing the model's ability to distinguish between cracks and similar-looking artifacts like paint exfoliation, using targeted data augmentation and custom model tuning.",
    ],
    conclusion:
      "This image classification project highlights the successful development and deployment of a custom shallow CNN for crack detection in building walls. By leveraging and improving upon established CNN architectures, the project achieved high accuracy and significantly reduced false positives, particularly in real-world testing scenarios. The solution not only demonstrated computational efficiency but also practical effectiveness, making it a valuable tool for automated building inspection and maintenance. The project was recognized and published in the SMARTCOM Conference 2023 by Springer LNNS, underscoring its contribution to the field.",
  },
  {
    id: "consultant-directory",
    title: "Consultant Directory Dashboard with Analytics and Prediction Model",
    overview:
      "Developed a custom dashboard using Streamlit for a client seeking a web application similar to Yellow Pages but focused solely on consultants in a specific region. The project involved scraping data from open-to-scrape websites using Selenium automation and integrating analytics about salaries and employee happiness in the area. Additionally, the dashboard featured a prediction model for employee happiness based on historical data, implemented using Support Vector Machines (SVM), with the results visualized within Streamlit.",
    image: "/images/projects/data.gif",
    link: "https://project-four-link.com",
    techStack: ["/images/tech/streamlit.png", "/images/tech/selenium.png", "/images/tech/python.png"],
    technologiesUsed: {
      webFramework: "Streamlit",
      dataScraping: "Selenium",
      machineLearning: "Support Vector Machines (SVM)",
      dataVisualization: "Streamlit",
      languages: "Python",
    },
    keyFeatures: [
      "Developed a user-friendly dashboard using Streamlit to allow clients to search and filter consultants based on various criteria such as expertise, location, and ratings.",
      "Implemented Selenium automation to scrape data from open-to-scrape websites, ensuring up-to-date information about consultants in the region.",
      "Integrated analytics about salaries and employee happiness in the area provided by the client, enhancing the dashboard's utility for users.",
      "Built a prediction model for employee happiness using Support Vector Machines (SVM) based on historical data. Integrated the model with the dashboard to provide insights into potential future trends in employee satisfaction.",
      "Utilized Streamlit's visualization capabilities to present the results of the prediction model in an intuitive and interactive manner, allowing clients to explore and understand the data effectively.",
    ],
    challengesAndSolutions: [
      "Overcame challenges associated with scraping data from websites by leveraging Selenium automation to ensure accurate and reliable data extraction.",
      "Addressed the complexity of building a prediction model for employee happiness by selecting and implementing Support Vector Machines (SVM), a suitable machine learning algorithm for the task.",
    ],
    conclusion:
      "The Consultant Directory Dashboard with Analytics and Prediction Model showcases the successful integration of web development, data scraping, analytics, and machine learning to meet the client's requirements. By leveraging Streamlit for dashboard creation, Selenium for data scraping, and Support Vector Machines for predictive analytics, the project delivers a comprehensive solution tailored to the client's needs, empowering users to make informed decisions regarding consultant selection and workforce management.",
  },
  // Commented out as requested
  // {
  //   id: "food-recognition",
  //   title: "Food Recognition and Restaurant/Recipe Recommendation",
  //   overview:
  //     "Constructed an Image Classification model employing YOLOv5 for specialized Indian cuisine recognition in both image and video formats, facilitating personalized restaurant and recipe recommendations. The project aimed to demonstrate how platforms like YouTube could utilize such technology to satisfy instant cravings of users who enjoy watching food vlogs.",
  //   image: "/images/projects/food.gif",
  //   link: "https://project-four-link.com",
  //   techStack: ["/images/tech/tensorflow.png", "/images/tech/keras.png", "/images/tech/python.png"],
  //   technologiesUsed: {
  //     imageClassificationModels: "YOLOv5",
  //     frameworks: "TensorFlow, Keras",
  //     datasetCollection: "Custom dataset for Indian cuisine images and videos",
  //     apiIntegration: "Zomato API for restaurant recommendations",
  //     languages: "Python",
  //   },
  //   keyFeatures: [
  //     "Implemented YOLOv5 for accurate recognition of Indian cuisine in both images and videos, enabling real-time food identification.",
  //     "Integrated Zomato API to provide personalized restaurant recommendations based on recognized cuisine and user preferences, enhancing the dining experience for users in Chennai, India.",
  //     "Developed algorithms to recommend recipes based on recognized food items, allowing users to explore new culinary adventures and recreate their favorite dishes at home.",
  //     "Utilized advanced methodologies for model tuning and optimization to achieve a 92% validation set accuracy, ensuring robust performance across diverse food categories.",
  //   ],
  //   challengesAndSolutions: [
  //     "Demonstrated how platforms like YouTube could utilize the Food Recognition system to offer personalized restaurant recommendations or recipe suggestions to users watching food vlogs, satisfying their instant cravings. The biggest challenge was to find quality labelled data for Indian cuisine which in the end was sparse. The only solution to it was creating a custom dataset that was painstakingly labelled over months using Roboflow.",
  //   ],
  //   conclusion:
  //     "The Food Recognition Project and Restaurant/Recipe Recommendation system showcase the potential of AI-driven image classification and recommendation technologies in enhancing user experience and engagement on content platforms. By accurately recognizing Indian cuisine and providing personalized recommendations, the system not only satisfies instant cravings but also enriches the culinary experiences of users in Chennai, India.",
  // },
  // {
  //   id: "hrm-app",
  //   title: "Human Resource Management App for Gas Station Chain",
  //   overview:
  //     "Developed and implemented a Human Resource Management (HRM) App using Flutter and Firebase for a local chain of gas stations. The app revolutionized SME operations by replacing paper-based processes and streamlining various tasks, ultimately saving 20 human hours monthly for the client. It served as a comprehensive solution for managing staff attendance, payroll, and daily activity logging, while also providing insightful dashboard-like visualizations.",
  //   image: "/images/projects/hr.gif",
  //   link: "https://project-four-link.com",
  //   techStack: ["/images/tech/flutter.png", "/images/tech/firebase.png", "/images/tech/dart.png"],
  //   technologiesUsed: {
  //     mobileDevelopmentFramework: "Flutter",
  //     backendServices: "Firebase",
  //     database: "Firestore",
  //     languages: "Dart",
  //   },
  //   keyFeatures: [
  //     "Implemented features for tracking staff attendance, allowing employees to check in/out electronically, eliminating the need for manual attendance registers.",
  //     "Integrated payroll management functionalities, enabling administrators to calculate salaries, bonuses, and deductions automatically based on attendance records.",
  //     "Developed modules for logging daily activities such as sales reports, fuel density records, inventory management, and customer interactions, providing real-time insights into business operations.",
  //     "Designed a dashboard-like setup within the app to visualize key performance indicators (KPIs), sales trends, employee productivity, and other relevant metrics, facilitating data-driven decision-making for management.",
  //   ],
  //   challengesAndSolutions: [
  //     "Overcame resistance to change by providing comprehensive training and support to staff during the transition from paper-based to digital processes, ensuring smooth adoption of the HRM app.",
  //     "Addressed concerns regarding data security and privacy by implementing robust authentication and access control mechanisms using Firebase Authentication and Firestore Security Rules.",
  //   ],
  //   conclusion:
  //     "The Human Resource Management App for the gas station chain represents a significant milestone in digital transformation, offering a modern, efficient, and user-friendly solution for managing HR tasks and daily operations. By leveraging Flutter and Firebase, the app not only streamlines administrative processes but also empowers management with valuable insights and analytics, ultimately driving productivity and profitability for the client.",
  // },
]
