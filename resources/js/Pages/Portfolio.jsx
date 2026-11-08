import { Head } from '@inertiajs/react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import About from '../Components/Portfolio/About';
import ContactSection from '../Components/Portfolio/ContactSection';
import EducationSection from '../Components/Portfolio/EducationSection';
import Hero from '../Components/Portfolio/Hero';
import ProjectsSection from '../Components/Portfolio/ProjectsSection';
import SkillsSection from '../Components/Portfolio/SkillsSection';

/** Public page at "/". Receives `projects` (from the database) from PortfolioController. */
export default function Portfolio({ projects }) {
    return (
        <>
            <Head title="Rafael U. Bagalay | Layout Artist & Aspiring Pentester" />
            <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-acc focus:p-2 focus:text-bg">Skip to content</a>
            <Navbar />
            <main id="main">
                <Hero />
                <About />
                <SkillsSection />
                <ProjectsSection projects={projects} />
                <EducationSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
