import React from 'react'
import Hero  from '@/components/Hero' 
import Footer from '@/components/user/FooterUser' 
import Teams from '@/components/Teams'
import Header from '@/components/Header'

export default function MyTeams() {
  return (
    <>
    <Header/>
    <div className="container mx-auto">
      <Hero pageName="Our Team" />
      <Teams />
    </div>
      <Footer />
    </>
  )
}
