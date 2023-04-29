import React from 'react'
import Plans from '../../components/Plans'

export default function Dashboard() {
  return (
    <section className="footer-bg homepage-3 mb-8">
      <section className="container mx-auto">
        <div className="col-md-12">
          <div className="row sm:space-y-4">
            <div className="text-center text-4xl my-12 ">
              <h2>Basic Plans</h2>
            </div>
            <div className="col-lg-4 col-sm-12 ">
              <Plans initiald={'$200'} initialw={'$3500'} head={'Basic'} />
            </div>
            <div className="col-lg-4 col-sm-12">
              <Plans initiald={'$300'} initialw={'$4500'} head={'Basic'} />
            </div>
            <div className="col-lg-4  col-sm-12">
              <Plans initiald={'$400'} initialw={'$5950'} head={'Basic'} />
            </div>
          </div>
          <div className="row sm:space-y-4">
            <div className="text-center text-4xl my-12 ">
              <h2> Advanced Plans</h2>
            </div>
            <div className="col-lg-4 col-sm-12 ">
              <Plans initiald={'$500'} initialw={'$7500'} head={'Advance'} />
            </div>
            <div className="col-lg-4 col-sm-12">
              <Plans initiald={'$500'} initialw={'$7500'} head={'Advance'} />
            </div>
            <div className="col-lg-4  col-sm-12">
              <Plans initiald={'$700'} initialw={'$9,750'} head={'Advance'} />
            </div>
          </div>
          <div className="row sm:space-y-4">
            <div className="text-center text-4xl my-12 ">
              <h2> Ultimate Plans</h2>
            </div>

            <div className="col-lg-4 col-sm-12 ">
              <Plans initiald={'$800'} initialw={'$10,000'} head={'Ultimate'} />
            </div>
            <div className="col-lg-4 col-sm-12">
              <Plans initiald={'$900'} initialw={'$11,500'} head={'Ultimate'} />
            </div>
            <div className="col-lg-4  col-sm-12">
              <Plans
                initiald={'$1000'}
                initialw={'$17,388'}
                head={'Ultimate'}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
