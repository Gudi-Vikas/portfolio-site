// --- Skills Data ---
import htmlLogo from './images/html.png';
import cssLogo from './images/css.png';
import jsLogo from './images/js.png'; 
import reactjsLogo from './images/reactjs.png';
import expressjsLogo from './images/expressjs.png';
import nodejsLogo from './images/nodejs.png';
import mongodbLogo from './images/mongodb.png';
import mongodbAtlasLogo from './images/mongodb-atlas.png';
import splineLogo from './images/spline.png';
import postmanLogo from './images/postman.png';
import  gitLogo from './images/git.png';
import githubLogo from './images/github.png';
import vscodeLogo from './images/vscode.png';
import figmaLogo from './images/figma.png';
import resumeLogo from './images/resume.png'

import portfolio from './images/portfolio.png'
import ecommerce from './images/ecommerce.png'
import fitness from './images/fitness.png'
import chatapp from './images/chatapp.png'
import expense from './images/expense.png'
import musicplayer from './images/musicplayer.png'

import instaLogo from './images/instagram.png'
import linkedInLogo from './images/linkedIn.png'
import gmailLogo from './images/gmail.png'
import githubWhite from './images/github-white.png'

export  const socialMediaLogo = [{logo:instaLogo, link:"https://www.instagram.com/vikas_gudi?igsh=YmJ5MmtiNXVjN204"},,{logo:linkedInLogo,link:"https://www.linkedin.com/in/vikas-gudi"},{logo:gmailLogo,link:"mailto:vikasgudii@gmail.com"},{logo:githubWhite,link:"https://github.com/Gudi-Vikas"}]
export const frontendLogo = [
  { name: 'HTML', logo: htmlLogo, link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', logo: cssLogo, link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'JS', logo: jsLogo, link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'ReactJs', logo: reactjsLogo, link: 'https://react.dev/' },
];

export const backendLogo = [
  { name: 'NodeJs', logo: nodejsLogo, link: 'https://nodejs.org/' },
  { name: 'ExpressJs', logo: expressjsLogo, link: 'https://expressjs.com/' },
  { name: 'MongoDb', logo: mongodbLogo, link: 'https://www.mongodb.com/' },
];


export const gitHubLogo = githubLogo;
export const linkedIn = linkedInLogo;
export const ResumeLogo = resumeLogo;

export const toolsLogo = [
  { name: 'Git', logo: gitLogo, link: 'https://git-scm.com/' },
  { name: 'GitHub', logo: githubLogo, link: 'https://github.com/' },
  { name: 'MongoDb Atlas', logo: mongodbAtlasLogo, link: 'https://www.mongodb.com/atlas' },
  { name: 'Postman', logo: postmanLogo, link: 'https://www.postman.com/' },
  { name: 'VScode', logo: vscodeLogo, link: 'https://code.visualstudio.com/' },
  { name: 'Spline', logo: splineLogo, link: 'https://spline.design/' },
  { name: 'Figma', logo: figmaLogo, link: 'https://figma.com/' },
];

// --- Projects Data ---
export const projects = [
  {
    title: 'Portfolio Website',
    image: portfolio,
    desc: 'A personal portfolio built with React and Vite, showcasing skills and projects with a modern UI. It features a responsive design, smooth animations, and a modular codebase for easy updates. The site highlights my technical skills, work experience, and contact information. Visitors can explore my best work and get in touch for collaboration or hiring.',
    technologies: ['React', 'Vite', 'CSS'],
    started: '1/10/2024',
    completed: '2/15/2024',
    repo: 'https://github.com/example/portfolio',
    demo: 'https://portfolio.example.com'
  },
  {
    title: 'E-commerce Store',
    image: ecommerce,
    desc: 'A full-stack e-commerce app with product catalog, cart, and secure checkout. Users can browse products, add items to their cart, and complete purchases with integrated payment gateways. The admin dashboard allows for inventory management and order tracking. Built for scalability and performance, the app supports thousands of products and users.',
    technologies: ['React', 'Node.js', 'MongoDB','Expressjs'],
    started: '3/1/2024',
    completed: '4/10/2024',
    repo: 'https://github.com/example/ecommerce',
    demo: 'https://ecommerce.example.com'
  },

  {
    title: 'Fitness Tracker',
    image: fitness,
    desc: 'Track workouts, calories, and progress with charts and goals. The app supports custom workout plans, daily activity logging, and progress visualization. Users can set fitness goals, monitor achievements, and receive motivational tips. Built with mobile-first design, it syncs data across devices for a seamless experience.',
    technologies: ['React Native', 'Expo', 'Node.js'],
    started: '2/15/2024',
    completed: '3/10/2024',
    repo: 'https://github.com/example/fitness',
    demo: 'https://fitness.example.com'
  },
  {
    title: 'Chat App',
    image: chatapp,
    desc: 'A real-time chat application with group and private messaging. Users can create chat rooms, send direct messages, and share files. The app features typing indicators, read receipts, and emoji support. Built for reliability and speed, it keeps conversations secure and always in sync.',
    technologies: ['Socket.io', 'Node.js', 'React'],
    started: '1/5/2024',
    completed: '2/1/2024',
    repo: 'https://github.com/example/chat',
    demo: 'https://chat.example.com'
  },
  {
    title: 'Expense Tracker',
    image: expense,
    desc: 'Monitor expenses, set budgets, and visualize spending habits. The app provides detailed charts, monthly summaries, and alerts for overspending. Users can categorize transactions, export data, and set financial goals. Designed for personal and small business use, it makes money management simple and effective.',
    technologies: ['React', 'Redux', 'Chart.js'],
    started: '2/10/2024',
    completed: '3/5/2024',
    repo: 'https://github.com/example/expense',
    demo: 'https://expense.example.com'
  },
  {
    title: 'Music Player',
    image: musicplayer,
    desc: 'A stylish music player with playlists, search, and album art. Users can create and manage playlists, search for songs, and enjoy high-quality audio streaming. The player features a modern UI, smooth transitions, and offline support. Perfect for music lovers who want a beautiful and functional listening experience.',
    technologies: ['React', 'Redux', 'CSS'],
    started: '3/15/2024',
    completed: '4/10/2024',
    repo: 'https://github.com/example/music',
    demo: 'https://music.example.com'
  }
]; 