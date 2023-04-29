import React,{useEffect, useState} from 'react'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import dynamic from 'next/dynamic'
import { DocumentData } from 'firebase/firestore'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'
//const OwlCarousel = dynamic(() => import('react-owl-carousel'), {ssr: false})

function UsersCarousel({users}: {users: DocumentData[]}) {

const [sortedUsers, setSortedUsers] = useState<DocumentData[]>([])

    useEffect(()=> {
        const hs = () => {
            const sorted = users?.splice(0, 10).sort((a, b) => b.date - a.date)
              setSortedUsers(sorted)
        }
      hs()
    }, [])

    console.log(sortedUsers)

  return (

          
    <Slider
    autoplay
    slidesToScroll={1}
    slidesToShow={4}
    infinite
    arrows={false}
    initialSlide={0}
    speed={2500}
    pauseOnHover={false}
    pauseOnFocus
    pauseOnDotsHover={false}
    responsive={[
        {
          breakpoint: 768,
          settings: {
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ]}
    easing="linear"
   className="w-full"
  >
               {users?.map(each =>(

             <div key={each.id} className='text-center mb-12 mb-lg-0'>
          
                <div className=" w-64 w-lg-100 mx-auto mb-2">
                  <img
                    
                    src={each.photo}
                    className="w-100 h-32 mx-auto rounded-xl"
                    alt="board-mage"
                    />
                </div>
                 <h3 >{each.firstname} {each.lastname}</h3> 
      
                <span>
                { each.country}
                </span>
              </div>
               ))}
           
             
                
            
                
                   
             
            </Slider>
        
       
      
  )
}

export default UsersCarousel