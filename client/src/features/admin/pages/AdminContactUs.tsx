import { useEffect, useState } from "react";
import { getAllMessages, type ContactMessage } from "../services/contactMessages";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";

const AdminContactUs = () => {
  const [messages, setMessages]=useState<ContactMessage[]>([]);
  const [selected, setSelected]=useState<ContactMessage | null>(null);

  useEffect(()=>{
    const load = async()=>{
      try {
        const data = await getAllMessages();
        setMessages(data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load messages");
      }
    } 
    load();
  },[])

  return (
    <div>
       <h1 className="text-[24px] mb-5 font-bold">contact Messages</h1> 
   


      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg)=>(
              <TableRow key={msg.id}>
                <TableCell >{msg.name}</TableCell>
                <TableCell>{msg.email}</TableCell>
                <TableCell>{msg.phone}</TableCell>
                <TableCell>{new Date(msg.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <button
                    onClick={()=>setSelected(msg)}
                    className="text-sm underline text-blue-600 hover:text-blue-800"
                  >
                    View Message
                  </button>
                </TableCell>
              </TableRow>
            )
            )
                }
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) =>!open &&setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Message from  {selected?.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span className="text-gray-500 w-14">Email:</span>
              <span>{selected?.email}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 w-14">phone </span>
              <span>{selected?.phone}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 w-14" >Date </span>
              <span>{selected ?new Date(selected.createdAt).toLocaleString() :""}</span>
            </div>
            <div className="border-t pt-3">
              <p className="text-gray-500 mb-1">Message:</p>
              <p className="bg-gray-50 rounded p-3 leading-relaxed">{selected?.message}</p>
            </div>
          </div>

          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContactUs;
