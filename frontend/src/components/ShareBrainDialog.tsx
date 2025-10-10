import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ShareBrainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemCount?: number;
}

function ShareBrainDialog({ open, onOpenChange, itemCount = 3 }: ShareBrainDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Share Your Second Brain</DialogTitle>
          <DialogDescription className="pt-2 text-base">
            Share your entire collection of notes, documents, tweets, and videos with others.
            They'll be able to import your content into their own Second Brain.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4">
          <Button className="gradient-primary w-full gap-2">
            <Share2 className="h-4 w-4" />
            Share Brain
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {itemCount} items will be shared
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ShareBrainDialog;