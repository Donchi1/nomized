import React from 'react'

import Link from 'next/link'

function Hero({ pageName } : {pageName: string}) {
  return (
    <section className="w-full py-52  footer-bg homepage-3 bg-gradient-to-b from-blue-gray-400 to-blue-gray-600 "  >
      <div className="container mx-auto text-center text-white my-24">
        <div className="mb-10">
          <h2 className="font-bold uppercase text-5xl ">
            {pageName === 'About-Us' ? pageName.slice(0, 6) : pageName}
            <span className="text-[#5d41ec]">
              {pageName === 'About-Us' && pageName.slice(6, 9)}
            </span>
          </h2>
        </div>
        <div>
          <Link href="/">Home</Link>
          <span className="mx-4">/</span> <span>{pageName}</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
