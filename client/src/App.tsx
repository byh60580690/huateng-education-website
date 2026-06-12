import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

// 滚动到顶部组件
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // 如果有 hash 锚点，让浏览器自动滚动到锚点位置
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    // 否则滚动到顶部
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ScrollToTop />
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
