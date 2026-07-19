import React from 'react';
import HeroCard from './HeroCard';
import InfoSection from './InfoSection';
import TechSection from './TechSection';
import ProjectInfoSection from './ProjectInfoSection';
import ConnectSection from './ConnectSection';
import FooterSection from './FooterSection';

export default function Developer() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">About the Developer</h1>
        <p className="text-sm font-semibold text-slate-500">Meet the developer behind this Expense Tracker application.</p>
      </div>

      {/* Section 1: Hero Card */}
      <HeroCard />

      {/* Section 2 & 3: Info & About Me */}
      <InfoSection />

      {/* Section 4: Technologies Used */}
      <TechSection />

      {/* Section 5: Project Information */}
      <ProjectInfoSection />

      {/* Section 6: Connect with Me */}
      <ConnectSection />

      {/* Section 7: Footer */}
      <FooterSection />
    </div>
  );
}
