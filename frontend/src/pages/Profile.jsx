import { useState } from 'react'
import { useSelector } from 'react-redux'
import EditUserForm from '../components/EditUserForm'
import Account from '../components/Account'

const accounts = [
  {
    id: 1,
    title: 'Argent Bank Checking (x8349)',
    amount: '$2,082.79',
    description: 'Available Balance',
  },
  {
    id: 2,
    title: 'Argent Bank Savings (x6712)',
    amount: '$10,928.42',
    description: 'Available Balance',
  },
  {
    id: 3,
    title: 'Argent Bank Credit Card (x8349)',
    amount: '$184.30',
    description: 'Current Balance',
  },
]

function Profile() {
  const { userProfile } = useSelector((state) => state.auth)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <main className="main bg-dark">
      <div className="header">
      <h1>
        Welcome back<br />
        {userProfile?.userName || userProfile?.firstName}!
      </h1>

        {isEditing ? (
          <EditUserForm onClose={() => setIsEditing(false)} />
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {accounts.map((account) => (
        <Account
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  )
}

export default Profile