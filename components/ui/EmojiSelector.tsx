
"use client"

import { useState } from "react"
import EmojiPicker from "emoji-picker-react"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

type EmojiSelectorProps = {
  value: string
  onChange: (emoji: string) => void
}

export default function EmojiSelector({
  value,
  onChange,
}: EmojiSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
      <Label className="text-gray-700 font-bold">
        Choose an Emoji
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-left"
            />
          }
        >
          {value || "e.g. 🌐"}
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-auto p-0"
        >
          <EmojiPicker
            width={320}
            height={350}
            onEmojiClick={(emojiData) => {
              onChange(emojiData.emoji)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
