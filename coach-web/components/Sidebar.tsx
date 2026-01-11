'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    {
      section: 'Dashboard',
      items: [
        { name: 'Overview', href: '/', icon: '📊' },
        { name: 'Analytics', href: '/analytics', icon: '📈' },
      ],
    },
    {
      section: 'Workouts',
      items: [
        { name: 'Workout Library', href: '/workouts', icon: '📚' },
        { name: 'Create Workout', href: '/workouts/new', icon: '➕' },
        { name: 'Programming', href: '/programming', icon: '📅' },
      ],
    },
    {
      section: 'Exercises',
      items: [
        { name: 'Exercise Library', href: '/exercises', icon: '📚' },
        { name: 'Add Exercise', href: '/exercises/new', icon: '➕' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 border-r border-gray-800 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">P</span>
              </div>
              <span className="text-white font-bold text-xl">Protocol</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {navItems.map((section) => (
              <div key={section.section} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                  {section.section}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-gray-900 border border-gray-800 rounded-lg text-white"
      >
        ☰
      </button>
    </>
  );
}

