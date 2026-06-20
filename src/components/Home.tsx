import { motion } from 'framer-motion';
import { 
  Scissors, 
  Ruler, 
  UtensilsCrossed, 
  Home as HomeIcon, 
  Music, 
  Terminal, 
  PenTool, 
  TrendingUp, 
  Share2, 
  Layout,
  ArrowRight,
  Check,
  Calendar,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const skills = [
  { id: 1, name: 'Hair Making', icon: Scissors, desc: 'Professional braiding, styling, and hair care techniques.' },
  { id: 2, name: 'Tailoring', icon: Ruler, desc: 'Pattern drafting, sewing, and modern fashion design.' },
  { id: 3, name: 'Catering & Baking', icon: UtensilsCrossed, desc: 'Culinary arts, pastries, and event catering management.' },
  { id: 4, name: 'Household Production', icon: HomeIcon, desc: 'Creating essentials and products for daily home living.' },
  { id: 5, name: 'Instrumental Music', icon: Music, desc: 'Mastering instruments and foundational music theory.' },
  { id: 6, name: 'Coding', icon: Terminal, desc: 'Software development, programming, and tech fundamentals.' },
  { id: 7, name: 'Graphic Design', icon: PenTool, desc: 'Visual communication, branding, and digital illustration.' },
  { id: 8, name: 'Trading & Business', icon: TrendingUp, desc: 'Financial markets, business strategy, and sales skills.' },
  { id: 9, name: 'Social Media', icon: Share2, desc: 'Digital marketing, content creation, and community management.' },
  { id: 10, name: 'Website Design', icon: Layout, desc: 'Building responsive, modern, and user-friendly websites.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-indigo-200">
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="h-[2px] w-12 bg-slate-900"></div>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-slate-900">FCN Amilegbe UITH Chapter</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-8">
              Empowering lives <br className="hidden md:block"/>
              through <span className="text-indigo-600 font-serif italic pr-2">skills</span> <br className="hidden md:block"/>
              and <span className="text-indigo-600 font-serif italic pr-2">creativity.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 leading-relaxed font-light max-w-xl">
              Welcome to our 6-Month Skills & Entrepreneurship Program — a platform created to equip youths and adults with practical skills and entrepreneurial knowledge.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/signup" className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
                Secure Your Space <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="px-6 py-4 bg-white border border-slate-200 rounded-full font-medium text-slate-700 flex items-center gap-3 shadow-sm">
                <Calendar className="w-5 h-5 text-slate-400" />
                <span>6 Months Intensive</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex w-full lg:w-[450px] relative mt-12"
          >
             <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-indigo-50 p-8 rounded-[2rem] aspect-square flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500">
                   <Terminal className="w-10 h-10 text-indigo-600" strokeWidth={1.5} />
                   <span className="font-medium text-indigo-900 text-lg">Digital<br/>Skills</span>
                </div>
                <div className="bg-rose-50 p-8 rounded-[2rem] aspect-square flex flex-col justify-between mt-12 hover:-translate-y-2 transition-transform duration-500">
                   <Scissors className="w-10 h-10 text-rose-600" strokeWidth={1.5} />
                   <span className="font-medium text-rose-900 text-lg">Vocational<br/>Crafts</span>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* About Section (Editorial / Bento Style) */}
      <section className="bg-slate-900 text-slate-50 py-24 md:py-32 rounded-[2rem] md:rounded-[3rem] mx-4 md:mx-8 mb-24 md:mb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* Left Column - Large Typography Goal */}
              <div className="lg:col-span-7">
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 leading-tight">
                   Our goal is to raise skilled, creative, and financially empowered individuals who can positively impact their communities.
                 </h2>
                 <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl">
                   Whether you want to start a business, develop a talent, or gain a profitable skill, this program is organized to help participants learn from experienced instructors in a supportive, faith-based environment.
                 </p>
                 
                 <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700/50 inline-block">
                    <h3 className="text-lg font-medium mb-4 text-white flex items-center gap-3">
                       <Check className="w-5 h-5 text-indigo-400" /> What You Will Gain
                    </h3>
                    <ul className="space-y-4">
                       {[
                         "Practical hands-on training",
                         "Entrepreneurial knowledge & mentorship",
                         "Networking opportunities & self-development",
                         "Certificate of participation upon completion"
                       ].map(item => (
                         <li key={item} className="flex items-start gap-3">
                           <Check className="w-5 h-5 text-slate-500 shrink-0" />
                           <span className="text-slate-300 font-light">{item}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

              {/* Right Column - Who Can Apply */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                 <div className="bg-indigo-600 rounded-[2rem] p-8 md:p-12 text-white">
                    <h3 className="text-2xl font-medium mb-8 flex items-center gap-3">
                       <Users className="w-6 h-6 text-indigo-200" /> Who Can Apply?
                    </h3>
                    <div className="flex flex-col gap-4 mb-8">
                       {['Teenagers', 'Youths', 'Students', 'Adults'].map((item, i) => (
                         <div key={item} className="flex items-center gap-4">
                           <span className="w-8 h-8 rounded-full bg-indigo-500/50 flex items-center justify-center text-sm font-medium">0{i+1}</span>
                           <span className="text-xl font-light">{item}</span>
                         </div>
                       ))}
                    </div>
                    <div className="pt-8 border-t border-indigo-500/50">
                      <p className="text-indigo-100 italic">
                        No prior experience is required for most courses. We welcome beginners and enthusiasts alike.
                      </p>
                    </div>
                 </div>
              </div>
              
           </div>
        </div>
      </section>

      {/* Available Skills Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight">Available Skills</h2>
            <p className="text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
              Select from our curated list of high-demand skills taught by experienced industry professionals.
            </p>
          </div>
          <div className="hidden md:block">
            <Link to="/signup" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-2">
              Browse all courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill) => (
             <motion.div 
               key={skill.id}
               whileHover={{ y: -5 }}
               className="group p-8 rounded-[2rem] bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-default flex flex-col h-full"
             >
               <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-indigo-50 group-hover:border-indigo-100">
                 <skill.icon className="w-6 h-6 text-slate-700 group-hover:text-indigo-600 transition-colors" strokeWidth={1.5} />
               </div>
               <h3 className="text-xl font-medium text-slate-900 mb-3">{skill.name}</h3>
               <p className="text-slate-500 leading-relaxed font-light mt-auto">{skill.desc}</p>
             </motion.div>
          ))}
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section className="bg-slate-100 py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-8 tracking-tight">Ready to begin your journey?</h2>
          <p className="text-xl text-slate-600 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Limited slots are available. Secure your space in your preferred skill area by registering today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors w-full sm:w-auto shadow-sm hover:shadow-md">
              Complete Registration
            </Link>
             <a 
    href="https://wa.me/+2347078404830?text=Hello%20I'm%20interested%20in%20your%20skills%20and%20entrepreneurship%20program" 
    target="_blank" 
    rel="noopener noreferrer"
    className="px-8 py-4 bg-white text-slate-700 rounded-full font-medium border-slate-200 hover:bg-slate-50 transition-colors w-full sm:w-auto"
  >
    Contact Coordinators
  </a>
          </div>
          <p className="mt-16 text-slate-400 text-sm font-medium uppercase tracking-widest">
            We look forward to learning, growing, and building together.
          </p>
        </div>
      </section>

    </div>
  );
}
