import guestData from "./csvjson1.json";
import logo from "./assets/find-your-seat-new.svg";
import { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [foundGuests, setFoundGuests] = useState([]);

  const searchFn = (searchText) => {
    if (!searchText) {
      setFoundGuests([]);
      return;
    }
    const results = guestData?.filter((guest) => {
      const fullName =
        `${guest["first name"]} ${guest["last name"]}`.toLowerCase();
      return fullName.includes(searchText.toLowerCase());
    });
    setFoundGuests(results);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex flex-col items-center p-6">
        <img src={logo} alt="" className="mx-auto my-4 md:w-1/4" />
        <p className="text-center text-gray-500 m-2 font-semibold">
          Enter your name to find your seat
        </p>
        <div className="flex w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Search by first or last name"
            className="flex-grow p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6e2d4b]"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              searchFn(e.target.value);
            }}
          />
          <button
            onClick={() => searchFn(searchText)}
            className="bg-[#6e2d4b] text-white px-4 rounded-r-lg hover:opacity-90 transition"
          >
            Search
          </button>
        </div>
        <p className="text-center text-gray-500 m-3">
          If you wish to share pictures please upload them{" "}
          <span>
            <a
              href="https://www.dropbox.com/scl/fo/yyk16gtkdnf2w6zn6nbml/ADSm4_der-OIj8aUOejjEYw?rlkey=y74aqvz2qnay6njkw996wnsl8&e=2&st=4vb5ai73&dl=0"
              target="_blank"
              className="text-[#6e2d4b] underline"
            >
              here
            </a>
          </span>
        </p>
        <div className="w-full max-w-md">
          {foundGuests.length === 0 && searchText && (
            <p className="text-center text-gray-500">No guests found</p>
          )}

          <ul className="space-y-3">
            {foundGuests.map((guest, index) => (
              <li
                key={index}
                className="bg-white shadow rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {guest["first name"]} {guest["last name"]}
                  </p>
                  <p className="text-gray-500 text-xl">
                    Table:{" "}
                    {guest["table"] === "n/a"
                      ? "Please contact the event planner"
                      : guest["table"]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col">
        <p className=" text-center text-gray-500">
          Created By <span className="text-[#6e2d4b]">Toba Ojo</span>
        </p>
      </div>
    </div>
  );
}

export default App;
