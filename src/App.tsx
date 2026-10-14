import Hero from './components/Hero';
import QuoteSection from './components/QuoteSection';

export function App() {
  return (
    <div className="bg-[#0a0608] min-h-screen text-white w-full overflow-x-hidden selection:bg-white/20 selection:text-white">
      <Hero />
      <QuoteSection />
    </div>
  );
}

export default App;
