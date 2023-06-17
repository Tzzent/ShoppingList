'use client';

import {
  AiOutlineBars,
  AiOutlineHistory,
  AiOutlineBarChart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import Image from 'next/image';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import SidebarItem from './SidebarItem';
import useAside from '@/app/hooks/useAside';
import useList from '@/app/hooks/useList';

export default function Sidebar() {
  const { listItems } = useList();
  const { toggleOpenAside } = useAside();
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      icon: AiOutlineBars,
      label: 'items',
      active: pathname === '/',
      href: '/'
    },
    {
      icon: AiOutlineHistory,
      label: 'history',
      active: pathname.startsWith('/history'),
      href: '/history'
    },
    {
      icon: AiOutlineBarChart,
      label: 'statistics',
      active: pathname.startsWith('/statistics'),
      href: '/statistics'
    }
  ], [pathname]);

  return (
    <nav
      className="
      bg-white
      h-full
      py-8
      px-2
      flex
      flex-col
      gap-20
      justify-between
      items-center
      text-2xl
      z-10
      shadow-lg
      "
    >
      <Image
        src="/assets/images/logo.svg"
        alt="logo"
        width={50}
        height={50}
      />
      <div
        className="
        flex
        flex-col
        gap-16
        "
      >
        {routes.map((route) => (
          <SidebarItem key={route.label} {...route} />
        ))}
      </div>
      <div
        onClick={toggleOpenAside}
        className="
        bg-[#F9A109]
        text-white
        rounded-full
        relative
        cursor-pointer
        p-3
        "
      >
        <span
          className="
          bg-[#EB5757]
          absolute
          -top-2
          -right-2
          rounded-lg
          px-2
          text-base
          "
        >
          {listItems.length}
        </span>
        <AiOutlineShoppingCart />
      </div>
    </nav>
  )
}
