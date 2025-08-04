"use client"

import { Button } from "@/components/ui/button"

const avatars = [
  "🤖", // Robot
  "👾", // Alien monster
  "🧙‍♂️", // Male wizard
  "🧙‍♀️", // Female wizard
  "🦾", // Mechanical arm
]

interface AvatarSelectorProps {
  selected: string
  onSelect: (avatar: string) => void
}

export function AvatarSelector({ selected, onSelect }: AvatarSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#808080] text-center">Choose your coding persona!</p>
      <div className="grid grid-cols-5 gap-3 justify-center">
        {avatars.map((avatar) => (
          <Button
            key={avatar}
            type="button"
            variant={selected === avatar ? "default" : "outline"}
            className={`text-2xl h-14 w-14 p-0 font-mono transition-all duration-200 ${
              selected === avatar
                ? "bg-[#00ff41] text-[#0a0a0a] border-2 border-[#00ff41] scale-110 shadow-[0_0_10px_#00ff41]"
                : "bg-[#1a1a1a] text-[#e0e0e0] border border-[#2a2a2a] hover:border-[#00ff41] hover:shadow-[0_0_5px_#00ff41] hover:scale-105"
            }`}
            onClick={() => onSelect(avatar)}
          >
            {avatar}
          </Button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-[#808080]">Pick one that represents your coding spirit!</p>
      </div>
    </div>
  )
}
