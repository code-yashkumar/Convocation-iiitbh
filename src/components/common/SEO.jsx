import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://convocation.iiitbh.ac.in';
const DEFAULT_IMAGE = 'https://convocation.iiitbh.ac.in/assets/convocation-hero-bg.png';
const SITE_NAME = 'IIIT Bhagalpur 3rd Convocation 2026';

/**
 * Production-ready Dynamic SEO Component
 * Manages document title, meta description, canonical link, Open Graph, Twitter Card, and Schema.org JSON-LD
 */
export function SEO({
  title = '3rd Convocation 2026 | IIIT Bhagalpur Official Portal',
  description = 'Official Convocation Portal of Indian Institute of Information Technology Bhagalpur (IIIT Bhagalpur). 3rd Convocation ceremony on 26 September 2026.',
  canonicalUrl,
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
  robots = 'index, follow'
}) {
  const location = useLocation();
  const path = location.pathname === '/' ? '' : location.pathname;
  const currentUrl = canonicalUrl || `${SITE_URL}${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  useEffect(() => {
    try {
      // 1. Update Document Title
      if (title) {
        document.title = title;
      }

      // Helper to update or create meta tags
      const setMeta = (nameAttr, nameValue, content) => {
        if (!content) return;
        let el = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(nameAttr, nameValue);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      // 2. Standard Meta Tags
      setMeta('name', 'description', description);
      setMeta('name', 'robots', robots);
      setMeta('name', 'googlebot', robots);

      // 3. Open Graph Metadata
      setMeta('property', 'og:site_name', SITE_NAME);
      setMeta('property', 'og:title', title);
      setMeta('property', 'og:description', description);
      setMeta('property', 'og:url', currentUrl);
      setMeta('property', 'og:type', type);
      setMeta('property', 'og:image', fullImageUrl);
      setMeta('property', 'og:image:alt', title);
      setMeta('property', 'og:locale', 'en_IN');

      // 4. Twitter Card Metadata
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', title);
      setMeta('name', 'twitter:description', description);
      setMeta('name', 'twitter:image', fullImageUrl);
      setMeta('name', 'twitter:image:alt', title);

      // 5. Canonical Link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', currentUrl);

      // 6. JSON-LD Structured Data
      let schemaScript = document.getElementById('schema-jsonld-dynamic');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'schema-jsonld-dynamic';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }

      if (schema) {
        schemaScript.textContent = JSON.stringify(schema);
      } else {
        schemaScript.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': SITE_NAME,
          'url': SITE_URL,
          'description': description
        });
      }
    } catch (err) {
      console.warn('[SEO Head Warning]:', err);
    }

    return () => {
      try {
        const dynamicScript = document.getElementById('schema-jsonld-dynamic');
        if (dynamicScript) dynamicScript.textContent = '';
      } catch (err) {
        // Ignore cleanup error
      }
    };
  }, [title, description, currentUrl, fullImageUrl, type, JSON.stringify(schema), robots]);

  return null;
}

export default SEO;