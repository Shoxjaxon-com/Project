import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getInvoice } from '../request'
import CardSkleton from '../components/CardSkleton'
import MyCard from '../components/MyCard'
import InvoiceCard from '../components/InvoiceCard'
import Navbar from '../components/Navbar'
function Home() {
  console.log("Home render boldi ...");
  
  return (
    <div className='base-container'>
        <Navbar />
     <Header/>
     <InvoiceCard />
    </div>
  )
}

export default Home
