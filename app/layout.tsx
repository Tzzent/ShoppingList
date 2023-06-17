import './globals.css'
import { Quicksand } from 'next/font/google'
import Sidebar from './components/sidebar/Sidebar'
import Aside from './components/aside/Aside'
import ClientOnly from './components/ClientOnly'
import getCategories from './actions/getCategories'
import Provider from './providers/Provider'

const font = Quicksand({ subsets: ['latin'] })

export const metadata = {
  title: 'Shopping List',
  description: 'The shopping list, a list of items that you can list.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <link rel="shortcut icon" href="/assets/images/favicon.png" />
      <body className={font.className}>
        <Provider />
        <div
          className="
          bg-slate-50
          relative 
          flex 
          h-full 
          overflow-hidden
          "
        >
          <ClientOnly>
            <Sidebar />
          </ClientOnly>
          <main
            className="
            w-full
            h-full
            flex-1
            overflow-y-auto
            scrollbar
            scrollbar-w-[0.3rem]
            scrollbar-h-[0.3rem]
            scrollbar-thumb-[#F9A109]
            scrollbar-thumb-rounded-xl
            scrollbar-track-slate-300/[0.30]
            scrollbar-track-rounded-xl
            pt-8
            "
          >
            {children}
          </main>
          <ClientOnly>
            <Aside categories={categories} />
          </ClientOnly>
        </div>
      </body>
    </html>
  )
}
