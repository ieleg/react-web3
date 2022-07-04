import { useCoffee } from "./useCoffee";
import dayjs from "dayjs";
export default function Coffee() {
  const {
    withdraw,
    connectWallet,
    buyCoffee,
    currentAccount,
    setName,
    setMessage,
    memos,
  } = useCoffee();
  return (
    <div className=" p-8">
      <main className="">
        <h1 className=" text-4xl font-bold text-center">Buy a Coffee!</h1>

        {currentAccount ? (
          <div>
            <form className="flex items-center flex-col my-3">
              <div>
                <label>Name</label>
                <br />

                <input
                  id="name"
                  type="text"
                  placeholder="anon"
                  className="rounded-sm p-1 shadow-[0_0_0_1px]  shadow-main-3 duration-500 hover:shadow-main-2 focus:shadow-main-1"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>Send Albert a message</label>
                <br />
                <textarea
                  rows={3}
                  placeholder="Enjoy your coffee!"
                  id="message"
                  className=" h-14 resize-none rounded-sm p-1 shadow-[0_0_0_1px]  shadow-main-3 duration-500 hover:shadow-main-2 focus:shadow-main-1"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex items-end justify-end space-x-4 my-4">
                <button
                  type="button"
                  className=" rounded-md border-2 border-main-4 p-2 text-main-1 duration-300 hover:border-main-3"
                  onClick={() => buyCoffee(0.001)}
                >
                  1CUP
                </button>
                <button
                  type="button"
                  className="rounded-md border-2 border-main-4 p-2 duration-300 hover:border-main-3"
                  onClick={() => buyCoffee(0.002)}
                >
                  2CUP
                </button>
                <button
                  type="button"
                  className="rounded-md border-2 border-main-4 p-2 duration-300 hover:border-main-3"
                  onClick={() => buyCoffee(100)}
                >
                  100CUP
                </button>
                <button
                  type="button"
                  className="rounded-md border-2 border-red-2 p-2 duration-300 hover:border-red-1"
                  onClick={withdraw}
                >
                  withdraw
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            className="rounded-md border-2 border-main-4 p-2 duration-300 hover:border-main-3 text-center w-full my-2 mx-auto"
            onClick={connectWallet}
          >
            {" "}
            Connect your wallet{" "}
          </button>
        )}
      </main>
      <div className="grid  auto-rows-[20px] gap-3 grid-cols-[repeat(auto-fill_,_minmax(250px,_1fr))]	">
        {memos
          .map((memo, idx) => {
            return (
              <figure
                key={idx}
                className={`relative flex  flex-col-reverse rounded-lg bg-main-6 p-6 text-sm leading-6 ${
                  memo.message.length > 20
                    ? "row-[auto/span_12]"
                    : "row-[auto/span_6]"
                }`}
              >
                <blockquote className="text-slate-700 dark:text-slate-300 mt-6">
                  "{memo.message}"
                </blockquote>

                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-3">
                    {" "}
                    {memo.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="inline-block flex-auto">
                    <div className="text-slate-900 dark:text-slate-300 text-base font-semibold">
                      {memo.name}
                    </div>
                    <div className="mt-0.5">
                      {dayjs
                        .unix(memo.timestamp.toString())
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                  </div>
                </div>
              </figure>
            );
          })}
      </div>
      <footer className=" text-text-4 text-center mt-3 text-sm">
        <a
          href="https://alchemy.com/?a=roadtoweb3weektwo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by @thatguyintech for Alchemy's Road to Web3 lesson two!
        </a>
      </footer>
    </div>
  );
}
