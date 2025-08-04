"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, User, Search, Map, ArrowLeft, Menu, X } from "lucide-react"
import type { UserProfile } from "@/types/user"

interface NavbarProps {
  user: UserProfile
  activeTab: "map" | "profile" | "search"
  onTabChange: (tab: "map" | "profile" | "search") => void
  onLogout: () => void
  showBackButton?: boolean
  onBack?: () => void
}

export function Navbar({
  user,
  activeTab,
  onTabChange,
  onLogout,
  showBackButton,
  onBack,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderNavButton = (
    label: string,
    icon: JSX.Element,
    tab: "map" | "profile" | "search"
  ) => (
    <Button
      variant={activeTab === tab ? "default" : "ghost"}
      onClick={() => {
        onTabChange(tab)
        setMobileMenuOpen(false)
      }}
      className="flex items-center gap-2 text-sm w-full sm:w-auto"
    >
      {icon}
      {label}
    </Button>
  )

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side: Logo or Back */}
          <div className="flex items-center gap-4">
            {showBackButton && onBack ? (
              <Button variant="ghost" onClick={onBack} className="text-green-400 hover:text-green-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-2xl">{user.avatar}</span>
                <div>
                  <h1 className="text-lg font-bold text-green-400">Developer Academy</h1>
                  <p className="text-xs text-gray-400">
                    Level {user.level} • {user.totalXP} XP
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger menu for mobile */}
          {!showBackButton && (
            <div className="sm:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          )}

          {/* Right side - Desktop nav + Logout */}
          <div className="hidden sm:flex items-center gap-4">
            {!showBackButton && (
              <>
                {renderNavButton("Learning Map", <Map className="h-4 w-4" />, "map")}
                {renderNavButton("Profile", <User className="h-4 w-4" />, "profile")}
                {renderNavButton("Find Users", <Search className="h-4 w-4" />, "search")}
              </>
            )}

            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-green-400">{user.nickname}</div>
              <div className="text-xs text-gray-400">{user.totalXP} XP</div>
            </div>

            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        {mobileMenuOpen && !showBackButton && (
          <div className="mt-4 flex flex-col gap-2 sm:hidden">
            {renderNavButton("Learning Map", <Map className="h-4 w-4" />, "map")}
            {renderNavButton("Profile", <User className="h-4 w-4" />, "profile")}
            {renderNavButton("Find Users", <Search className="h-4 w-4" />, "search")}
            <div className="flex items-center justify-between border-t border-green-800 pt-3">
              <div>
                <p className="text-sm text-green-400 font-semibold">{user.nickname}</p>
                <p className="text-xs text-gray-400">{user.totalXP} XP</p>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
