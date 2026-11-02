"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Trash } from "lucide-react";
import { useState } from "react";
import FeedBack from "../FeedBack";
import { useRouter } from "next/navigation";
import TaskFeedBack from "../TaskFeedBack";

const DeleteTaskCard = ({
  onClose,
  taskId,
  name,
  projectId
}: {
  onClose: () => void;
  taskId: string;
  name: string;
  projectId: string
}) => {
  const [loading, setLoading] = useState(false);
  const [isFeedbackOpen, setIsFeedBackOpen] = useState(false);
  const [type, setType] = useState(0);
  const [error,setError] = useState("")

  const router = useRouter()

  const handleSUbmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);

      if (response.status === 200) {
        setType(1);
        router.refresh()
      } else {
        setError(result.message)
        setType(4)
      }
    } catch {
      setType(3);
    } finally {
      setLoading(false);
      setIsFeedBackOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      {isFeedbackOpen ? (
        <TaskFeedBack 
            type={type} 
            name={name} 
            desc={""} 
            onClose={() => {
                onClose()
                setIsFeedBackOpen(false)
            }}
            error={error}
            />
      ) : (
        <Card className="w-full max-w-110 rounded-2xl">
          <div className="mx-6 mt-6 flex size-10 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
            <Trash size={22} />
          </div>
          <CardHeader className="px-6 ">
            <CardTitle className="text-2xl font-semibold">
              Delete Task?
            </CardTitle>
            <CardDescription>
              Are you sure want to delete <b>&quot;{name}&quot;</b> task?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6"></CardContent>
          <CardFooter className="justify-end gap-2 px-6 py-4">
            <Button
              variant="outline"
              className="p-5 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="p-5 cursor-pointer"
              variant="destructive"
              disabled={loading}
              onClick={handleSUbmit}
            >
              {loading ? "Deleting..." : "Delete Task"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default DeleteTaskCard;
