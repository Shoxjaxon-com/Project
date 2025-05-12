import React from 'react'
import Header from '../components/Header'
import InvoiceCard from '../components/InvoiceCard'
import Navbar from '../components/Navbar'

function Home() {
  console.log("Home render bo‘ldi ...");

  return (
    <div className='container mx-auto'>
      <Navbar />
      <Header />
      <InvoiceCard />
    </div>
  );
}

export default Home;
