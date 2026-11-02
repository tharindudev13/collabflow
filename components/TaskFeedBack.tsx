
import React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Check, CircleX, Trash, TriangleAlert } from "lucide-react"
import { Button } from "./ui/button"

type FeedBackProps = {
  type: number
  name: string
  desc: string
  onClose: () => void
  error: string
}

const TaskFeedBack = ({ type, name, desc ,onClose,error}: FeedBackProps) => {
  
const data = [
  {
    color: "#634FE5",
    icon: <Check size={36} color="white" />,
    topic: "One More Step Forward!",
    subTopic: "TASK CREATED",
    message: (
      <div className="space-y-2">
        <p>
          Your task <strong>{name}</strong> is ready to go!
        </p>
        <p>{desc || "Time to turn your plans into progress."}</p>
      </div>
    ),
  },
  {
    color: "#E3475C",
    icon: <Trash size={36} color="white" />,
    topic: "Clearing the Way!",
    subTopic: "TASK REMOVED",
    message: (
      <p>
        Task <strong>{name}</strong> has been successfully
        removed from your workspace.
      </p>
    ),
  },
  {
    color: "#1FA673",
    icon: <Check size={36} color="white" />,
    topic: "Progress Looks Good on You!",
    subTopic: "TASK UPDATED",
    message: (
      <p>
        Your changes to <strong>{name}</strong> have been
        saved successfully. Keep the momentum going!
      </p>
    ),
  },
  {
    color: "#F5A130",
    icon: <TriangleAlert size={36} color="white" />,
    topic: "A Small Bump in the Road!",
    subTopic: "ACTION NOT COMPLETED",
    message: (
      <p>
        We {"couldn't"} complete your task action.
        Please check your details and try again.
      </p>
    ),
  },
  {
    color: "#DC2626",
    icon: <CircleX size={36} color="white" />,
    topic: "Our Gears Got Stuck!",
    subTopic: "SERVER ERROR",
    message: (
      <p>
        Something went wrong on our end while
        processing your task. Please try again shortly.
        {error && (
          <>
            <br />
            <span className="font-bold">
              Error: {error}
            </span>
          </>
        )}
      </p>
    ),
  },
]


  const feedback = data[type]

  if (!feedback) {
    return null
  }

  return (
    <Card
      className="w-full max-w-sm gap-5 overflow-hidden border-t-5 py-6 shadow-lg"
      style={{ borderTopColor: feedback.color }}
    >
      <CardHeader className="flex flex-col items-center gap-4 px-6 text-center">
        <div
          className="flex items-center justify-center rounded-full p-2"
          style={{
            backgroundColor: `${feedback.color}30`,
          }}
        >
          <div
            className="flex items-center justify-center rounded-full p-3"
            style={{
              backgroundColor: feedback.color,
            }}
          >
            {feedback.icon}
          </div>
        </div>

        <p
          className="text-xs font-semibold uppercase"
          style={{ color: feedback.color }}
        >
          {feedback.subTopic}
        </p>

        <CardTitle className="text-center text-2xl font-bold leading-tight">
          {feedback.topic}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 text-center">
        <div className="text-xs leading-relaxed text-muted-foreground">
          {feedback.message}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end px-6">
        <Button
          className="min-w-36 cursor-pointer text-white hover:opacity-90 py-5"
          style={{
            backgroundColor: feedback.color,
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TaskFeedBack
