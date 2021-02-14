import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const Page = props => (
  <>
    <Header />

    <div className="main-container">
      { props.children }
    </div>
    
    <Footer />
  </>
)

export default Page