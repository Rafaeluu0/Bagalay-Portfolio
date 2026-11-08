import Card from '../Card';
import SectionTitle from '../SectionTitle';
import ContactForm from './ContactForm';
import ScopeEstimator from './ScopeEstimator';

export default function ContactSection() {
    return (
        <section id="contact">
            <div className="mx-auto max-w-6xl px-5">
                <SectionTitle tag="Contact" title="Let's Connect & Collaborate">
                    Available for cybersecurity internships, freelance graphic and editorial design commissions, vulnerability lab collaborations, or technical IT projects.
                </SectionTitle>
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                        <ScopeEstimator />
                        <Card as="div" className="font-mono text-xs text-mute">
                            <p className="uppercase tracking-widest">Direct contact coordinates</p>
                            <ul className="mt-3 space-y-2">
                                <li>✉ <a className="text-ink underline-offset-4 hover:underline" href="mailto:rafaelu.bagalay@gmail.com">rafaelu.bagalay@gmail.com</a></li>
                                <li>◆ BS Information Technology · Class of 2024/2025</li>
                                <li>◆ TryHackMe Rank: Top 5% · Pentesting Path</li>
                            </ul>
                        </Card>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
