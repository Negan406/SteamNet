import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const movies = [
    { id: 1, title: 'Dune: Part Two', desc: 'The blockbuster sci-fi epic concludes.', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop' },
    { id: 2, title: 'Breaking Bad', desc: 'Critically acclaimed drama series.', img: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=600&auto=format&fit=crop' },
    { id: 3, title: 'Inception', desc: 'Mind-bending thriller by Nolan.', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop' },
    { id: 4, title: 'Stranger Things', desc: 'Sci-fi horror series full of nostalgia.', img: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=600&auto=format&fit=crop' },
    { id: 5, title: 'The Batman', desc: 'Dark and gritty detective story.', img: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop' },
    { id: 6, title: 'John Wick: Chapter 4', desc: 'The legendary hitman takes on the High Table.', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop' },
    { id: 7, title: 'The Last of Us', desc: 'A hardened survivor and a young girl navigate a post-apocalyptic world.', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop' },
    { id: 8, title: 'Oppenheimer', desc: 'The story of J. Robert Oppenheimer and the creation of the atomic bomb.', img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop' },
];

export default function MoviesSeriesSlider() {
    const sliderRef = useRef(null);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth } = sliderRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trending Movies & Series</h2>
                        <p className="text-gray-400">Over 50,000 VODs updated daily.</p>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="hidden md:flex gap-3 mb-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300 shadow-lg"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300 shadow-lg"
                            aria-label="Scroll Right"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <motion.div
                        ref={sliderRef}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex overflow-x-auto gap-6 pb-8 pt-4 scrollbar-hide snap-x scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {movies.map((movie, index) => (
                            <motion.div
                                key={movie.id}
                                whileHover={{ scale: 1.03 }}
                                className="relative shrink-0 w-64 h-96 rounded-2xl overflow-hidden cursor-pointer group shadow-lg snap-start border border-gray-800"
                            >
                                <img src={movie.img} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-900/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <PlayCircle className="w-12 h-12 text-indigo-500 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl rounded-full bg-white/10" />
                                    <h3 className="text-xl font-bold text-white mb-1">{movie.title}</h3>
                                    <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{movie.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
