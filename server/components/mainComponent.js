import React from 'react'
import { Layout } from 'antd'
import MyHeader from './myheader/myheader'

const { Content, Footer } = Layout

const MainComponent = (props) => {
  return (
    <>
      <Layout>
        <MyHeader isLogin={props.isLoggedIn} />
        <Content>
          <Layout
            style={{
              minHeight: '80vh',
              flexDirection: 'column',
              display: 'flex',
            }}
          >
            {props.children}
          </Layout>
        </Content>
        <Footer
          className="mainFooter"
          style={{
            textAlign: 'end',
            color: 'blue',
            height: 'min-content',
            marginTop: 'auto',
          }}
        >
          Psychiatry Viewer ©2022 Created by UCLouvain ICTEAM/IoNS
        </Footer>
      </Layout>
    </>
  )
}

export default MainComponent
