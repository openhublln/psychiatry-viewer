import React, { useState } from 'react'
import { RiAdminLine } from 'react-icons/ri'
import { FiUsers } from 'react-icons/fi'
import { AiOutlineKey } from 'react-icons/ai'
import { Layout, Menu } from 'antd'
import ManageUsers from './manageUsers'
import Configuration from './configuration'
import Styles from './admincontent.module.css'

const { Content, Sider } = Layout

const adminSiderbarItems = [
  {
    key: 'config',
    icon: React.createElement(RiAdminLine),
    label: 'Configuration',
  },
  {
    key: 'usermanagement',
    icon: React.createElement(FiUsers),
    label: 'User Management',
  },
  {
    key: 'sshkey',
    icon: React.createElement(AiOutlineKey),
    label: 'SSH Key',
  },
]

const AdminComponent = (props) => {
  const [selectedMode, setSelectedMode] = useState('usermanagement')

  const componentsSwitch = (key) => {
    switch (key) {
      case 'usermanagement':
        return <ManageUsers></ManageUsers>
      case 'config':
        return <Configuration />
      case 'sshkey':
        return (
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '0',
              bottom: '0',
              left: '220px',
              fontSize: '30px',
            }}
          >
            Add SSH Key: Ongoing
          </div>
        )
      default:
        break
    }
  }

  return (
    <>
      <Content className={Styles.adminContent}>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['usermanagement']}
            style={{
              height: '100%',
            }}
            items={adminSiderbarItems}
            selectedKeys={selectedMode}
            onClick={(e) => setSelectedMode(e.key)}
          />
        </Sider>
        <div className={Styles.adminDiv}>{componentsSwitch(selectedMode)}</div>
      </Content>
    </>
  )
}

export default AdminComponent
