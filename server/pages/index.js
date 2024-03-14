import MainComponent from '../components/mainComponent'
import AdminContent from '../components/adminContent/adminComponent'
import ExpertContent from '../components/expertContent/expertContent'
import { getLoginSession } from '../lib/auth'
import { getDatabase } from '../lib/db'
import { Role } from '../models/userModel'
import { findUser } from '../lib/user'

export default function HomePage({
  isConnected,
  isAdmin,
  isLoggedIn,
  isExpert,
  user,
}) {
  return (
    <MainComponent
      className="homeComp"
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      isExpert={isExpert}
    >
      {isConnected ? (
        isAdmin ? (
          <AdminContent />
        ) : (
          <ExpertContent isExpert={isExpert} user={user} />
        )
      ) : (
        <h2 className="subtitle">Server error: Database connection failed.</h2>
      )}
    </MainComponent>
  )
}

export async function getServerSideProps(context) {
  let isConnected = false
  let user = null
  let isAdmin = false
  let isLoggedIn = false
  let isExpert = false

  if (getDatabase()) {
    isConnected = true
  }

  const session = await getLoginSession(context.req)
  if (session) {
    user = await findUser(session.username)
  }

  if (user) {
    isAdmin = user.role === Role.admin
    isLoggedIn = user.status === 'normal'
    isExpert = user.role === Role.expert
  }

  if (isConnected && !isLoggedIn) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  } else {
    return {
      props: {
        isConnected,
        isAdmin,
        isLoggedIn,
        isExpert,
        user,
      },
    }
  }
}
