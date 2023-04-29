import {useState} from "react"
import StatusCard from '@/components/StatusCard' 
import ChartLine from '@/components/ChartLine' 
import ChartBar from '@/components/ChartBar' 
import PageVisitsCard from '@/components/PageVisitsCard' 
import TrafficCard from '@/components/TrafficCard' 
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import useCollection from '@/components/hooks/UseCollection'
import { auth } from '@/db/firebaseDb'
import Sidebar from '@/components/user/Sidebar'
import AdminNavbar from '@/components/user/UserNavbar'
import FooterUser from '@/components/user/FooterUser'
import InvestmentStats from "@/components/InvestmentStats"
import formatCurrency from "@/utils/converter"

export default function Dashboard() {

  
  
  const [transactions] = useCollection(`transactions/${auth.currentUser?.uid}/transactionDatas`)
  const [payments] = useCollection(`payments/${auth.currentUser?.uid}/paymentDatas`)
  const [investments] = useCollection(`investments/${auth.currentUser?.uid}/investmentDatas`)
  const {currentUser} = useSelector((state:RootState) => state.auth)


  const initialDCheck = () => {
    const initialNumber = Number(currentUser?.initialDeposit || currentUser?.initialDeposit)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }

  const totalDCheck = () => {
    const initialNumber = Number(currentUser?.mainBalance)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }
  const interestDCheck = () => {
    const initialNumber = Number(currentUser?.interestBalance)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }
  const profitDCheck = () => {
    const initialNumber = Number(currentUser?.profit)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }

  return (
    <>
    <AdminNavbar/>
    
    <div className='flex'>
   
    <Sidebar />
   
    <div className="footer-bg flex-more homepage-3">
      <div className=" px-3 md:px-8 h-20 pt-10 " />

      <div className="px-3 md:px-8">
        <div className=" container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4 text-white">
            <StatusCard
              color="red"
              icon="money"
              title="Initial"
              amount={currentUser?.initialDeposit}
              percentage={initialDCheck()}
              percentageIcon={
                initialDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
              }
              percentageColor={initialDCheck() > 50 ? 'green' : 'red'}
              date="Since last month"
            />
            <StatusCard
              color="orange"
              icon="storage"
              title="Balance"
              amount={currentUser?.mainBalance}
              percentage={totalDCheck()}
              percentageIcon={
                totalDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
              }
              percentageColor={totalDCheck() > 50 ? 'green' : 'red'}
              date="Since last week"
            />
            <StatusCard
              color="purple"
              icon="paid"
              title="Profits"
              amount={currentUser?.profit}
              percentage={profitDCheck()}
              percentageIcon={
                profitDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
              }
              percentageColor={profitDCheck() > 50 ? 'green' : 'red'}
              date="Since yesterday"
            />
            <StatusCard
              color="blue"
              icon="poll"
              title="Interest"
              amount={currentUser?.interestBalance}
              percentage={interestDCheck()}
              percentageIcon={
                interestDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
              }
              percentageColor={interestDCheck() > 50 ? 'green' : 'red'}
              date="Since last month"
            />
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 ">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 lg:px-4 mb-14">
              <ChartLine />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 lg:px-4 mb-14">
              <ChartBar />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 lg:px-4 mb-14">
              <PageVisitsCard
                
                transactions={transactions}
              />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 lg:px-4 mb-14">
              <TrafficCard
                profile={currentUser}
                payments={payments}
                investments={investments}
                total={totalDCheck()}
                initial={initialDCheck()}
                interest={interestDCheck()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 md:px-8 h-auto mb-14">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 c-bg rounded-lg px-4 pt-4  mx-lg-3 xl:grid-cols-5">
            
              <InvestmentStats
                
               investments={investments}
              />
            
          
          </div>
        </div>
      </div>
   <FooterUser/>
    </div>
    </div>
    </>
  )
}

Dashboard.defaultProps ={
  needsAuth: true,


}
