import SyncLoader from "react-spinners/SyncLoader";

export default function Spinner({ children, loading }) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center justify-center">
        <SyncLoader color="#4F6BB7" loading={loading} />
      </div>
      <div className={`${loading ? "hidden" : "flex"} flex-wrap gap-12`}>
        {children}
      </div>
    </div>
  );
}
