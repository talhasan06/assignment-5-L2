import React from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaGitAlt, 
  FaDocker, 
  FaFigma 
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiMongodb, 
  SiExpress 
} from 'react-icons/si';

const skills = [
  { name: 'React', icon: <FaReact size={48} />, level: 90 },
  { name: 'Next.js', icon: <SiNextdotjs size={48} />, level: 85 },
  { name: 'JavaScript', icon: <SiJavascript size={48} />, level: 95 },
  { name: 'TypeScript', icon: <SiTypescript size={48} />, level: 80 },
  { name: 'Node.js', icon: <FaNodeJs size={48} />, level: 85 },
  { name: 'Express', icon: <SiExpress size={48} />, level: 80 },
  { name: 'MongoDB', icon: <SiMongodb size={48} />, level: 75 },
  { name: 'SQL', icon: <FaDatabase size={48} />, level: 70 },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={48} />, level: 90 },
  { name: 'Git', icon: <FaGitAlt size={48} />, level: 85 },
  { name: 'Docker', icon: <FaDocker size={48} />, level: 65 },
  { name: 'UI/UX Design', icon: <FaFigma size={48} />, level: 75 },
];

const Skills = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Skills</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I've worked with a variety of technologies in the web development world. 
            Here are the major skills I've acquired over the years.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
            >
              <div className="mb-4 text-blue-600">{skill.icon}</div>
              <h3 className="text-lg font-medium mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{skill.level}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;