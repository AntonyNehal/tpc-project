import { Navbar } from 'flowbite-react'
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigationbar() {
  return (
    <Navbar className='border-b-2'>
        <Link to="/">
        <span>tpc</span>website</Link>
    </Navbar>
  )
}
