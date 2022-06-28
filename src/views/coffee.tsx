import { useCoffee } from "./useCoffee";
import dayjs from "dayjs";
export default function Coffee() {
  const {
    withdraw,
    connectWallet,
    buyCoffee,
    currentAccount,
    name,
    setName,
    setMessage,
    memos,
  } = useCoffee();
  return (
    <div className=" p-8">
      <main className="">
        <h1 className="">Buy a Coffee!</h1>

        {currentAccount ? (
          <div>
            <form className="">
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
              <div className="flex items-end justify-end space-x-4">
                <button
                  type="button"
                  className="rounded-md border-2 border-main-4 p-2 duration-300 hover:border-main-3"
                  onClick={() => buyCoffee(0.001)}
                >
                  1杯
                </button>
                <button
                  type="button"
                  className="rounded-md border-2 border-main-4 p-2 duration-300 hover:border-main-3"
                  onClick={() => buyCoffee(0.002)}
                >
                  2杯
                </button>
                <button
                  type="button"
                  className="rounded-md border-2 border-main-4 p-2 duration-300 hover:border-main-3"
                  onClick={() => buyCoffee(100)}
                >
                  100杯
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
          <button onClick={connectWallet}> Connect your wallet </button>
        )}
      </main>
      {<h1>Memos received</h1>}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {[0, 1, 2].map((index) => (
          <div className="space-y-8">
            {memos
              .slice(
                (index * memos.length) / 3,
                (memos.length / 3) * (index + 1)
              )
              .map((memo, idx) => {
                return (
                  <figure
                    key={idx}
                    className="relative flex flex-col-reverse rounded-lg bg-main-6 p-6 text-sm leading-6"
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
        ))}
      </div>
      <footer className="">
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
