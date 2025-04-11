import { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  CheckCircle, 
  Award, 
  BookOpen, 
  FileText 
} from 'lucide-react';
import './App.css';

// Profile data - moved outside component for cleaner organization
const profile = {
  name: "Alex Johnson",
  title: "Computer Science Engineer",
  about: "Passionate software engineer with expertise in full-stack development, machine learning, and cloud architecture. Skilled in solving complex problems and building scalable applications.",
  skills: [
    { name: "JavaScript/React", level: 90 },
    { name: "Python", level: 85 },
    { name: "Java", level: 75 },
    { name: "Cloud Services (AWS/Azure)", level: 80 },
    { name: "Machine Learning", level: 70 },
    { name: "System Design", level: 85 }
  ],
  education: [
    { 
      degree: "Master of Science in Computer Science", 
      institution: "Stanford University", 
      year: "2020-2022",
      details: "Specialized in Machine Learning and Distributed Systems"
    },
    { 
      degree: "Bachelor of Technology in Computer Science", 
      institution: "MIT", 
      year: "2016-2020",
      details: "Minor in Mathematics"
    }
  ],
  experience: [
    {
      position: "Senior Software Engineer",
      company: "TechCorp Inc.",
      period: "2022-Present",
      responsibilities: [
        "Led the development of microservices architecture",
        "Optimized database performance resulting in 40% faster response times",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      position: "Software Developer",
      company: "InnovateTech",
      period: "2020-2022",
      responsibilities: [
        "Developed and maintained web applications using React",
        "Implemented CI/CD pipelines for automated testing and deployment",
        "Contributed to open-source projects"
      ]
    }
  ],
  projects: [
    {
      title: "AI-Powered Image Recognition System",
      technologies: ["Python", "TensorFlow", "React", "AWS"],
      description: "Built a system that identifies objects in images with 95% accuracy using deep learning models.",
      codeSnippet: `
def predict_image(image_path):
    model = load_model('model.h5')
    img = preprocess_image(image_path)
    prediction = model.predict(img)
    return decode_predictions(prediction)
`,
      demoLink: "#"
    },
    {
      title: "Distributed Task Management System",
      technologies: ["Java", "Spring Boot", "RabbitMQ", "Docker"],
      description: "Developed a scalable task management system handling 10,000+ concurrent tasks with load balancing.",
      codeSnippet: `
@Service
public class TaskDistributor {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void distributeTask(Task task) {
        rabbitTemplate.convertAndSend("task-exchange", 
                                     "task.queue", 
                                     task);
    }
}
`,
      demoLink: "#"
    },
    {
      title: "Real-time Data Analytics Dashboard",
      technologies: ["React", "D3.js", "Node.js", "WebSockets"],
      description: "Created an interactive dashboard that visualizes real-time data streams with customizable views.",
      codeSnippet: `
const DataChart = ({ data }) => {
  useEffect(() => {
    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
      
    // Create visualization with the data
    updateChart(svg, data);
  }, [data]);
  
  return <div id="chart"></div>;
}
`,
      demoLink: "#"
    }
  ],
  githubStats: {
    repos: 42,
    stars: 127,
    contributions: 1248,
    followers: 89
  },
  certificates: [
    "AWS Certified Solutions Architect",
    "Google Professional Machine Learning Engineer",
    "MongoDB Certified Developer"
  ],
  publications: [
    "Efficient Deep Learning Models for Edge Computing (IEEE 2023)",
    "Optimizing Microservices Architecture for Performance (ACM 2022)"
  ]
};

// Separate component for Resume tab
const Resume = () => (
  <div className="resume-section">
    <div className="about-section">
      <h2>About Me</h2>
      <p>{profile.about}</p>
    </div>
    
    <div className="skills-section">
      <h2>Skills</h2>
      <div className="skills-container">
        {profile.skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-bar-bg">
              <div 
                className="skill-bar-fill" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="experience-section">
      <h2>Experience</h2>
      <div className="experience-container">
        {profile.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.position}</h3>
            <div className="experience-meta">{exp.company} | {exp.period}</div>
            <ul className="experience-list">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    
    <div className="education-section">
      <h2>Education</h2>
      <div className="education-container">
        {profile.education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.degree}</h3>
            <div className="education-meta">{edu.institution} | {edu.year}</div>
            <p>{edu.details}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Separate component for Portfolio tab
const Portfolio = ({ activeProject, setActiveProject }) => (
  <div className="portfolio-section">
    <div className="project-tabs">
      {profile.projects.map((project, index) => (
        <button
          key={index}
          className={`project-tab ${activeProject === index ? 'active' : ''}`}
          onClick={() => setActiveProject(index)}
        >
          {project.title}
        </button>
      ))}
    </div>
    
    <div className="project-details">
      <div className="project-header">
        <h2>{profile.projects[activeProject].title}</h2>
        <a 
          href={profile.projects[activeProject].demoLink} 
          className="demo-button"
        >
          Live Demo
        </a>
      </div>
      
      <div className="project-technologies">
        {profile.projects[activeProject].technologies.map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
      
      <p className="project-description">
        {profile.projects[activeProject].description}
      </p>
      
      <div className="code-snippet">
        <pre>
          <code>{profile.projects[activeProject].codeSnippet}</code>
        </pre>
      </div>
    </div>
  </div>
);

// Separate component for GitHub Stats tab
const GitHubStats = () => (
  <div className="github-section">
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-value">{profile.githubStats.repos}</div>
        <div className="stat-label">Repositories</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{profile.githubStats.stars}</div>
        <div className="stat-label">Stars</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{profile.githubStats.contributions}</div>
        <div className="stat-label">Contributions</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{profile.githubStats.followers}</div>
        <div className="stat-label">Followers</div>
      </div>
    </div>
    
    <div className="achievements-grid">
      <div className="achievement-card">
        <div className="achievement-header">
          <Award className="icon blue" />
          <h3>Certifications</h3>
        </div>
        <ul className="achievement-list">
          {profile.certificates.map((cert, index) => (
            <li key={index} className="achievement-item">
              <CheckCircle size={16} className="icon green" />
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="achievement-card">
        <div className="achievement-header">
          <BookOpen className="icon blue" />
          <h3>Publications</h3>
        </div>
        <ul className="achievement-list">
          {profile.publications.map((pub, index) => (
            <li key={index} className="achievement-item">
              <FileText size={16} className="icon blue" />
              <span>{pub}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// Header component
const ProfileHeader = () => (
  <div className="profile-header">
    <div className="profile-info">
      <h1 className="profile-name">{profile.name}</h1>
      <p className="profile-title">{profile.title}</p>
      <div className="social-links">
        <a href="https://github.com/arun1111j" className="social-link">
          <Github />
        </a>
        <a href="#" className="social-link">
          <Linkedin />
        </a>
        <a href="#" className="social-link">
          <Mail />
        </a>
        <a href="#" className="social-link">
          <Code />
        </a>
      </div>
    </div>
    
    <div className="profile-avatar">
      {profile.name.split(' ').map(name => name[0]).join('')}
    </div>
  </div>
);

// Navigation component
const Navigation = ({ activeTab, setActiveTab }) => (
  <div className="navigation-tabs">
    <button 
      className={`nav-tab ${activeTab === 'resume' ? 'active' : ''}`}
      onClick={() => setActiveTab('resume')}
    >
      Interactive Resume
    </button>
    <button 
      className={`nav-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
      onClick={() => setActiveTab('portfolio')}
    >
      Project Portfolio
    </button>
    <button 
      className={`nav-tab ${activeTab === 'github' ? 'active' : ''}`}
      onClick={() => setActiveTab('github')}
    >
      GitHub Profile
    </button>
  </div>
);

// Contact section component
const ContactSection = () => (
  <div className="contact-section">
    <h2>Let's Connect</h2>
    <p>Interested in collaborating or have a project in mind? Feel free to reach out!</p>
    <button className="contact-button">
      Contact Me
    </button>
  </div>
);

// Main App component
function App() {
  const [activeTab, setActiveTab] = useState('resume');
  const [activeProject, setActiveProject] = useState(0);
  
  return (
    <div className="profile-container">
      {/* Header section */}
      <ProfileHeader />
      
      {/* Navigation tabs */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Content based on active tab */}
      <div className="content-container">
        {activeTab === 'resume' && <Resume />}
        {activeTab === 'portfolio' && <Portfolio activeProject={activeProject} setActiveProject={setActiveProject} />}
        {activeTab === 'github' && <GitHubStats />}
      </div>
      
      {/* Contact section */}
      <ContactSection />
    </div>
  );
}

export default App;