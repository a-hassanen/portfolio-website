import React from 'react';
import Section from './Section';
import type { Badge } from '../types';

interface BadgesProps {
  badges: Badge[];
}

const BadgeCard: React.FC<{ badge: Badge; isFeatured?: boolean }> = ({ badge, isFeatured = false }) => (
  <a 
    href={badge.credentialUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`block bg-secondary p-4 rounded-lg shadow-lg hover:shadow-accent/30 transition-all duration-300 h-full ${isFeatured ? 'transform hover:-translate-y-1' : ''}`}
  >
    <div className={`flex items-center space-x-4 ${isFeatured ? 'flex-col sm:flex-row text-center sm:text-left' : ''}`}>
      <img 
        src={badge.imageUrl} 
        alt={badge.title} 
        className={`${isFeatured ? 'w-24 h-24 mb-4 sm:mb-0' : 'w-20 h-20'} object-contain flex-shrink-0`}
      />
      <div>
        <h4 className={`font-bold text-light ${isFeatured ? 'text-lg' : ''}`}>{badge.title}</h4>
        <p className="text-sm text-medium">Issuer: {badge.issuer}</p>
      </div>
    </div>
  </a>
);

const IframeBadge: React.FC<{ badge: Badge }> = ({ badge }) => (
  <div className="bg-secondary p-4 rounded-lg shadow-lg">
    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
      <div>
        <h4 className="font-bold text-light text-lg">{badge.title}</h4>
        <p className="text-sm text-medium">Issuer: {badge.issuer}</p>
      </div>
      <a
        href={badge.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline flex-shrink-0 ml-4"
      >
        Open in new tab &rarr;
      </a>
    </div>
    <div className="aspect-video bg-primary rounded-md overflow-hidden relative">
      <iframe
        src={badge.credentialUrl}
        title={`Credential: ${badge.title}`}
        className="w-full h-full border-0 absolute top-0 left-0"
        loading="lazy"
      >
        Your browser does not support iframes. Please <a href={badge.credentialUrl} target="_blank" rel="noopener noreferrer">click here to view the credential</a>.
      </iframe>
    </div>
  </div>
);

const Badges: React.FC<BadgesProps> = ({ badges }) => {
  const cardBadges = badges.filter(b => b.display !== 'iframe');
  const iframeBadges = badges.filter(b => b.display === 'iframe');

  const featuredBadges = cardBadges.filter(b => b.featured);
  const otherBadges = cardBadges.filter(b => !b.featured);

  return (
    <Section id="badges" title="Certifications & Badges">
      <div className="max-w-6xl mx-auto space-y-16">
        {(featuredBadges.length > 0 || otherBadges.length > 0) && (
          <div>
            {featuredBadges.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-accent mb-6 text-center">Showcase</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredBadges.map((badge, index) => <BadgeCard key={index} badge={badge} isFeatured />)}
                </div>
              </div>
            )}
            
            {otherBadges.length > 0 && (
               <>
                {featuredBadges.length > 0 && <hr className="border-secondary my-12" />}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherBadges.map((badge, index) => <BadgeCard key={index} badge={badge} />)}
                </div>
               </>
            )}
          </div>
        )}

        {iframeBadges.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-accent mb-6 text-center">Verifiable Credentials</h3>
            <div className="grid grid-cols-1 gap-12">
              {iframeBadges.map((badge, index) => <IframeBadge key={index} badge={badge} />)}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Badges;