import React from 'react';
import logo from "../assets/logo-round.png";

const AboutUs = () => {

    const items = [
        { 
          img: "https://github.com/chathuradissanayake/SecurePassAI-Developers/blob/main/Developers/Chathura_Dissanayake.jpg?raw=true", 
          text: "Chathura Dissanayake", 
          link: "https://www.linkedin.com/in/chathura-dissanayake/" 
        },
        { 
          img: "https://github.com/chathuradissanayake/SecurePassAI-Developers/blob/main/Developers/Yoosuf_Aathil.jpg?raw=true", 
          text: "Yoosuf Aathil", 
          link: "https://www.linkedin.com/in/yoosuf-aathil/" 
        },
        { 
          img: "https://github.com/chathuradissanayake/SecurePassAI-Developers/blob/main/Developers/Shavindu_Rajapaksha.jpeg?raw=true", 
          text: "Shavindu Rajapaksha", 
          link: "http://www.linkedin.com/in/shavindu-rajapaksha-953007223" 
        },
        { 
          img: "https://github.com/chathuradissanayake/SecurePassAI-Developers/blob/main/Developers/Mohamed_Afraar.jpg?raw=true", 
          text: "Mohamed Afraar", 
          link: "https://www.linkedin.com/in/mohamed-afraar/" 
        },
      ];

  return (
    <div className='overflow-auto [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-track]:bg-gray-100
                      [&::-webkit-scrollbar-thumb]:rounded-full
                      [&::-webkit-scrollbar-thumb]:bg-gray-300
                      dark:[&::-webkit-scrollbar-track]:bg-slate-800
                      dark:[&::-webkit-scrollbar-thumb]:bg-slate-500'style={{ height: 'calc(100vh - 200px)' }}>
      
      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
              App Information
        </h3>
      <div className="flex justify-center mb-6">
          <img
            src={logo} // Replace with your logo's URL
            alt="Logo"
            className="h-40"
          />
        </div>

        <p className="text-gray-600 text-sm mb-6 dark:text-slate-200">
          Welcome to <span className="font-semibold">SecurePass AI</span>, where innovation meets excellence. We are a team of passionate developers, designers, and strategists dedicated to delivering top-notch digital solutions tailored to your needs.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100">Our Mission</h2>
        <p className="text-gray-600 mb-6 text-sm dark:text-slate-200">
          Our mission is to empower businesses by providing cutting-edge technology solutions that drive growth and efficiency. We believe in building strong, long-term relationships with our clients and exceeding their expectations through quality and creativity.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100">Our Vision</h2>
        <p className="text-gray-600 mb-6 text-sm dark:text-slate-200">
          To be a global leader in the digital landscape, known for our innovative approach and commitment to excellence. We aim to transform ideas into reality and create impactful experiences for users worldwide.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-slate-100">Meet the Developers</h3>
      <div className="flex justify-center rounded-full space-x-4 mt-6">
        {items.map((item, index) => (
          <div key={index} className="text-center">
            <img
              src={item.img}
              alt={item.text}
              className="w-36 h-36 object-cover rounded-md shadow-md"
            />
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 text-gray-400 hover:underline text-xs"
            >
              {item.text}
            </a>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AboutUs
