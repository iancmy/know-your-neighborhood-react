import "./css/Account.css";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import FormInput from "../components/FormInput";
import defaultUserIcon from "../assets/defaultusericon.jpg";
import UserStoreContainer from "../components/UserStoreContainer";
import StoreService from "../service/StoreService";
import UserService from "../service/UserService";
import ToastProps from "../model/ToastProps";

export default function Account({
  userDetails,
  loginStatus,
  setToasts,
  setUserDetails,
}) {
  const navigate = useNavigate();
  const [openStoreForm, setOpenStoreForm] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [stores, setStores] = useState([]);
  const newStoreRef = useRef();

  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [contactNumberValue, setContactNumberValue] = useState("");

  useEffect(() => {
    setStores(userDetails.stores);
    setFirstNameValue(userDetails.firstName);
    setLastNameValue(userDetails.lastName);
    setEmailValue(userDetails.emailAddress);
    setUsernameValue(userDetails.username);
    setContactNumberValue(userDetails.contactNumber);
  }, [userDetails]);

  const handleOpenStoreForm = () => {
    setOpenStoreForm(!openStoreForm);
  };

  const handleNewStore = async (e) => {
    e.preventDefault();

    const storeName = e.target.storeName.value;
    const location = e.target.location.value;

    const { data } = await StoreService.createStore({
      storeName,
      location,
    });

    if (data.isSuccessful) {
      const {
        data: { stores },
      } = await UserService.getAccount();

      setStores(stores);
      setOpenStoreForm(false);
    }
  };

  const handleOpenEditProfile = () => {
    setOpenEditProfile(!openEditProfile);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const emailAddress = e.target.emailAddress.value;
    const username = e.target.username.value;
    const contactNumber = e.target.contactNumber.value;

    const { data } = await UserService.updateAccount({
      firstName,
      lastName,
      emailAddress,
      username,
      contactNumber,
    });

    if (data.isSuccessful) {
      setOpenEditProfile(false);
      setToasts((prev) => [
        ...prev,
        new ToastProps({
          message: data.successMessage,
        }),
      ]);

      const { data: user } = await UserService.getAccount();

      setUserDetails(user);
    }
  };

  const tabs = [
    {
      label: "Profile",
      value: "profile",
      body: (
        <div className="container flex flex-col gap-4 self-center my-4 px-4 lg:max-w-xl">
          <div className="absolute right-0">
            <IconButton
              color="deep-purple"
              size="lg"
              className="place-self-end"
              variant="text"
              onClick={handleOpenEditProfile}
            >
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex flex-1 items-end gap-4">
              <Avatar
                src={userDetails?.imageUrl || defaultUserIcon}
                alt="avatar"
                size="xxl"
              />

              <p className="font-bold text-4xl flex gap-2">
                <span>{userDetails.firstName}</span>
                <span>{userDetails.lastName}</span>
              </p>
            </div>

            <Dialog
              open={openEditProfile}
              handler={handleOpenEditProfile}
              className="dialog"
            >
              <DialogHeader className="dialog">Edit store</DialogHeader>
              <div className="divider m-0"></div>
              <DialogBody className="dialog">
                <form
                  onSubmit={handleEditProfile}
                  className="flex flex-col gap-4"
                >
                  <FormInput
                    variant="standard"
                    label="First name"
                    color="deep-purple"
                    name="firstName"
                    value={firstNameValue}
                    onChange={(e) => setFirstNameValue(e.target.value)}
                  />
                  <FormInput
                    variant="standard"
                    label="Last name"
                    color="deep-purple"
                    name="lastName"
                    value={lastNameValue}
                    onChange={(e) => setLastNameValue(e.target.value)}
                  />
                  <FormInput
                    variant="standard"
                    label="Email address"
                    color="deep-purple"
                    name="emailAddress"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                  <FormInput
                    variant="standard"
                    label="Username"
                    color="deep-purple"
                    name="username"
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                  />
                  <FormInput
                    variant="standard"
                    label="Contact number"
                    color="deep-purple"
                    name="contactNumber"
                    value={contactNumberValue}
                    onChange={(e) => setContactNumberValue(e.target.value)}
                  />
                  <div className="divider m-0"></div>
                  <div className="flex justify-end">
                    <Button
                      variant="text"
                      color="red"
                      onClick={handleOpenEditProfile}
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
          </div>

          <div className="text-xl">
            <span className="font-bold">Username: </span>
            <span>{userDetails.username || "None"}</span>
          </div>
          <div className="text-xl">
            <span className="font-bold">Email Address: </span>
            <span>{userDetails.emailAddress}</span>
          </div>
          <div className="text-xl">
            <span className="font-bold">Contact Number: </span>
            <span>{userDetails.contactNumber || "None"}</span>
          </div>
        </div>
      ),
    },
    {
      label: "Stores",
      value: "stores",
      body: (
        <div className="flex flex-col justify-end w-full gap-4">
          <Button
            onClick={handleOpenStoreForm}
            variant="gradient"
            color="green"
            className="mb-4"
          >
            <span className="mr-2">New Store</span>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          {stores?.length === 0 ? (
            <h2 className="text-center font-bold text-3xl">
              No stores saved yet!
            </h2>
          ) : (
            <UserStoreContainer
              stores={stores}
              setToasts={setToasts}
              setStores={setStores}
            />
          )}

          <Dialog
            open={openStoreForm}
            handler={handleOpenStoreForm}
            className="dialog"
          >
            <DialogHeader className="dialog">New store</DialogHeader>
            <div className="divider m-0"></div>
            <DialogBody className="dialog">
              <form
                ref={newStoreRef}
                onSubmit={handleNewStore}
                className="flex flex-col gap-4"
              >
                <FormInput
                  variant="standard"
                  label="Store Name"
                  color="deep-purple"
                  name="storeName"
                />
                <FormInput
                  variant="standard"
                  label="Location"
                  color="deep-purple"
                  name="location"
                />
                <div className="divider m-0"></div>
                <div className="flex justify-end">
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpenStoreForm}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" type="submit">
                    <span>Submit</span>
                  </Button>
                </div>
              </form>
            </DialogBody>
          </Dialog>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle title="Account" />
      <Tabs
        id="custom-animation"
        value="profile"
        className="container flex flex-col gap-4 self-center my-4 px-4 lg:max-w-xl"
      >
        <TabsHeader>
          {tabs.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
          className="self-center"
        >
          {tabs.map(({ value, body }) => (
            <TabPanel key={value} value={value}>
              {body}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
