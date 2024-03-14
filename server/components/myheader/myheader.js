import React from 'react'
import { Menu, Layout } from 'antd'
import Styles from './myheader.module.css'
import Link from 'next/link'
import NextImage from 'next/image'
import { AiFillHome, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'
import { useRouter } from 'next/router'

const Image = NextImage.default
const { Header } = Layout

/**
 * @returns The header component
 */
const MyHeader = () => {
  const { asPath } = useRouter()
  return (
    <Header className="myHeader">
      <div className={Styles.logoUcl}>
        <Image
          alt="Logo of uclouvain"
          src="/images/logo_UCLouvain.png"
          width="100"
          height="30"
          onClick={() => window.open('https://uclouvain.be/en/index.html')}
        />
      </div>

      <div className={Styles.logoIons}>
        <Image
          alt="Logo for ions"
          src="/images/iconUclouvain.png"
          width="80"
          height="30"
          onClick={() =>
            window.open('https://uclouvain.be/en/research-institutes/ions')
          }
        />
      </div>
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={[asPath]}
        style={{ fontSize: '20px' }}
        className="headerMenu"
      >
        <Menu.Item key="/" icon={<AiFillHome />}>
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/login" icon={<AiOutlineLogin />}>
          <Link href="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="/logout" icon={<AiOutlineLogout />}>
          <Link href="/logout">Logout</Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default MyHeader
