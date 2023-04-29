import React from 'react'
import Hero from '@/components/Hero' 
import Footer from '@/components/user/FooterUser' 
import  Link from "next/link"
import Header from '@/components/Header'

export default function Features() {
  return (
    <>
    <Header />
    <div>
      <Hero pageName="Features" />
      <section className="about_us section-padding">
        <div className="container">
          <div className="section-title text-center mb-12">
            <h1>The most trusted cryptocurrency platform</h1>
            <p>
              We are confident in whom we are. We give you all you need as we
              promise. No hidden information or fees.
            </p>
          </div>
          <div className="row">
            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.1s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.1s',
                animationName: 'none',
              }}
            >
              <div className="single_about">
                <img
                  src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/secure.png"
                  alt="mage"
                />

                <h3>Secure storage</h3>
                <p>
                  We provide you with a secure means of fund storage. Our
                  storage system is strong and reliable to secure our client
                  fund from scammers and other onlin fraudlant activities.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.2s',
                animationName: 'none',
              }}
            >
              <div className="single_about">
                <img
                  src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/insurance.png"
                  alt="mage"
                />

                <h3>Protected by insurance</h3>
                <p>
                  You are protected by our insurance. We our yealy crypto
                  insurance payment making sure all the transactions done our
                  our platform get a little or no charge.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.3s',
                animationName: 'none',
              }}
            >
              <div className="single_about">
                <img
                  src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/industry.png"
                  alt="mage"
                />

                <h3>Fund Growth</h3>
                <p>
                  We make sure your fund get increments prior to your choosen
                  investment plan or current investment statistic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="buy_sell" className="buy_sell_area section-padding">
        <div className="container">
          <div className="section-title text-center mb-4">
            <h1>Cryptocurrency and cryptonomize transactions meduims</h1>
            <p>
              There are so many platforms to buy and sell crypo.Cryptonomize
              provides this meduims for financial or crypto transactions. You
              can check our FAQ for more information.
            </p>
          </div>
          <div className="row">
            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.2s',
                animationName: 'none',
              }}
            >
              <div className="buy_sell_list">
                <img
                  src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/bank.png"
                  alt="mage"
                />
                <h4>Bank Transfers</h4>
                <p>
                  You can buy cryptocurrency through bank transfer as well as
                  cryptonomize investment depending on your country
                  requirements.
                </p>
              </div>
              <div className="buy_sell_list">
                <img
                  src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/wallet.png"
                  alt="mage"
                />
                <h4>Online Wallets</h4>
                <p>
                  You can buy crypto as well as Cryptonomize investment through
                  your online wallet.This is our recomended means of investment.
                </p>
              </div>
            </div>
            {/*- END COL */}
            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInDown"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.2s',
                animationName: 'none',
              }}
            >
              <div className="portfolio_list_img">
                <img
                  src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/about-one.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            {/*- END COL */}
            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.2s',
                animationName: 'none',
              }}
            >
              <div className="buy_sell_list">
                <img
                  src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/cash.png"
                  alt="mage"
                />
                <h4>Cash Payment</h4>
                <p>
                  You can buy cryptocurrency as well as Cryptonomize investment
                  by cash. This is very hard but the safest for purchase and
                  investment .
                </p>
              </div>
              <div className="buy_sell_list">
                <img
                  src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/debit.png"
                  alt="mage "
                />
                <h4>Debit/Credit Cards</h4>
                <p>
                  You can easy purchase cryptocurrency as well as our investment
                  with your debit card. This is also our recommended depending
                  your location.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="how_to_buy_area section-padding">
        <div className="container">
          <div className="section-title text-center">
            <h1>Get Started in a Few Minutes</h1>
            <p>
              All you need is to get started, all your need to make great wealth
              with your little fund are ready for your consumption.
            </p>
          </div>
          <div className="row text-center">
            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.2s',
                animationName: 'none',
              }}
            >
              <div className="single_how_to_buy">
                <div className="flex justify-center items-center">
                  <img
                    src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/man.png"
                    alt="mage"
                  />
                </div>
                <h4>Create Account</h4>
                <p>
                  All you have to do is to create your account by clicking on
                  the register button, you are all good to go.
                </p>
              </div>
            </div>
            {/* END COL */}
            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.3s',
                animationName: 'none',
              }}
            >
              <div className="single_how_to_buy">
                <div className="flex justify-center items-center">
                  <img
                    src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/bank2.png"
                    alt="mage"
                  />
                </div>
                <h4>Add a little fund</h4>
                <p>
                  You have to make your initial investment to activate your
                  account and start receiving your fund.
                </p>
              </div>
            </div>
            {/* END COL */}
            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.4s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.4s',
                animationName: 'none',
              }}
            >
              <div className="single_how_to_buy">
                <div className="flex justify-center items-center">
                  <img
                    src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/icon/buy.png"
                    alt="mage"
                  />
                </div>
                <h4>Start Making Wealth</h4>
                <p>
                  At this point all you have to do is to withdraw your fund for
                  your enjoyment
                </p>
              </div>
            </div>
            {/* END COL */}
          </div>
          {/* END ROW */}
        </div>
      </section>
      <section id="blog" className="blog_area section-padding">
        <div className="container mx-auto">
          <div className="section-title text-center">
            <h1>In the News</h1>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="row text-center">
            <div
              className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.1s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.1s',
                animationName: 'none',
              }}
            >
              <div className="single_blog">
                <div className="blog-img">
                  <img
                    src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/blog/1.jpg"
                    className="img-fluid "
                    alt="mage"
                  />
                  <Link href="#">July 28, 2021</Link>
                </div>
                <span>
                  <Link href="#">Development</Link>
                </span>
                <h2>
                  <Link href="#">
                    Fast food is popular because its convenient
                  </Link>
                </h2>
                <Link href="/about" className="btn_one">
                  Read More
                </Link>
              </div>
            </div>
            {/* END COL */}
            <div
              className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.2s',
                animationName: 'none',
              }}
            >
              <div className="single_blog">
                <div className="blog-img">
                  <img
                    src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/blog/2.jpg"
                    className="img-fluid "
                    alt="mage"
                  />
                  <Link href="#">July 29, 2021</Link>
                </div>
                <span>
                  <Link href="#">Technology</Link>
                </span>
                <h2>
                  <Link href="#">The incredible thing about Virtual Reality</Link>
                </h2>
                <Link href="/about" className="btn_one">
                  Read More
                </Link>
              </div>
            </div>
            {/* END COL */}
            <div
              className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset="0"
              style={{
                visibility: 'hidden',
                animationDuration: '1s',
                animationDelay: '0.3s',
                animationName: 'none',
              }}
            >
              <div className="single_blog">
                <div className="blog-img">
                  <img
                    src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/img/blog/3.jpg"
                    className="img-fluid"
                    alt="mage"
                  />
                  <Link href="#">July 30, 2021</Link>
                </div>
                <span>
                  <Link href="#">Fashion</Link>
                </span>
                <h2>
                  <Link href="#">For good results must be make good plan </Link>
                </h2>
                <Link href="/about" className="btn_one">
                  Read More
                </Link>
              </div>
            </div>
            {/* END COL */}
          </div>
          {/* END ROW */}
        </div>
        {/* END CONTAINER */}
      </section>
      <Footer />
    </div>
    </>
  )
}
