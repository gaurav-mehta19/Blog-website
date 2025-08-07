
import { Appbar } from "../components/Appbar"
import { useNavigate, Link } from "react-router-dom";
import { BookOpen , Users, Star, Pen, Siren as Fire } from 'lucide-react';


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
          id: "c7c8cd52-7a7c-4ada-b638-81510f03f2ee",
          author: "NEFTURE SECURITY I Blockchain Security",
          title: "Sustainable Living in 2025",
          readTime: "7 min read",
          imageId: "https://i.ibb.co/LXxhKQD9/DALL-E-2025-02-07-17-14-17-A-futuristic-eco-friendly-city-in-2025-featuring-solar-panels-wind-turbin.webp",
          excerpt: "As we enter 2025, sustainable living has become more than just a trend—it’s a necessity. With climate change accelerating and natural resources depleting, individuals and businesses are making conscious efforts to adopt greener lifestyles. Sustainability is no longer about making minor adjustments; it’s about revolutionizing the way we live, work, and consume. Here’s an in-depth look at how sustainable living is shaping the future in 2025."
        },
        {
            id: "f2cd0256-47b7-4fce-8efa-954f961a6f5b",
            author: "unni",
            title: "JWT vs PASETO: New Era of Token-Based Authentication",
            readTime: "11 min read",
            imageId: "https://i.ibb.co/Cm7rQYh/0-g-BCj-HX7-Yz-V7a8-Ob-Y.webp",
            excerpt: "This article delves into a comprehensive comparison of Paseto and JWT, dissecting their core functionalities, security features, and potential drawbacks"
        },
        {
            id: "c57f7624-ac50-4510-b963-11a0d0796d6a",
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

            {/* Hero Section - Horizontal Layout */}
            <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary pt-32 pb-32 mb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-text-primary mb-6 leading-tight">
                                Where stories find their voice.
                            </h1>
                            <p className="text-xl sm:text-2xl font-inter text-text-secondary mb-8 leading-relaxed max-w-2xl">
                                Join a vibrant community of writers and readers sharing ideas, insights, and stories that matter. Your thoughts deserve a beautiful home.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                                <button 
                                    onClick={() => navigate('/signin')} 
                                    className="bg-theme-primary hover:bg-theme-primary-hover text-white font-inter font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 ease-in-out shadow-theme-lg hover:shadow-theme-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2"
                                >
                                    Start Writing
                                </button>
                                <button 
                                    onClick={() => navigate('/blogs')} 
                                    className="bg-transparent border-2 border-theme-secondary hover:bg-theme-secondary-light text-theme-secondary hover:text-theme-secondary-hover font-inter font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 ease-in-out"
                                >
                                    Explore Stories
                                </button>
                            </div>
                        </div>
                        
                        {/* Right Decorative Icon */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative animate-pulse">
                                <Pen className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 text-text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Articles Section - Vertical Stack */}
            <section className="py-16 bg-gradient-to-b from-bg-secondary to-bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <Fire className="h-8 w-8 text-theme-primary mr-3" />
                            <h2 className="text-4xl font-playfair font-bold text-text-primary">
                                Trending Stories
                            </h2>
                        </div>
                        <Link to="/blogs" className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200">
                            View all trending articles →
                        </Link>
                    </div>
                    
                    {/* 3-Column Grid of Articles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trendingArticles.slice(0, 6).map((article) => (
                            <article 
                                key={article.id}
                                onClick={() => navigate(`/blog/${article.id}`)}
                                className="group relative bg-bg-primary rounded-2xl shadow-theme-sm hover:shadow-theme-xl transition-all duration-300 overflow-hidden border border-border-primary cursor-pointer transform hover:-translate-y-2"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={article.imageId}
                                        alt={article.title}
                                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-theme-secondary to-theme-accent rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">
                                                {article.author[0].toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="ml-2">
                                            <p className="font-medium text-text-primary text-sm">{article.author}</p>
                                            <p className="text-xs text-text-secondary">{article.readTime}</p>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-playfair font-bold text-text-primary mb-2 group-hover:text-theme-primary transition-colors duration-200 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    
                                    <p className="text-text-secondary font-inter text-sm leading-relaxed mb-3 line-clamp-3">
                                        {article.excerpt.slice(0, 120)}...
                                    </p>
                                    
                                    <div className="flex items-center text-xs text-theme-primary font-medium">
                                        <span>Read full story</span>
                                        <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>


            {/* Why Medium Section */}
            <section className="py-20 px-4 bg-bg-primary">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-16">
                        <h2 className="text-4xl font-playfair font-bold text-text-primary mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl font-inter text-text-secondary">
                            Join a warm community of thoughtful readers and creative writers
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-secondary/20 rounded-full mb-6">
                                <Users className="h-8 w-8 text-theme-secondary" />
                            </div>
                            <h3 className="text-2xl font-playfair font-bold text-text-primary mb-4">
                                World-class authors
                            </h3>
                            <p className="text-text-secondary font-inter text-base leading-relaxed mb-6">
                                Connect with millions of readers and thought leaders. Share your stories, ideas, and expertise with a global audience.
                            </p>
                            <Link to="/blogs" className="text-theme-secondary hover:underline font-medium">
                                Meet our authors →
                            </Link>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-success/20 rounded-full mb-6">
                                <Star className="h-8 w-8 text-theme-success" />
                            </div>
                            <h3 className="text-2xl font-playfair font-bold text-text-primary mb-4">
                                Premium content
                            </h3>
                            <p className="text-text-secondary font-inter text-base leading-relaxed mb-6">
                                Access exclusive stories, in-depth analysis, and expert insights. Quality content curated just for you.
                            </p>
                            <Link to="/blogs" className="text-theme-success hover:underline font-medium">
                                Explore premium →
                            </Link>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-primary/20 rounded-full mb-6">
                                <BookOpen className="h-8 w-8 text-theme-primary" />
                            </div>
                            <h3 className="text-2xl font-playfair font-bold text-text-primary mb-4">
                                Read anywhere
                            </h3>
                            <p className="text-text-secondary font-inter text-base leading-relaxed mb-6">
                                Enjoy Medium on all your devices. Save stories for later and keep your reading list synced everywhere.
                            </p>
                            <Link to="/blogs" className="text-theme-primary hover:underline font-medium">
                                Go to application →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="py-16 px-4 bg-bg-tertiary border-t border-border-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="p-2 rounded-lg bg-theme-primary">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <span className="ml-3 font-bold text-xl text-text-primary">Medium</span>
                        </div>
                        <p className="text-text-secondary mb-6">
                            Every idea needs a Medium.
                        </p>
                    </div>
                    
                    <div className="mb-8">
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/blogs" className="text-text-secondary hover:text-theme-primary transition-colors">
                                About
                            </Link>
                            <Link to="/publish" className="text-text-secondary hover:text-theme-primary transition-colors">
                                Write
                            </Link>
                            <Link to="/blogs" className="text-text-secondary hover:text-theme-primary transition-colors">
                                Help
                            </Link>
                            <Link to="/blogs" className="text-text-secondary hover:text-theme-primary transition-colors">
                                Terms
                            </Link>
                            <Link to="/blogs" className="text-text-secondary hover:text-theme-primary transition-colors">
                                Privacy
                            </Link>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-border-primary">
                        <p className="text-text-muted">
                            © 2025 Medium. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
