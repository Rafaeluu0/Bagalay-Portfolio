export default function Hero() {
    return (
        <section id="home" className="py-16 md:py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.5fr_1fr]">
                <div>
                    <h1 className="font-head text-4xl font-bold leading-tight sm:text-5xl">
                        Bridging <span className="text-acc">visual precision</span> and offensive cybersecurity.
                    </h1>
                    <p className="mt-6 max-w-xl text-mute">
                        Information Technology undergraduate specializing in visual design (Adobe Creative Suite) with a focused roadmap toward offensive cybersecurity, vulnerability assessment, and penetration testing.
                    </p>
                    <a href="#projects" className="mt-8 inline-block rounded-full bg-acc px-6 py-3 text-sm font-medium text-bg">
                        Explore Design &amp; Sec Works →
                    </a>
                </div>
                <div className="group relative mx-auto w-full max-w-xs">
                    <span className="absolute -left-2 -top-2 size-6 border-l-2 border-t-2 border-acc" aria-hidden="true" />
                    <span className="absolute -bottom-2 -right-2 size-6 border-b-2 border-r-2 border-acc" aria-hidden="true" />
                    <div className="absolute inset-0 z-0 rounded-2xl bg-acc/40 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                    <img
                        src="/images/avatar.png"
                        alt="Portrait of Rafael Bagalay wearing a black blazer"
                        className="relative z-10 aspect-[3/4] w-full rounded-2xl object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                </div>
            </div>
        </section>
    );
}
