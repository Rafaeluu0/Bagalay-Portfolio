import Card from '../Card';

export default function About() {
    return (
        <section id="about">
            <div className="mx-auto max-w-6xl px-5">
                <p className="tag">About me</p>
                <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
                    <div className="space-y-4">
                        <Card hover>
                            <h3 className="font-head font-bold">Creative &amp; Visual</h3>
                            <p className="mt-1 text-sm text-mute">Photoshop, InDesign, Illustrator, Lightroom, brand collateral, and editorial design.</p>
                        </Card>
                        <Card hover>
                            <h3 className="font-head font-bold">Offensive Security</h3>
                            <p className="mt-1 text-sm text-mute">Penetration testing methodology, vulnerability assessment, OWASP Top 10, CTFs.</p>
                        </Card>
                    </div>
                    <div className="space-y-4 text-mute">
                        <h2 className="font-head text-2xl font-bold text-ink">Synthesizing visual storytelling with offensive digital resilience.</h2>
                        <p>I am currently pursuing a Bachelor of Science in Information Technology (BSIT). My creative foundation was built on digital media editing, high-fidelity publication layouts, brand collateral, and image enhancement across <span className="text-ink">Adobe Photoshop, Illustrator, InDesign, and Lightroom</span>.</p>
                        <p>Simultaneously, my technical passion lies in <span className="text-acc">offensive cybersecurity, ethical hacking, and penetration testing</span>. I actively train on TryHackMe, HackTheBox, and local virtual lab environments, dissecting network protocols and web application vulnerabilities.</p>
                        <p><strong className="font-medium text-ink">My goal:</strong> combine the meticulous attention to detail of a digital designer with the rigorous analytical thinking of a security professional, producing actionable vulnerability assessments with boardroom-ready executive reports and visual artifacts.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
