
import { Appbar } from "../components/Appbar"
import { useNavigate } from "react-router-dom";
import { BookOpen , Users, Star, Pen, Siren as Fire,MoveRight } from 'lucide-react';


export const HomePage = () => {
    const navigate = useNavigate();

    const trendingArticles = [
        {
          id: "2ea60bf6-7a77-4fe9-b01d-6e0507723f3a",
          author: "Chris Martin",
          title: "The Future of AI: Breaking New Boundaries",
          readTime: "8 min read",
          imageId: "https://i.ibb.co/Kc6L52z1/DALL-E-2025-02-07-17-02-50-A-futuristic-representation-of-artificial-intelligence-The-image-features.webp",
          excerpt: "Artificial Intelligence (AI) is evolving at an unprecedented pace, redefining industries, economies, and our daily lives. From self-learning algorithms to human-like generative models, AI is pushing the boundaries of what technology can achieve. As we move into the future, AI promises to revolutionize multiple sectors while also raising critical ethical and regulatory concerns. Let’s explore the key advancements and challenges shaping the future of AI."
        },
        {
          id: "cbe840a2-583b-40c1-8272-8cd5343bc392",
          author: "Test user",
          title: "Why Remote Work is Here to Stay",
          readTime: "5 min read",
          imageId: "https://i.ibb.co/HD7sX4Sq/cio-work-from-home-after-covid.webp",
          excerpt: "Remote work has transformed from a temporary solution to a long-term shift in the modern workforce. Advances in technology, shifting employee expectations, and proven productivity gains have cemented its place in the future of work. Companies and employees alike are recognizing the benefits, leading to widespread adoption across various industries."
        },
        {
          id: "b2127350-ff9f-4446-891b-3b22e7fb277a",
          author: "Matt Burgess",
          title: "The Art of Mindful Productivity",
          readTime: "5 min read",
          imageId: "https://i.ibb.co/93GqvTjj/DALL-E-2025-02-07-17-11-04-A-serene-workspace-designed-for-mindful-productivity-The-image-features-a.webp",
          excerpt: "In a world that glorifies hustle culture, mindful productivity offers a refreshing approach to achieving success without burnout. By integrating mindfulness into daily routines, individuals can enhance focus, reduce stress, and improve overall well-being. Here’s how you can master the art of mindful productivity."
        },
        {
          id: 4,
          author: "NEFTURE SECURITY I Blockchain Security",
          title: "Sustainable Living in 2025",
          readTime: "7 min read",
          imageId: "https://i.ibb.co/LXxhKQD9/DALL-E-2025-02-07-17-14-17-A-futuristic-eco-friendly-city-in-2025-featuring-solar-panels-wind-turbin.webp",
          excerpt: "As we enter 2025, sustainable living has become more than just a trend—it’s a necessity. With climate change accelerating and natural resources depleting, individuals and businesses are making conscious efforts to adopt greener lifestyles. Sustainability is no longer about making minor adjustments; it’s about revolutionizing the way we live, work, and consume. Here’s an in-depth look at how sustainable living is shaping the future in 2025."
        },
        {
            id: 5,
            author: "unni",
            title: "JWT vs PASETO: New Era of Token-Based Authentication",
            readTime: "11 min read",
            imageId: "https://i.ibb.co/Cm7rQYh/0-g-BCj-HX7-Yz-V7a8-Ob-Y.webp",
            excerpt: "This article delves into a comprehensive comparison of Paseto and JWT, dissecting their core functionalities, security features, and potential drawbacks"
        },
        {
            id: 6,
            author: "NEFTURE SECURITY I Blockchain Security",
            title: " Simple Steps to Mitigate Counterparty Risk in Crypto",
            readTime: "20 min read",
            imageId: "https://i.ibb.co/znQ6hsV/1-b-A4t0h4-V7-Ek54-Rj-HPOru-YQ.webp",
            excerpt: "Counterparty risk refers to potential losses resulting from the default or failure of a party you transact with in the crypto space, encompassing fraud, financial, and security risks."
        },
       
      ];

    return (
        <div>
            <Appbar/>

        <div style={{height:'420px',marginTop:'64px'}} className="bg-yellow-400 w-full pt-10 mb-96">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-serif font-bold text-black mb-6">
                Stay curious.
              </h1>
              <p className="text-xl text-gray-800 mb-8">
                Discover stories, thinking, and expertise from writers on any topic.
              </p>
              <button onClick={() => navigate('/signin')} className="bg-black text-white rounded-full px-8 py-3 text-xl hover:bg-gray-800">
                Start reading
              </button>
            </div>
            <div className="hidden lg:block">
              <Pen className="h-64 w-64 text-black" />
            </div>
          </div>
        </div>

      <section className="mt-28 mb-4 py-10 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <Fire className="h-8 w-8 text-orange-500" />
              <h2 className="ml-3 text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Trending on Medium
              </h2>
            </div>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
              View all trending articles →
            </a>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {trendingArticles.map((article) => (
              <article onClick={()=>{navigate(`/blog/${article.id}`)}}
                key={article.id} 
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="overflow-hidden">
                  <img
                    src={article.imageId}
                    className="w-96 h-60 object-cover text-xl transform p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 ml-4 ">
                  <div className="flex items-center mb-3">
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 mr-4">{article.author}</p>
                      <p className="text-sm text-gray-500">{article.readTime}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 mb-4 flex gap-4 justify-center items-center text-sm text-gray-500">
                    <span>Read full story</span> <span> <MoveRight/></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


         <section className="py-6 mb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Medium?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">World-class authors</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Connect with millions of readers and thought leaders. Share your stories, ideas, and expertise with a global audience.
              </p>
              <div className="mt-6 text-center">
                <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center">
                  Meet our authors
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Premium content</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Access exclusive stories, in-depth analysis, and expert insights. Quality content curated just for you.
              </p>
              <div className="mt-6 text-center">
                <a href="#" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                  Explore premium
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Read anywhere</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Enjoy Medium on all your devices. Save stories for later and keep your reading list synced everywhere.
              </p>
              <div className="mt-6 text-center">
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                  Get the app
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="ml-2 font-bold">Medium</span>
              </div>
              <p className="text-gray-400 text-sm">
                Every idea needs a Medium.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Medium</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Write</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Write on Medium</a></li>
                <li><a href="#" className="hover:text-white">Writers Program</a></li>
                <li><a href="#" className="hover:text-white">Writing Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Follow us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>


      </div>
            {/* <div style={{width:'1000px'}} className="text-7xl font-semibold text-center">
                Discover the Best Content on the Web
            </div>
            <div style={{width:'900px'}} className="mt-6 text-2xl text-center w-3/6">
                Our blog feature the latest news, insights, and stories from the industry experts. Join our community and stay up-to-date with the latest trends.
            </div>
            <div className="flex gap-6 justify-center items-center mt-10">
                <button onClick={() => navigate('signin')} type="button" className="text-gray-900 hover:text-black border hover:bg-gray-100  focus:outline-none  font-medium rounded-lg text-xl px-8 py-2 text-center mb-2">
                    Sign In
                </button>
                <button onClick={() => navigate('signup')} type="button" className="text-white bg-black border-slate-600 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-xl px-8 py-2 text-center  mb-2">
                    Sign Up
                </button>
            </div> */}
        </div>
    )
}
