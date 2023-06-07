import Button from "@/components/button";
import Typography from "@/components/typography";
import React from "react";

export default function Header() {
  return (
    <header className="flex flex-row px-8 py-4 justify-between">
      <div className="flex align-center">
        <Typography
          use="div"
          className="!text-light-white flex items-center !font-dm-sans-bold"
          variant="body2"
          label="Fortuna Token"
        />
        <Typography
          variant="body2"
          className="!text-light-white flex items-center ps-4 pr-12 !font-dm-sans-bold"
          label="$0.96"
        />

        <div className="bg-deep-secondary px-[10px] rounded-2xl py-[5px] flex items-center justify-center">
          <svg
            width={24}
            height={24}
            className="mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_126_240"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x={3}
              y={3}
              width={18}
              height={18}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_126_240)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.50447 10.5637L12.0001 7.06824L15.4975 10.5655L17.5315 8.53156L12.0001 3L6.47049 8.52971L8.50447 10.5637ZM5.03414 9.96568L7.06808 11.9996L5.03394 14.0338L3 11.9998L5.03414 9.96568ZM12 16.9316L8.50445 13.4362L6.46749 15.4674L6.47033 15.4703L12 21L17.5315 15.4684L17.5325 15.4673L15.4973 13.4345L12 16.9316ZM21.0002 12.0009L18.9662 14.0349L16.9323 12.001L18.9663 9.96693L21.0002 12.0009ZM14.0639 11.999H14.0631L14.0649 12L14.0639 12.0011L12 14.065L9.93784 12.0029L9.935 12L9.93784 11.997L10.2994 11.6355L10.4745 11.4603H10.4747L12 9.9349L14.0639 11.999Z"
                fill="#F5BC00"
              />
            </g>
          </svg>

          <Typography
            variant="body2"
            className="!font-dm-sans-bold"
            label="BNB Chain"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-10">
          <Typography variant="body2" label="EN/USD" />

          <svg
            width={6}
            height={4}
            viewBox="0 0 6 4"
            fill="none"
            className="ms-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.80474 0.528595C5.54439 0.268246 5.12228 0.268246 4.86193 0.528595L3 2.39052L1.13807 0.528595C0.877722 0.268246 0.455612 0.268246 0.195262 0.528595C-0.0650877 0.788945 -0.0650877 1.21105 0.195262 1.4714L2.5286 3.80474C2.78894 4.06509 3.21105 4.06509 3.4714 3.80474L5.80474 1.4714C6.06509 1.21105 6.06509 0.788945 5.80474 0.528595Z"
              fill="#777E91"
            />
          </svg>
        </div>
        <Button className="font-dm-sans-bold" rounded label="Connect Wallet" />
      </div>
    </header>
  );
}