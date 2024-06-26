import Link from "next/link";

export const Twitter = () => {
  return (
    <Link href={""}>
      <svg
        className="w-8 md:w-9 fill-base-content opacity-100 saturate-100 contrast-100 duration-100 cursor-pointer"
        viewBox="0 0 252 252"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_177_29)">
          <path
            d="M126 250.793C195.036 250.793 251 194.875 251 125.897C251 56.9181 195.036 1 126 1C56.9644 1 1 56.9181 1 125.897C1 194.875 56.9644 250.793 126 250.793Z"
            fill="black"
            stroke="white"
            strokeMiterlimit="10"
          ></path>
          <path
            d="M48.9999 53.5352L108.748 133.357L48.6233 198.256H62.1561L114.797 141.435L157.327 198.256H203.377L140.265 113.945L196.23 53.5352H182.697L134.219 105.865L95.0494 53.5352H48.9999ZM68.9004 63.4941H90.0554L183.474 188.297H162.319L68.9004 63.4941Z"
            fill="white"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_177_29">
            <rect width="252" height="252" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
};
