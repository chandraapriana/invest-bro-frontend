import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export function ModalSaveStrategy() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Save className="h-4 w-4 mr-2" />
          Simpan Strategi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Simpan Strategi</DialogTitle>
        </DialogHeader>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name" className="text-left">
            Nama Strategi
          </Label>
          <Input
            id="name"
            placeholder="Masukkan nama strategi"
            className="col-span-3"
          />
        </div>

        <DialogFooter>
          <Button type="submit">Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
