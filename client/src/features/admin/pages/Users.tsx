import { useEffect, useState } from "react";
import { getUsers, deleteUser, type User } from "../services/users";
import { toast } from "react-toastify";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import { Button } from "../../../components/ui/button";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(()=>{
    const load =async()=>{
      try{
        const data = await getUsers();
        const userdata =data.filter((u)=>u.role!== "admin")
        setUsers(userdata);
      }
      catch (error){
        console.log(error);
        toast.error("Failed to load users");
      }
    };
    load();
  },[]);

  const handleDelete=async(id:string)=>{
    const oldu =users

    setUsers(prev=> prev.filter(u => u.id !== id));

    try {
      await deleteUser(id);


      toast.success("Deleted!");
    } catch (error) {
      setUsers(oldu);
      console.log(error);
      toast.error("Error");
    }
  }

  return (
    <div >
      <h1 className="text-[24px]  font-bold mb-5">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>phone</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { users.map((u)=>(
            <TableRow key={u.id }>
              <TableCell>{u.username }</TableCell>
              <TableCell>{u.email }</TableCell>
              <TableCell>{u.phone }</TableCell>
              
              <TableCell>
                <Button
                  onClick={()=> handleDelete(u.id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )
          )
          }
        </TableBody>
      </Table>
    </div>
  )
}
export default Users;
