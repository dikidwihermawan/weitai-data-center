import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="">
      <div className="flex items-center space-x-4 p-4">
        <Link
          to="/colorwindow"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Color Window tersedia
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
