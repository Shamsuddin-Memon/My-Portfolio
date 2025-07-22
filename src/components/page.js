import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import {
  Mail,
  MapPin,
  Linkedin,
  Code,
  Briefcase,
  GraduationCap,
  Star,
  Menu,
  X,
  Instagram,
} from "lucide-react";
import pic from "../components/my.jpg";
import pic2 from "../components/Screenshot_17-7-2025_165618_db-final.netlify.app.jpeg";
import pic3 from "../components/Screenshot_17-7-2025_17529_textutilsbyshams.netlify.app.jpeg";
import Pic4 from "../components/Screenshot_17-7-2025_173240_localhost.jpeg";
const Portfolio = () => {
  const mountRef = useRef(null);
  const [currentSection, setCurrentSection] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const localMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    localMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.ConeGeometry(0.7, 1.5, 8),
      new THREE.TorusGeometry(0.7, 0.3, 8, 16),
      new THREE.OctahedronGeometry(0.8),
    ];

    const colors = [0x3b82f6, 0x1e40af, 0x06b6d4, 0x0891b2, 0x64748b];

    for (let i = 0; i < 15; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshLambertMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.8,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!localMount) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (localMount && renderer.domElement) {
        localMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const skills = [
    { name: "React", level: 90, icon: <Code className="w-5 h-5" /> },
    { name: "HTML/CSS", level: 95, icon: <Code className="w-5 h-5" /> },
    { name: ".NET", level: 75, icon: <Code className="w-5 h-5" /> },
    { name: "JavaScript", level: 85, icon: <Code className="w-5 h-5" /> },
    { name: "C#", level: 80, icon: <Code className="w-5 h-5" /> },
    { name: "Tailwind CSS", level: 90, icon: <Code className="w-5 h-5" /> },
  ];

  const projects = [
    {
      title: "Library Management System",
      description:
        "Full-stack library management solution built with React and Node.js",
      tech: ["React", "Node.js", "SQL Server", "Tailwind CSS"],
      gradient: "from-blue-500 to-cyan-500",
      URL: "pic2",
    },
    {
      title: "Text-Editor",
      description:
        "TextUtils – A React-based web app for quick text transformations like case conversion, space removal, and word/character counting.",
      tech: ["React", "Bootstrap", "JavaScript", "HTML/CSS"],
      gradient: "from-blue-500 to-cyan-500",
      URL: "pic3",
    },
    {
      title: "News-Site",
      description:
        "NewsApp is a responsive, React-based news application that integrates with a live News API to deliver real-time headlines across various categories including business, technology, entertainment, and more.",
      tech: ["React", "CSS3", "Tailwind CSS", "Responsive Design"],
      gradient: "from-blue-500 to-cyan-500",
      URL: "Pic4",
    },
  ];

  // Update currentSection based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["Home", "about", "skills", "projects", "contact"];
      let found = false;
      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            setCurrentSection(sectionIds[i]);
            found = true;
            break;
          }
        }
      }
      if (!found) setCurrentSection("Home");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // 3D Logo Component
  const Logo3D = () => (
    <div className="relative group">
      <div className="text-3xl font-bold text-white transform-gpu transition-all duration-300 hover:scale-110">
        <div className="relative">
          <span className="text-blue-400 drop-shadow-lg filter">S</span>
          <span className="text-cyan-400 drop-shadow-lg filter">M</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 transform group-hover:scale-125"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo3D />

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["Home", "about", "skills", "projects", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize relative transition-all duration-300 hover:text-blue-400 ${
                      currentSection === section
                        ? "text-blue-400"
                        : "text-white/80"
                    }`}
                  >
                    {section}
                    <div
                      className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${
                        currentSection === section ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></div>
                  </button>
                )
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/40 backdrop-blur-lg rounded-lg mt-2 mb-4 border border-white/10">
              <div className="px-4 py-2 space-y-2">
                {["Home", "about", "skills", "projects", "contact"].map(
                  (section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`w-full text-left px-4 py-3 rounded-lg capitalize transition-all duration-300 hover:bg-white/10 ${
                        currentSection === section
                          ? "text-blue-400 bg-white/5"
                          : "text-white/80"
                      }`}
                    >
                      {section}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="Home"
        className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-32"
      >
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 relative">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl relative group">
              {/* 3D Profile Picture Frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-slate-500 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105">
                <div className="w-44 h-44 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-inner">
                  <img
                    src={pic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>

              {/* 3D border effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 shadow-2xl"></div>
              <div className="absolute inset-1 rounded-full border border-white/20"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-slate-400 bg-clip-text text-transparent drop-shadow-lg">
              Shamsuddin Memon
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Full-Stack Developer & Student at SZABIST Islamabad
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 border-2 border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-3 shadow-lg">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Education</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Currently pursuing my degree at SZABIST Islamabad Campus,
                  focusing on modern web technologies and software development
                  practices.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mr-3 shadow-lg">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Experience</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Currently working as a .NET Developer Intern, gaining hands-on
                  experience in full-stack development while mastering React,
                  HTML, CSS, and modern web frameworks.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  What I Do
                </h3>
                <div className="space-y-4">
                  {[
                    "Frontend Development with React & Modern CSS",
                    "Backend Development with .NET Framework",
                    "Responsive Web Design & User Experience",
                    "Database Management & Integration",
                    "Full-Stack Application Development",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="p-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/90 group-hover:text-white transition-colors duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            Skills & Technologies
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>

                <div className="w-full bg-white/10 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-white/60 text-sm">
                  {skill.level}% Proficiency
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                  <div
                    className={`w-full h-48 bg-gradient-to-r ${project.gradient} rounded-xl mb-6 flex items-center justify-center shadow-lg`}
                  >
                    <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                      <img
                        src={
                          project.URL === "pic1"
                            ? pic
                            : project.URL === "pic2"
                            ? pic2
                            : project.URL === "pic3"
                            ? pic3
                            : project.URL === "Pic4"
                            ? Pic4
                            : null
                        }
                        alt="Project Thumbnail"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-white/80 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90 backdrop-blur-sm border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            Get In Touch
          </h2>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-white/80 leading-relaxed">
                  I'm always open to discussing new opportunities,
                  collaborations, or just having a chat about technology and
                  development.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 group">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail
                        className="w-5 h-5"
                        onClick={() =>
                          window.open(
                            "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWsTKzZTqrNHCjdmDTPFPMjwZFszRmQTKrNcjHrgnTPsrhKhPnWXLLzlBXvKFWBNsjwSQRRtb",
                            "_blank"
                          )
                        }
                      />
                    </div>
                    <span className="text-white/90 group-hover:text-white transition-colors duration-300">
                      shamsuddinmemon.77@gmail.com
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 group">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-white/90 group-hover:text-white transition-colors duration-300">
                      Islamabad, Pakistan
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 group">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-white/90 group-hover:text-white transition-colors duration-300">
                      SZABIST Islamabad Campus
                    </span>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110 shadow-lg"
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/shams_memon2/#",
                        "_blank"
                      )
                    }
                  >
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110 shadow-lg"
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/shamsuddin-memon-723921285/",
                        "_blank"
                      )
                    }
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300"
                />
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 resize-none"
                ></textarea>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">
            © 2025 Shamsuddin Memon. Crafted with React & Modern CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
