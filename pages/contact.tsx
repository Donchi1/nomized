import React from 'react'
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  
  return (
    <>
    <Header />
    <div className="h-screen footer-bg homepage-3">
      <Hero pageName="Contact" />
      <section className="footer-bg homepage-3">
        <div className="px-3 md:px-8 h-auto -mt-28 mb-16">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 px-4 h-[600px]">
              <div className="map mt-8">
                <iframe
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=820 king road Kensington london&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  style={{ border: 0 }}
                  aria-hidden="false"
                  tabIndex={0}
                  title="Cryptonomize Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
       <Footer />
      </section>
    </div>
    </>
  )
}
