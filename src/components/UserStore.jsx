import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import ToastProps from "../model/ToastProps";
import StoreService from "../service/StoreService";
import UserService from "../service/UserService";
import FormInput from "./FormInput";

export default function UserStore({ store, setToasts, setStores, storeId }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [storeNameValue, setStoreName] = useState(store.storeName);
  const [locationValue, setLocation] = useState(store.location);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const storeName = e.target.storeName.value;
    const location = e.target.location.value;

    const { data } = await StoreService.updateStore({
      storeId: store.storeId,
      storeName,
      location,
    });

    if (data.isSuccessful) {
      setOpenEdit(false);
      setToasts((prev) => [
        ...prev,
        new ToastProps({ message: data.successMessage }),
      ]);

      const {
        data: { stores },
      } = await UserService.getAccount();

      setStores(stores);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const { data } = await StoreService.deleteStore({ storeId });

    if (data.isSuccessful) {
      setOpenDelete(false);
      setToasts((prev) => [
        ...prev,
        new ToastProps({ message: data.successMessage }),
      ]);

      const {
        data: { stores },
      } = await UserService.getAccount();

      setStores(stores);
    }
  };

  return (
    <Accordion open={open}>
      <AccordionHeader onClick={handleOpen}>
        <h2 className="font-bold text-2xl">{store.storeName}</h2>
      </AccordionHeader>
      <AccordionBody className="flex flex-col gap-4">
        <p className="text-xl flex gap-2">
          <span className="font-bold">Location:</span>
          <span>{store.location}</span>
        </p>
        <div className="flex justify-end gap-4">
          <Button
            variant="gradient"
            color="deep-purple"
            size="lg"
            onClick={handleOpenEdit}
          >
            Edit
          </Button>
          <Button
            variant="gradient"
            color="red"
            size="lg"
            onClick={handleOpenDelete}
          >
            Delete
          </Button>
          <Dialog open={openEdit} handler={handleOpenEdit} className="dialog">
            <DialogHeader className="dialog">Edit store</DialogHeader>
            <div className="divider m-0"></div>
            <DialogBody className="dialog">
              <form onSubmit={handleEdit} className="flex flex-col gap-4">
                <FormInput
                  variant="standard"
                  label="Store Name"
                  color="deep-purple"
                  name="storeName"
                  value={storeNameValue}
                  onChange={(e) => setStoreName(e.target.value)}
                />
                <FormInput
                  variant="standard"
                  label="Location"
                  color="deep-purple"
                  name="location"
                  value={locationValue}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="divider m-0"></div>
                <div className="flex justify-end">
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpenEdit}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" type="submit">
                    <span>Save</span>
                  </Button>
                </div>
              </form>
            </DialogBody>
          </Dialog>
          <Dialog
            open={openDelete}
            handler={handleOpenDelete}
            className="dialog"
          >
            <DialogHeader className="dialog">
              Delete store: {storeNameValue}
            </DialogHeader>
            <div className="divider m-0"></div>
            <DialogBody className="dialog">
              <form onSubmit={handleDelete} className="flex flex-col gap-4">
                <h3>Are you sure you want to delete this store?</h3>
                <div className="divider m-0"></div>
                <div className="flex justify-end">
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpenDelete}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="red" type="submit">
                    <span>Yes</span>
                  </Button>
                </div>
              </form>
            </DialogBody>
          </Dialog>
        </div>
      </AccordionBody>
    </Accordion>
  );
}
