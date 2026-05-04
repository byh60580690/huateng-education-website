import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import About from './pages/About';
import Business from './pages/Business';
import Culture from './pages/Culture';
import Cooperation from './pages/Cooperation';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/business" element={<Business />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/cooperation" element={<Cooperation />} />
          </Routes>
        </main>
        <Footer />
        <AIAssistant />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
