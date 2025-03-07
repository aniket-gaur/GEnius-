import ScrollAnimation from "@/components/about";
import Footer from "@/components/footer";
import DemoHeroGeometric from "@/components/hero";
import Slider from "@/components/slider";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-300/[0.1] via-white to-rose-300/[0.1]">
            {/* Hero Section */}
            <DemoHeroGeometric />

            {/* Scroll Animation Section */}
            <div className="bg-black">
                <ScrollAnimation />
            </div>

            {/* Services Section */}
            <section className="text-center py-10 px-0 bg-black">
                <h1 className=" text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80sm:text-5xl font-semibold">Our Services</h1>
                <div className=" bg-black mt-6">
                    <Slider />
                </div>
            </section>
            <Footer />
        </div>
    );
}
