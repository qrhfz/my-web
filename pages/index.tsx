import type { NextPage } from 'next'
import Image from "next/image";
import MainLayout from '../components/main_layout'

const Home: NextPage = () => {
  return (<MainLayout title='Qori El-Hafizh'>

    <div className="flex flex-col h-full justify-evenly items-center md:items-start">
      <div >
        <Image src="/pp.JPG" alt="" width="256px" height="256px" className="rounded-3xl" />

      </div>
      <div >
        <h1 className="font-bold text-5xl lg:text-5xl p-2">Qori El-Hafizh</h1>
        <h1 className="text-3xl p-2">I build apps with Flutter and React</h1>
      </div>
    </div>
  </MainLayout>
  )
}

export default Home
