import Image from 'next/image'
import styles from './page.module.css'
import { Header } from '@/components/Header/header'
import { Chat } from '@/components/Chat/chat'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Chat />
    </Fragment>
  )
}
