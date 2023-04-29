import SettingsForm from '@/components/SettingsForm'
import ProfileCard from '@/components/ProfileCard'
import Sidebar from '@/components/user/Sidebar'
import AdminNavbar from '@/components/user/UserNavbar'
import UserHero from '@/components/user/UserHero'
import Layout from '@/components/Layout'
import FooterUser from '@/components/user/FooterUser'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function Dashboard() {
  const {currentUser} = useSelector((state: RootState) => state.auth)


  return (
    <>
    <AdminNavbar/> 
    <div className='flex '>
    <Sidebar />
    <div className='w-full'>
      <Layout>
      <UserHero title='Profile' />
        <div className="container mx-auto homepage-3 max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-6 gap-5">
            <div className="xl:col-start-1 xl:col-end-5  mb-16 mb-lg-4 lg:mt-0 mt-8">
              <SettingsForm user={currentUser}  />
            </div>
            <div className="xl:col-start-5 xl:col-end-7  mb-16 lg:mt-0 ">
              <ProfileCard user={currentUser} />
            </div>
          </div>
        </div>
      </Layout>
      <FooterUser />
        </div>
        </div>
      
     
    </>
  )
}
Dashboard.defaultProps ={
  needsAuth: true,


}
