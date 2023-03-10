import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import UserService from "../../service/UserService";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/logo.png";

import ToastProps from "../../model/ToastProps";

export default function Header({
  loginStatus,
  setLoginStatus,
  setToasts,
  userDetails,
  setUserDetails,
}) {
  const [openNav, setOpenNav] = useState(false);

  const activeStyle = {
    fontWeight: "bold",
    fontSize: "1.05em",
    borderBottom: "0.15em solid #253964",
  };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = e.target.search.value;

    navigate(`/store?query=${query}`);

    e.target.search.value = "";

    setOpenNav(false);
  };

  const handleLogout = async () => {
    try {
      const { data } = await UserService.logout();

      if (data.successful) {
        setLoginStatus(false);
        setToasts((prev) => [
          ...prev,
          new ToastProps({ message: data.message }),
        ]);
        setUserDetails({});

        navigate("/login");
      }
    } catch (e) {
      setLoginStatus(false);
      setToasts((prev) => [
        ...prev,
        new ToastProps({ message: `Something went wrong. Retry logout.` }),
      ]);
    }
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal text-primary"
        onClick={() => setOpenNav(false)}
      >
        <NavLink
          to="/store"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="flex items-center font-medium"
        >
          <span className="flex items-center text-main">Stores</span>
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal text-primary"
        onClick={() => setOpenNav(false)}
      >
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="flex items-center font-medium"
        >
          <span className="flex items-center text-main">About</span>
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal text-primary"
        onClick={() => setOpenNav(false)}
      >
        <NavLink
          to="/contact"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="flex items-center font-medium"
        >
          <span className="flex items-center text-main">Contact</span>
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal text-primary"
        onClick={() => setOpenNav(false)}
      >
        <NavLink
          to="/privacy"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="flex items-center font-medium"
        >
          <span className="flex items-center text-main">Privacy</span>
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="header fixed max-w-full z-50">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="span"
          variant="small"
          className="cursor-pointer font-bold"
        >
          <NavLink
            className="flex flex-row gap-2 justify-center items-center h-10"
            to="/"
          >
            <img src={logo} alt="logo" className="h-full" />
            <div className="flex h-full items-center">
              <span className="text-lg">Know Your Neighborhood</span>
            </div>
          </NavLink>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex gap-2">
          <form className="hidden lg:inline-block" onSubmit={handleSearch}>
            <Input
              label="Search stores"
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              name="search"
            />
          </form>
        </div>
        <div className="flex gap-2 items-center">
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <FontAwesomeIcon icon={faXmark} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="2x" />
            )}
          </IconButton>
          <div className={`gap-2 ${loginStatus ? "hidden" : "flex"}`}>
            <Button
              variant="outlined"
              size="sm"
              color="green"
              className="hidden lg:inline-block"
              onClick={() => navigate("/signup")}
            >
              <span>Sign up</span>
            </Button>
            <Button
              variant="gradient"
              size="sm"
              color="deep-purple"
              className="hidden lg:inline-block"
              onClick={() => navigate("/login")}
            >
              <span>Log in</span>
            </Button>
          </div>
          <div className={loginStatus ? "" : "hidden"}>
            <Menu placement="bottom-end">
              <MenuHandler>
                <div>
                  <IconButton
                    variant="gradient"
                    color="deep-purple"
                    className={`${
                      userDetails?.imageUrl ? "hidden" : ""
                    } text-md rounded-full`}
                    onClick={() => {
                      setOpenNav(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </IconButton>
                  <Avatar
                    src={userDetails?.imageUrl}
                    size="sm"
                    variant="circular"
                    className={`${
                      userDetails?.imageUrl ? "" : "hidden"
                    } cursor-pointer`}
                    onClick={() => {
                      setOpenNav(false);
                    }}
                  />
                </div>
              </MenuHandler>
              <MenuList>
                <Link to="/account">
                  <MenuItem>Account</MenuItem>
                </Link>
                <Link onClick={handleLogout}>
                  <MenuItem>Logout</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          <form className="my-4" onSubmit={handleSearch}>
            <Input
              label="Search stores"
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              name="search"
            />
          </form>
          {navList}
          <div className={`${loginStatus ? "hidden" : "flex"} flex-col gap-2`}>
            <Button
              variant="outlined"
              color="green"
              fullWidth
              onClick={() => {
                navigate("/signup");
                setOpenNav(false);
              }}
            >
              <span>Sign up</span>
            </Button>
            <Button
              variant="gradient"
              color="deep-purple"
              fullWidth
              onClick={() => {
                navigate("/login");
                setOpenNav(false);
              }}
            >
              <span>Log in</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
