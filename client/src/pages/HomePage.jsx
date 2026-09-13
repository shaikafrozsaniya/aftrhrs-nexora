import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Experience from '../components/Experience.jsx';
import DJLineup from '../components/DJLineup.jsx';
import SpidermanEditsSection from '../components/SpidermanEditsSection.jsx';
import VisualsSection from '../components/VisualsSection.jsx';
import FoodSection from '../components/FoodSection.jsx';
import SocialUnoSection from '../components/SocialUnoSection.jsx';
import PassSelection from '../components/PassSelection.jsx';
import SafetySection from '../components/SafetySection.jsx';
import VenueSection from '../components/VenueSection.jsx';
import FAQ from '../components/FAQ.jsx';
import CustomerSupport from '../components/CustomerSupport.jsx';
import Footer from '../components/Footer.jsx';
import CheckoutModal from '../components/CheckoutModal.jsx';
import DigitalTicketModal from '../components/DigitalTicketModal.jsx';
import BackgroundParallax from '../components/BackgroundParallax.jsx';
import FloatingInstagram from '../components/FloatingInstagram.jsx';

export default function HomePage({ onNavigateAdmin, onNavigateScanner, onSelectTicket }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState('single');
  const [checkoutQty, setCheckoutQty] = useState(1);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [confirmedTicketData, setConfirmedTicketData] = useState(null);

  const handleOpenPasses = () => {
    const passesElem = document.getElementById('passes');
    if (passesElem) {
      passesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplore = () => {
    const expElem = document.getElementById('experience');
    if (expElem) {
      expElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPass = (tierId, qty = 1) => {
    setCheckoutTier(tierId);
    setCheckoutQty(qty);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (ticketData) => {
    setConfirmedTicketData(ticketData);
    setIsTicketModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 flex flex-col relative overflow-x-hidden">
      {/* Background AFTRHRS Dynamic Scroll Moments Layer */}
      <BackgroundParallax />

      <Navbar
        onOpenPasses={handleOpenPasses}
        onNavigateAdmin={onNavigateAdmin}
        onNavigateScanner={onNavigateScanner}
      />

      <main className="flex-1 relative z-10">
        <Hero
          onOpenPasses={handleOpenPasses}
          onExplore={handleExplore}
        />

        <Experience />

        <DJLineup />

        <SpidermanEditsSection />

        <VisualsSection />

        <FoodSection />

        <SocialUnoSection />

        <PassSelection onSelectPass={handleSelectPass} />

        <SafetySection />

        <VenueSection />

        <FAQ />

        <CustomerSupport />
      </main>

      <Footer
        onOpenPasses={handleOpenPasses}
        onNavigateAdmin={onNavigateAdmin}
        onNavigateScanner={onNavigateScanner}
      />

      {/* Persistent Floating Instagram Button at Bottom-Right */}
      <FloatingInstagram />

      {/* Checkout Modal with Razorpay Test Mode */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialTier={checkoutTier}
        initialQuantity={checkoutQty}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Digital Ticket Modal with QR */}
      <DigitalTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        ticketData={confirmedTicketData}
      />
    </div>
  );
}
