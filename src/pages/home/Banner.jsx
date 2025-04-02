import bannerImg from "../../assets/image/banner.png";
const Banner = () => {
  return (
    <div className=" relative bg-black">
      <img className="pt-16 lg:pt-0" src={bannerImg} alt="" />
      {/* Search bar */}
      {/* <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-[87px] lg:top-28 left-1/2">
        <label className="input opacity-70 input-bordered flex items-center gap-2 p-1 lg:p-3 text-sm h-8 lg:h-12">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-3 w-3 lg:h-4 lg:w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div> */}
    </div>
  );
};

export default Banner;
