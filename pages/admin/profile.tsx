import SettingsForm from '@/components/SettingsForm'
import ProfileCard from '@/components/ProfileCard'
import AdminNavbar from '@/components/user/UserNavbar'
import Layout from '@/components/Layout'
import FooterAdmin from '@/components/admin/FooterAdmin'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHero from '@/components/admin/AdminHero'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'


export default function Dashboard() {
  const {currentUser, userDate} = useSelector((state: RootState) => state.auth)


  return (
    <>

      <AdminNavbar/>
     
    <div className='flex '>
    <AdminSidebar/>
    <div className='w-full'>
      <Layout>
      <AdminHero title='Profile' />

        <div className="c">
          <div className="grid grid-cols-1 xl:grid-cols-6 gap-5">
            <div className="xl:col-start-1 xl:col-end-5  mb-16 lg:mt-0 mt-8">
              <SettingsForm user={currentUser} />
            </div>
            <div className="xl:col-start-5 xl:col-end-7  mb-16 lg:mt-0 mt-8">
              <ProfileCard  user={currentUser} />
            </div>
          </div>
        </div>
      </Layout>
      <FooterAdmin/>
        </div>
        </div>
      
     
    </>
  )
}

// Dashboard.defaultProps ={
//   needsAuth: true,
//   isAdmin: true

// }
