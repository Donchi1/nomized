import React from 'react'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import dynamic from 'next/dynamic'
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {ssr: false})

function Testimonial() {
  return (
    <div className="container mx-auto text-center">
      <OwlCarousel
    
        responsive={{
          460: {
            items: 1,
          },
          760: {
            items: 1,
          },
          1000: {
            items: 3,
          },
        }}
        loop
        dots
        autoplay
        className="owl-theme"
        margin={10}
        nav={false}
      >
        <div className="our-team item">
          <div className="flex justify-center items-center  ">
            <img
              src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/board/2.jpg"
              className="img-fluid w-auto h-auto"
              alt="board-mage"
            />
          </div>
          <h3>Ella Kings</h3>

          <span>
            {' '}
            I was able to withdraw my fund within 5 days of their trading. Am so
            happy to be in this platform. Thanks to their account manager and
            team members.
          </span>
        </div>
        <div className="our-team item">
          <div className="flex justify-center items-center">
            <img
              src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/board/1.jpg"
              className="img-fluid w-auto h-auto"
              alt="board-mage"
            />
          </div>
          <h3>Jude Otuh</h3>

          <span>
            {' '}
            Am so glad that i joined this wonderful life changing platform.They
            have truely changed my life with the little investment of $200
            everything changed.
          </span>
        </div>

        <div className="our-team item">
          <div className="flex justify-center items-center">
            <img
              src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/board/3.jpg"
              className="img-fluid w-auto h-auto"
              alt="board-mage"
            />
          </div>
          <h3>Elvis James</h3>

          <span>
            {' '}
            I was insulted by my boss, who sacked me from work today am rich.
            All thanks to Crytonomize management who has made this a success.
          </span>
        </div>
      </OwlCarousel>
    </div>
  )
}

export default Testimonial
