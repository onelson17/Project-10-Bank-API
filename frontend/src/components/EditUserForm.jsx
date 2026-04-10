import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../store/authSlice'

function EditUserForm({ onClose }) {
  const dispatch = useDispatch()
  const { userProfile } = useSelector((state) => state.auth)

  const [userName, setUserName] = useState(userProfile?.userName || '')

  const handleSave = async () => {
    await dispatch(updateUserProfile({ userName }))
    onClose()
  }

  return (
    <div className="edit-form">
      <div className="input-wrapper">
        <label>Username</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label>First Name</label>
        <input
          type="text"
          value={userProfile?.firstName || ''}
          disabled
        />
      </div>
      <div className="input-wrapper">
        <label>Last Name</label>
        <input
          type="text"
          value={userProfile?.lastName || ''}
          disabled
        />
      </div>
      <div className="edit-form-buttons">
        <button className="edit-button" onClick={handleSave}>Save</button>
        <button className="edit-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default EditUserForm