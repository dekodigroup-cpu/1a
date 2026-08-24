import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Probate } from './components/Probate'
import { Showcase } from './components/Showcase'
import { Plans } from './components/Plans'
import { Process } from './components/Process'
import { PALETTE } from './lib/theme'
import { FogTransition } from './components/FogTransition'
import { Firm } from './components/Firm'
import { QAndA } from './components/QAndA'
import { QuoteBanner } from './components/QuoteBanner'
import { Booking } from './components/Booking'
import { SiteFooter, FixedBar } from './components/Footer'

export default function App() {
  return (
    <>
      <a
        href="#book"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[2px] focus:bg-brass focus:px-4 focus:py-2 focus:font-inter focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-onbrass"
      >
        Skip to booking
      </a>

      <Navbar />

      <main>
        <Hero />
        <Marquee />

        {/* problem */}
        <Probate />

        {/* belief */}
        <Plans />
        <Showcase />

        {/* method */}
        <div className="relative">
          <Process />
          {/* the mist dissolves the oxblood back down into ink */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[34vh]">
            <FogTransition color={PALETTE.ink} className="h-full" />
          </div>
        </div>

        <div className="relative">
          <Firm />
          {/* and back up into oxblood for the interview */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[30vh]">
            <FogTransition color={PALETTE.navy} className="h-full" />
          </div>
        </div>

        <QAndA />
        <QuoteBanner />

        {/* close */}
        <Booking />
      </main>

      <SiteFooter />
      <FixedBar />
    </>
  )
}
