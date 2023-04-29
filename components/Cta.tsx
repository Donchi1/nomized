import Link from 'next/link'
import React from 'react'

function Cta() {
  return (
    <section className="ctas-section bg--gradient position-relative overflow-hidden">
    <div className="particle"></div>
    <div className="particle2"></div>
    <div className="particle3"></div>
    <div className="particle4"></div>
    <div className="container">
        <div className="section-header text-center text-white mb-0">
            <h6 className="section-header__subtitle">Are You Convenced?</h6>
            <h2 className="section-header__title">Let&#039;s Get started with us.</h2>
            <Link href="/login" className="cmn--btn">
                Get Started                    <span className="round-effect"><i className="fas fa-long-arrow-alt-right"></i></span>
            </Link>
        </div>
    </div>
</section>
  )
}

export default Cta