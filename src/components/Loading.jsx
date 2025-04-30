import Lottie from "lottie-react";
import loadingMovie from "../assets/loadingAnimation/loadingMovie2.json";
import noData from "../assets/loadingAnimation/noData.json";
import pageNotFound from "../assets/loadingAnimation/pageNotFound.json";
import { LoadingStatus } from "../assets/constant/loadingConst.js";

const Loading = ({ status }) => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-black z-50 fixed text-white">
      {status === LoadingStatus.LOADING && (
        <Lottie animationData={loadingMovie} className="w-2/5" />
      )}
      {status === LoadingStatus.NO_DATA && (
        <Lottie animationData={noData} className="w-2/5" />
      )}
      {status === LoadingStatus.PAGE_NOT_FOUND && (
        <Lottie animationData={pageNotFound} className="w-2/5" />
      )}
      <p className=" text-2xl font-bold mt-4">
        {status === LoadingStatus.LOADING
          ? "Loading movie..."
          : status === LoadingStatus.NO_DATA
          ? "No data available"
          : status === LoadingStatus.PAGE_NOT_FOUND
          ? "Page not found"
          : "Unknown status"}
      </p>

      {status === LoadingStatus.PAGE_NOT_FOUND && (
        <button className="mt-4 px-4 py-2 rounded-lg border-2 transition duration-300" 
                onClick={() => window.location.href = '/'}>Go to Home</button>
      )}
    </div>
  );
};

export default Loading;
