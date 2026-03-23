import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../redux/authSlice'

function Profile() {
  const dispatch = useDispatch()
  const { userProfile } = useSelector((state) => state.auth)

  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleEdit = () => {

    setFirstName(userProfile?.firstName || '')
    setLastName(userProfile?.lastName || '')
    setIsEditing(true)
  }

  const handleSave = async () => {
    await dispatch(updateUserProfile({ firstName, lastName }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {userProfile?.firstName} {userProfile?.lastName}!
        </h1>

        {/* Formulaire d'édition */}
        {isEditing ? (
          <div className="edit-form">
            <div className="input-wrapper">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <button className="edit-button" onClick={handleSave}>Save</button>
              <button className="edit-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="edit-button" onClick={handleEdit}>Edit Name</button>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default Profile