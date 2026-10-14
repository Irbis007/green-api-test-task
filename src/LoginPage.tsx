import { useState } from "react";
import { useInstanceStore } from "./model/store/instanceStore";

export const LoginPage = () => {
  const [preIdInstance, setPreIdInstance] = useState("");
  const [preApiTokenInstance, setPreApiTokenInstance] = useState("");

  const setApiTokenInstance = useInstanceStore(
    (state) => state.setApiTokenInstance,
  );
  const setIdInstance = useInstanceStore((state) => state.setIdInstance);

  const [isError, setIsError] = useState(false);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-100 bg-gray-700 text-white border border-zinc-600 rounded-2xl p-2">
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!preIdInstance || !preApiTokenInstance) {
              setIsError(true);
            } else {
              setIdInstance(preIdInstance);
              setApiTokenInstance(preApiTokenInstance);
            }
          }}
        >
          {isError && (
            <div className="text-sm text-red-400 text-center">
              Both field are required
            </div>
          )}
          <label className="text-sm" htmlFor="idInstance">
            idInstance
          </label>
          <input
            className="w-full h-10 border border-zinc-600 rounded-xl px-2"
            type="text"
            id="idInstance"
            value={preIdInstance}
            placeholder="Enter value..."
            onChange={(e) => setPreIdInstance(e.target.value)}
          />
          <label className="mt-2 text-sm" htmlFor="apiTokenInstance">
            apiTokenInstance
          </label>
          <input
            className="w-full h-10 border border-zinc-600 rounded-xl px-2"
            type="text"
            id="apiTokenInstance"
            value={preApiTokenInstance}
            placeholder="Enter value..."
            onChange={(e) => setPreApiTokenInstance(e.target.value)}
          />
          <button className="w-full h-10 rounded-lg bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
