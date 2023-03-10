import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StoreService from "../service/StoreService";

import PageTitle from "../components/PageTitle";

export default function StoreDetails() {
  // get the id from the url
  const { id } = useParams();
  const [store, setStore] = useState({
    storeName: "",
    location: "",
  });

  useEffect(() => {
    async function getStore() {
      try {
        const { data } = await StoreService.getStore({ storeId: id });

        setStore(data.storeDetails);
      } catch (e) {
        console.log(e);
      }
    }

    getStore();
  }, [id]);

  return (
    <div>
      <PageTitle title="Store Details" />
      <div className="container m-4">
        <h2 className="font-bold text-3xl">{store.storeName}</h2>
        <h3 className="font-bold text-xl">Location: {store.location}</h3>
      </div>
    </div>
  );
}
