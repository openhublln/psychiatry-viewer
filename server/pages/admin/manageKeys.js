import React from 'react'
import AdminComponent from '../../components/adminContent/adminComponent'
import { getUsers, getDatabase } from '../../lib/db'
import { getLoginSession } from '../../lib/auth'
import { MyAlert } from '../../components/myAlert'
import { Button } from 'antd'
import { Role } from '../../models/userModel'

export default function ManageKeys({ admin }) {
  if (!admin) {
    return <div className="authenticationDiv">User not authenticated</div>
  }

  const onSubmit = async function () {
    const publicKey = document.getElementById('publicKey').value

    let data = await fetch('/api/admin/addpublickey?publicKey=' + publicKey, {
      method: 'POST',
    })
    if (data.status !== 200) {
      const message = (await data.json()).message
      return MyAlert('Add Public Key', 'Public Key added failt: ' + message)
    }
    document.getElementById('publicKeyId').value = ''
  }

  return (
    <AdminComponent>
      <div className="manageKeys">
        <h2 className="manageKeyText">Add a public Key</h2>
        <br />
        <textarea id="publicKeyId" className="publicKey" />
        <br />
        <Button
          type="button"
          className="keyBtn"
          onClick={() => {
            onSubmit()
          }}
        >
          Submit
        </Button>
      </div>
    </AdminComponent>
  )
}

export async function getServerSideProps(context) {
  let isConnected = false

  if (getDatabase()) {
    isConnected = true
  }

  const session = await getLoginSession(context.req)
  let user = null
  if (session) {
    user = await getUsers().where('username', session.username)
  }

  let admin = false
  if (user) {
    admin = user.role === Role.admin
  }

  // TODO: for not admin

  return {
    props: { isConnected, admin },
  }
}
