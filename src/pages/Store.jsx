import { Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import defaultStoreImage from "../assets/defaultstore.png";

import PageTitle from "../components/PageTitle";

import StoreService from "../service/StoreService";

import "./css/Store.css";
import Spinner from "../components/Spinner";

export default function Store() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search.slice(1));
  const query = queryParams.get("query");

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  function createStoreElement(store) {
    return (
      <Card className="card w-96">
        <CardHeader color="lightBlue" contentPosition="none">
          <img
            src={defaultStoreImage}
            alt="store"
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {store.storeName}
          </Typography>
        </CardBody>
        <CardFooter
          divider
          className="flex items-center justify-between py-3 gap-2"
        >
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-2 truncate hover:overflow-visible hover:whitespace-normal"
          >
            <FontAwesomeIcon icon={faLocationDot} />
            {store.location}
          </Typography>
          <Link to={`/store/${store.storeId}`}>
            <Button>View Store</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  useEffect(() => {
    const fetchStores = async () => {
      if (query) {
        try {
          const { data } = await StoreService.getStore({ query });
          const stores = data.stores;
          const storesElement = stores.map((store) => {
            return createStoreElement(store);
          });

          setStores(storesElement);
          setLoading(false);
        } catch ({ response }) {
          setStores(
            <h1 className="font-bold text-2xl text-primary text-center">
              No stores found with that query.
              <FontAwesomeIcon icon={faFaceSadCry} className="ml-2" />
            </h1>
          );
          setLoading(false);
        }
      } else {
        try {
          const { data } = await StoreService.getStores();
          const stores = data.stores;
          const storesElement = stores.map((store) => {
            return createStoreElement(store);
          });

          setStores(storesElement);
          setLoading(false);
        } catch ({ response }) {
          setStores(
            <h1 className="font-bold text-2xl text-primary text-center">
              No stores found.
              <FontAwesomeIcon icon={faFaceSadCry} className="ml-2" />
            </h1>
          );
          setLoading(false);
        }
      }
    };

    fetchStores();
  }, [query]);

  return (
    <div>
      <PageTitle title="Stores" />
      <div className="m-4">
        <h2 className={`font-bold text-xl ${!query ? "hidden" : ""}`}>
          Search results for: <span>{query}</span>
        </h2>
        <div className="mt-10 w-full">
          <Spinner loading={loading}>{stores}</Spinner>
        </div>
      </div>
    </div>
  );
}
