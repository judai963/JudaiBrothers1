import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RatesPage } from './pages/RatesPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { EstimatorPage } from './pages/EstimatorPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { CommercialPage } from './pages/CommercialPage';
import { AboutPage } from './pages/AboutPage';
import { HousecallProBookingModal } from './components/HousecallProBookingModal';
import { EmergencyDiagnosticWizard } from './components/EmergencyDiagnosticWizard';
import { InstantEstimator } from './components/InstantEstimator';
import { ProgressAuditView } from './components/ProgressAuditView';
import { VirtualPlumberModal } from './components/VirtualPlumberModal';
import { VirtualPlumberLauncher } from './components/VirtualPlumberLauncher';
import { Phone, Calendar, AlertTriangle, Sparkles } from 'lucide-react';
import { ActivePage } from './types';

export function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [highLegibilityMode, setHighLegibilityMode] = useState<boolean>(false);
  
  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingInitialServiceId, setBookingInitialServiceId] = useState<string | undefined>(undefined);
  const [bookingCustomQuote, setBookingCustomQuote] = useState<{ title: string; price: number } | undefined>(undefined);
  
  const [isEstimatorModalOpen, setIsEstimatorModalOpen] = useState<boolean>(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isProgressAuditOpen, setIsProgressAuditOpen] = useState<boolean>(false);
  const [isVirtualPlumberOpen, setIsVirtualPlumberOpen] = useState<boolean>(false);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'progress') {
        setIsProgressAuditOpen(true);
      } else if (
        hash === 'rates' ||
        hash === 'emergency' ||
        hash === 'estimator' ||
        hash === 'service-areas' ||
        hash === 'commercial' ||
        hash === 'about' ||
        hash === 'home'
      ) {
        setActivePage(hash as ActivePage);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigatePage = (page: ActivePage) => {
    setActivePage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string, customQuote?: { title: string; price: number }) => {
    setBookingInitialServiceId(serviceId);
    setBookingCustomQuote(customQuote);
    setIsBookingOpen(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#08080A] text-slate-200 transition-colors ${
        highLegibilityMode ? 'text-lg font-medium select-text' : 'text-base'
      }`}
    >
      {/* Top Header with Multi-Page Navigation */}
      <Header
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
        onOpenBooking={handleOpenBooking}
        onOpenEstimator={() => handleNavigatePage('estimator')}
        onOpenEmergency={() => handleNavigatePage('emergency')}
        onOpenProgressAudit={() => setIsProgressAuditOpen(true)}
        onOpenVirtualPlumber={() => setIsVirtualPlumberOpen(true)}
        highLegibilityMode={highLegibilityMode}
        onToggleLegibility={() => setHighLegibilityMode(!highLegibilityMode)}
      />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigatePage={handleNavigatePage}
            onOpenBooking={handleOpenBooking}
            onOpenEstimator={() => handleNavigatePage('estimator')}
            onOpenEmergency={() => handleNavigatePage('emergency')}
            onOpenVirtualPlumber={() => setIsVirtualPlumberOpen(true)}
            highLegibilityMode={highLegibilityMode}
          />
        )}

        {activePage === 'rates' && (
          <RatesPage
            onOpenBooking={handleOpenBooking}
            onNavigatePage={handleNavigatePage}
            onOpenVirtualPlumber={() => setIsVirtualPlumberOpen(true)}
            highLegibilityMode={highLegibilityMode}
          />
        )}

        {activePage === 'emergency' && (
          <EmergencyPage
            onOpenBooking={handleOpenBooking}
            onNavigatePage={handleNavigatePage}
            onOpenVirtualPlumber={() => setIsVirtualPlumberOpen(true)}
            highLegibilityMode={highLegibilityMode}
          />
        )}

        {activePage === 'estimator' && (
          <EstimatorPage
            onOpenBooking={handleOpenBooking}
            onNavigatePage={handleNavigatePage}
            highLegibilityMode={highLegibilityMode}
          />
        )}

        {activePage === 'service-areas' && (
          <ServiceAreasPage
            onOpenBooking={handleOpenBooking}
            onNavigatePage={handleNavigatePage}
            highLegibilityMode={highLegibilityMode}
          />
        )}

        {activePage === 'commercial' && (
          <CommercialPage
            onOpenBooking={handleOpenBooking}
            onNavigatePage={handleNavigatePage}
            highLegibilityMode={highLegibilityMode}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onOpenBooking={handleOpenBooking}
            onNavigatePage={handleNavigatePage}
            highLegibilityMode={highLegibilityMode}
          />
        )}
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onNavigatePage={handleNavigatePage}
        onOpenBooking={() => handleOpenBooking()}
        onOpenEstimator={() => handleNavigatePage('estimator')}
        onOpenEmergency={() => handleNavigatePage('emergency')}
        onOpenProgressAudit={() => setIsProgressAuditOpen(true)}
        onOpenVirtualPlumber={() => setIsVirtualPlumberOpen(true)}
      />

      {/* Global Floating AI Launcher */}
      <VirtualPlumberLauncher
        onClick={() => setIsVirtualPlumberOpen(true)}
        isOpen={isVirtualPlumberOpen}
      />

      {/* Global Modals & Dialogs */}
      <VirtualPlumberModal
        isOpen={isVirtualPlumberOpen}
        onClose={() => setIsVirtualPlumberOpen(false)}
        onOpenBooking={handleOpenBooking}
        onOpenEmergency={() => {
          setIsVirtualPlumberOpen(false);
          handleNavigatePage('emergency');
        }}
        highLegibilityMode={highLegibilityMode}
      />

      <HousecallProBookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingCustomQuote(undefined);
        }}
        initialServiceId={bookingInitialServiceId}
        customQuote={bookingCustomQuote}
        highLegibilityMode={highLegibilityMode}
      />

      <EmergencyDiagnosticWizard
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onOpenBooking={handleOpenBooking}
        highLegibilityMode={highLegibilityMode}
      />

      {isEstimatorModalOpen && (
        <InstantEstimator
          isModal={true}
          onClose={() => setIsEstimatorModalOpen(false)}
          onOpenBooking={handleOpenBooking}
          highLegibilityMode={highLegibilityMode}
        />
      )}

      {isProgressAuditOpen && (
        <ProgressAuditView
          isModal={true}
          onClose={() => setIsProgressAuditOpen(false)}
        />
      )}

      {/* Floating Bottom Quick Action Bar on Mobile/Tablet */}
      <div className="fixed bottom-3 left-3 right-3 z-40 sm:hidden">
        <div className="bg-slate-950/95 backdrop-blur-md text-white p-2 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between gap-2">
          <a
            href="tel:4809383803"
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2.5 rounded-xl bg-slate-800 text-amber-400 font-bold text-xs"
          >
            <Phone className="w-4 h-4" />
            <span>(480) 938-3803</span>
          </a>
          <button
            onClick={() => handleNavigatePage('emergency')}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-md"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency</span>
          </button>
          <button
            onClick={() => handleOpenBooking()}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>Book $0 Fee</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
