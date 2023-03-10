import { useEffect, useState } from "react";
import UserStore from "./UserStore";

export default function UserStoreContainer({ stores, setToasts, setStores }) {
  const [storesElement, setStoresElement] = useState();

  useEffect(() => {
    setStoresElement(
      stores?.map((store) => (
        <UserStore
          key={store.storeId}
          store={store}
          setToasts={setToasts}
          setStores={setStores}
          storeId={store.storeId}
        />
      ))
    );
  }, [stores]);

  return (
    <div>
      <h1 className="font-bold text-3xl">Store List</h1>
      {storesElement}
    </div>
  );
}
