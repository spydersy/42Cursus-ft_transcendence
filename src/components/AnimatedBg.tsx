import React from 'react'
import styled, { keyframes } from "styled-components";

export default  function AnimatedBg() {
    return (
      <Wrapper>
        <svg
          className="lines"
          width="1363"
          height="921"
          viewBox="0 0 1363 921"
          fill="none"
        >
          <path id="line1" d="M1 921V789M73 921V575" stroke="#3CE5FC" />
          <path
            id="line2"
            d="M37 921V875L93.5 818.5M123 752V408"
            stroke="#3CE5FC"
          />
          <path
            id="line3"
            d="M303.5 921V661.5L143 501V344.5M143 193V136.5"
            stroke="#3CE5FC"
          />
          <path
            id="line4"
            d="M277 921L194.5 837.5V642.5L284.5 552.5V507M284.5 426.5V277L225 217.5V0.5"
            stroke="#3CE5FC"
          />
          <path
            id="line5"
            d="M327 921V785L383.5 728.5V662.5M383.5 549.5V457.5L315 389V113.5"
            stroke="#3CE5FC"
          />
          <path id="line6" d="M509 921V823L450 764V403" stroke="#3CE5FC" />
          <path
            id="line7"
            d="M653 921.5V724M576.5 584.5L493.5 501.5V135"
            stroke="#3CE5FC"
          />
          <path
            id="line8"
            d="M581 921V675L523 617V311L564 270V23"
            stroke="#3CE5FC"
          />
          <path
            id="line9"
            d="M503.5 921V778L597 684.5M666.5 494.5V363"
            stroke="#3CE5FC"
          />
          <path
            id="line10"
            d="M791.5 921V714.5L731 654M701.5 492.5V133"
            stroke="#3CE5FC"
          />
          <path id="line11" d="M703 920.5V732M786 536.5V201.5" stroke="#3CE5FC" />
          <path id="line12" d="M870 513V874L917 921" stroke="#3CE5FC" />
          <path
            id="line13"
            d="M852 921V805L932.5 724.5V478L869 414.5V381.5M869 230V49"
            stroke="#3CE5FC"
          />
          <path
            id="line14"
            d="M1111 922.5V771.5L1056 716.5M994 654.5L991 651.5V276.5"
            stroke="#3CE5FC"
          />
          <path
            id="line15"
            d="M901.5 920.5L1023 799V731.5M1023 643V396"
            stroke="#3CE5FC"
          />
          <path
            id="line16"
            d="M955 921V788L1012.5 730.5M1067 675L1082 660V218"
            stroke="#3CE5FC"
          />
          <path id="line17" d="M1253 921V815L1145 707V351" stroke="#3CE5FC" />
          <path
            id="line8"
            d="M1183.5 921V842L1241.5 784V486L1183 427.5V295.5M1183 214V102.5"
            stroke="#3CE5FC"
          />
          <path
            id="line19"
            d="M1362 921V787L1303 728V632.5M1303 507V407.5"
            stroke="#3CE5FC"
          />
        </svg>
  
        <svg
          className="ring1"
          width="159"
          height="159"
          viewBox="0 0 159 159"
          fill="none"
        >
          <path
            id="ring1"
            d="M112.776 100.784C108.624 107.274 102.665 112.409 95.6317 115.556C88.5986 118.702 80.7988 119.723 73.1928 118.493C65.5868 117.263 58.5067 113.835 52.8242 108.632C47.1418 103.428 43.1052 96.6766 41.2116 89.2081C39.3179 81.7395 39.6499 73.8802 42.1665 66.598C44.6832 59.3157 49.2747 52.9285 55.3757 48.2228C61.4766 43.5171 68.8206 40.6984 76.5032 40.1138C84.1859 39.5293 91.8718 41.2044 98.6145 44.9329L90.218 60.1172C86.4372 58.0266 82.1275 57.0873 77.8196 57.4151C73.5118 57.7429 69.3938 59.3234 65.9728 61.962C62.5518 64.6006 59.9773 68.1821 58.5661 72.2655C57.1549 76.3488 56.9688 80.7558 58.0306 84.9436C59.0924 89.1314 61.3559 92.9173 64.5422 95.8349C67.7285 98.7526 71.6985 100.675 75.9634 101.365C80.2283 102.054 84.6018 101.482 88.5455 99.7175C92.4891 97.9531 95.8306 95.0738 98.1585 91.4343L112.776 100.784Z"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <path
            id="ring1"
            d="M51.5693 107.431C57.2956 113.157 64.6437 116.985 72.6181 118.396C80.5925 119.807 88.8079 118.733 96.1515 115.319C103.495 111.905 109.612 106.316 113.673 99.3101C117.735 92.3039 119.545 84.2186 118.858 76.1495C118.171 68.0804 115.02 60.4174 109.833 54.1986C104.646 47.9797 97.6723 43.5055 89.8573 41.3821C82.0424 39.2586 73.7636 39.5885 66.1424 42.3271C58.5213 45.0656 51.926 50.0805 47.25 56.6924L61.4165 66.7112C64.0385 63.0037 67.7366 60.1917 72.01 58.6561C76.2835 57.1205 80.9256 56.9355 85.3076 58.1262C89.6897 59.3169 93.5999 61.8257 96.5085 65.3128C99.4172 68.7999 101.184 73.0967 101.569 77.6213C101.954 82.1459 100.939 86.6795 98.6619 90.608C96.3845 94.5366 92.9547 97.6703 88.837 99.5845C84.7192 101.499 80.1126 102.101 75.6411 101.31C71.1697 100.519 67.0494 98.3725 63.8385 95.1615L51.5693 107.431Z"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <g filter="url(#filter0_f_18_228)">
            <circle
              id="ring1"
              cx="79.5"
              cy="79.5"
              r="33.5"
              stroke="#13AD6D"
              stroke-width="12"
            />
          </g>
          <g filter="url(#filter1_f_18_228)">
            <circle
              id="ring1"
              cx="79.5"
              cy="79.5"
              r="21.0667"
              stroke="#FFF621"
              stroke-width="3"
            />
          </g>
          <circle
            id="ring1"
            cx="79.5"
            cy="79.5"
            r="16.9333"
            stroke="#FCF43C"
            stroke-width="3"
          />
          <defs>
            <filter
              id="filter0_f_18_228"
              x="0"
              y="0"
              width="159"
              height="159"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="20"
                result="effect1_foregroundBlur_18_228"
              />
            </filter>
            <filter
              id="filter1_f_18_228"
              x="46.4"
              y="46.4"
              width="66.2"
              height="66.2"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="5.26667"
                result="effect1_foregroundBlur_18_228"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="ring2"
          width="250"
          height="250"
          viewBox="0 0 250 250"
          fill="none"
        >
          <circle cx="125" cy="125" r="75" stroke="#3CE5FC" stroke-width="3" />
          <path
            id="ring2"
            d="M197.485 105.742C193.875 92.1546 186.519 79.8556 176.256 70.2478C165.993 60.64 153.236 54.1102 139.441 51.4033C125.645 48.6965 111.367 49.9215 98.2339 54.9388C85.1011 59.956 73.6429 68.5634 65.1664 79.779C56.6898 90.9946 51.5363 104.367 50.2936 118.37C49.0509 132.374 51.7691 146.445 58.1381 158.978C64.5072 171.511 74.2706 182.001 86.3146 189.253C98.3586 196.504 112.198 200.225 126.255 199.99L125.719 167.967C117.665 168.102 109.735 165.97 102.834 161.815C95.9332 157.661 90.339 151.65 86.6897 144.469C83.0404 137.287 81.4829 129.225 82.1949 121.201C82.907 113.178 85.8598 105.516 90.7167 99.0894C95.5736 92.6631 102.139 87.7313 109.664 84.8565C117.188 81.9817 125.37 81.2798 133.274 82.8308C141.179 84.3818 148.488 88.1232 154.369 93.6282C160.249 99.1333 164.464 106.18 166.532 113.965L197.485 105.742Z"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <g filter="url(#filter0_f_18_248)">
            <circle
              id="ring2"
              cx="125"
              cy="125"
              r="69"
              stroke="#7419E9"
              stroke-width="12"
            />
          </g>
          <g filter="url(#filter1_f_18_248)">
            <circle
              id="ring2"
              cx="125"
              cy="125"
              r="40"
              stroke="#FF8997"
              stroke-width="3"
            />
          </g>
          <circle
            id="ring2"
            cx="125"
            cy="125"
            r="35"
            stroke="#3CFC89"
            stroke-width="3"
          />
          <defs>
            <filter
              id="filter0_f_18_248"
              x="0"
              y="0"
              width="250"
              height="250"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="25"
                result="effect1_foregroundBlur_18_248"
              />
            </filter>
            <filter
              id="filter1_f_18_248"
              x="63.5"
              y="63.5"
              width="123"
              height="123"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_18_248"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="ring3"
          width="211"
          height="211"
          viewBox="0 0 211 211"
          fill="none"
        >
          <circle
            id="ring3"
            cx="105.5"
            cy="105.5"
            r="55.5"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <path
            id="ring3"
            d="M157.185 125.722C160.51 117.222 161.688 108.034 160.615 98.9701C159.541 89.9065 156.248 81.2476 151.029 73.7604C145.809 66.2732 138.823 60.1888 130.691 56.0462C122.558 51.9035 113.529 49.8305 104.404 50.0108C95.2785 50.1911 86.3385 52.6191 78.3758 57.0797C70.413 61.5403 63.6732 67.8958 58.7534 75.5834C53.8336 83.2709 50.8856 92.0531 50.1706 101.152C49.4556 110.251 50.9956 119.386 54.6542 127.748L74.9314 118.875C72.7318 113.848 71.8059 108.356 72.2358 102.886C72.6657 97.4157 74.438 92.1358 77.3958 87.514C80.3536 82.8923 84.4056 79.0713 89.1929 76.3896C93.9801 73.7079 99.3548 72.2482 104.841 72.1398C110.327 72.0314 115.755 73.2777 120.645 75.7682C125.534 78.2588 129.734 81.9167 132.872 86.4181C136.01 90.9194 137.989 96.1252 138.635 101.574C139.281 107.023 138.572 112.548 136.573 117.658L157.185 125.722Z"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <g filter="url(#filter0_f_18_235)">
            <circle
              id="ring3"
              cx="105.5"
              cy="105.5"
              r="49.5"
              stroke="#7419E9"
              stroke-width="12"
            />
          </g>
          <g filter="url(#filter1_f_18_235)">
            <circle
              id="ring3"
              cx="105.5"
              cy="105.5"
              r="29.6"
              stroke="#FF8997"
              stroke-width="3"
            />
          </g>
          <circle
            id="ring3"
            cx="105.5"
            cy="105.5"
            r="25.9"
            stroke="#3DE4FC"
            stroke-width="3"
          />
          <defs>
            <filter
              id="filter0_f_18_235"
              x="0"
              y="0"
              width="211"
              height="211"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="25"
                result="effect1_foregroundBlur_18_235"
              />
            </filter>
            <filter
              id="filter1_f_18_235"
              x="59.6"
              y="59.6"
              width="91.8"
              height="91.8"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="7.4"
                result="effect1_foregroundBlur_18_235"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="ring4"
          width="340"
          height="340"
          viewBox="0 0 340 340"
          fill="none"
        >
          <path
            id="ring4"
            d="M275.088 227.936C289.064 202.586 293.405 173.038 287.311 144.739C281.218 116.441 265.1 91.2985 241.929 73.9471C218.759 56.5957 190.097 48.2049 161.227 50.3211C132.357 52.4374 105.225 64.9181 84.8327 85.4628C64.44 106.008 52.1611 133.231 50.2593 162.116C48.3574 191.001 56.9609 219.6 74.4839 242.641C92.0068 265.682 117.268 281.612 145.611 287.495C173.954 293.379 203.469 288.818 228.714 274.655L203.642 229.965C189.177 238.08 172.266 240.693 156.026 237.322C139.786 233.951 125.312 224.824 115.271 211.621C105.231 198.419 100.302 182.033 101.391 165.483C102.481 148.932 109.517 133.334 121.201 121.562C132.886 109.79 148.432 102.639 164.973 101.427C181.515 100.214 197.938 105.022 211.214 114.964C224.49 124.906 233.725 139.312 237.217 155.526C240.708 171.741 238.221 188.671 230.213 203.196L275.088 227.936Z"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <g filter="url(#filter0_f_18_222)">
            <circle
              id="ring4"
              cx="170"
              cy="170"
              r="114"
              stroke="#7419E9"
              stroke-width="12"
            />
          </g>
          <g filter="url(#filter1_f_18_222)">
            <circle
              id="ring4"
              cx="170"
              cy="170"
              r="64"
              stroke="#FF8997"
              stroke-width="8"
            />
          </g>
          <circle
            id="ring4"
            cx="170"
            cy="170"
            r="56"
            stroke="#EC3CFC"
            stroke-width="3"
          />
          <defs>
            <filter
              id="filter0_f_18_222"
              x="0"
              y="0"
              width="340"
              height="340"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="25"
                result="effect1_foregroundBlur_18_222"
              />
            </filter>
            <filter
              id="filter1_f_18_222"
              x="70"
              y="70"
              width="200"
              height="200"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="16"
                result="effect1_foregroundBlur_18_222"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="ring5"
          width="250"
          height="250"
          viewBox="0 0 250 250"
          fill="none"
        >
          <circle
            id="ring5"
            cx="125"
            cy="125"
            r="75"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <path
            id="ring5"
            d="M71.967 71.967C64.6881 79.2458 58.9856 87.9452 55.2144 97.5233C51.4432 107.101 49.684 117.353 50.0465 127.641C50.409 137.928 52.8853 148.031 57.3213 157.32C61.7572 166.609 68.0579 174.885 75.831 181.634C83.6041 188.382 92.6832 193.459 102.503 196.546C112.323 199.634 122.673 200.667 132.91 199.582C143.146 198.496 153.049 195.315 162.003 190.236C170.957 185.157 178.769 178.29 184.954 170.061L161.045 152.091C157.326 157.038 152.629 161.167 147.246 164.22C141.863 167.274 135.909 169.186 129.755 169.839C123.601 170.491 117.378 169.87 111.475 168.014C105.571 166.157 100.113 163.106 95.4395 159.048C90.7663 154.991 86.9783 150.015 84.3114 144.431C81.6445 138.846 80.1557 132.773 79.9378 126.588C79.7199 120.403 80.7775 114.239 83.0447 108.481C85.312 102.723 88.7404 97.4925 93.1164 93.1164L71.967 71.967Z"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <g filter="url(#filter0_f_18_198)">
            <mask id="path-3-inside-1_18_198" fill="white">
              <path
                id="ring5"
                d="M200 125C200 140.698 195.075 155.999 185.918 168.749C176.761 181.5 163.835 191.055 148.96 196.07C134.085 201.085 118.011 201.306 103.004 196.702C87.9967 192.098 74.8123 182.902 65.3083 170.408C55.8044 157.915 50.4601 142.754 50.0284 127.063C49.5967 111.371 54.0994 95.9395 62.9021 82.9424C71.7047 69.9452 84.3636 60.0377 99.095 54.6158C113.826 49.1939 129.888 48.5309 145.016 52.7202L125 125H200Z"
              />
            </mask>
            <path
              id="ring5"
              d="M200 125C200 140.698 195.075 155.999 185.918 168.749C176.761 181.5 163.835 191.055 148.96 196.07C134.085 201.085 118.011 201.306 103.004 196.702C87.9967 192.098 74.8123 182.902 65.3083 170.408C55.8044 157.915 50.4601 142.754 50.0284 127.063C49.5967 111.371 54.0994 95.9395 62.9021 82.9424C71.7047 69.9452 84.3636 60.0377 99.095 54.6158C113.826 49.1939 129.888 48.5309 145.016 52.7202L125 125H200Z"
              stroke="#7419E9"
              stroke-width="24"
              mask="url(#path-3-inside-1_18_198)"
            />
          </g>
          <g filter="url(#filter1_f_18_198)">
            <circle cx="125" cy="125" r="40" stroke="#FF8997" stroke-width="3" />
          </g>
          <circle cx="125" cy="125" r="35" stroke="#3DE4FC" stroke-width="3" />
          <defs>
            <filter
              id="filter0_f_18_198"
              x="0"
              y="0"
              width="250"
              height="250"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="25"
                result="effect1_foregroundBlur_18_198"
              />
            </filter>
            <filter
              id="filter1_f_18_198"
              x="63.5"
              y="63.5"
              width="123"
              height="123"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_18_198"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="ring6"
          width="197"
          height="205"
          viewBox="0 0 197 205"
          fill="none"
        >
          <path
            id="ring6"
            d="M58.3058 146.694C67.3665 155.755 78.9932 161.812 91.611 164.044C104.229 166.277 117.228 164.577 128.847 159.175C140.467 153.773 150.145 144.931 156.572 133.845C162.998 122.759 165.862 109.966 164.775 97.1986C163.688 84.431 158.703 72.3061 150.495 62.4661C142.287 52.6261 131.254 45.5467 118.888 42.1868C106.523 38.8269 93.4235 39.3489 81.3646 43.6821C69.3058 48.0153 58.8702 55.9502 51.4715 66.4121L71.9476 80.893C76.3775 74.6292 82.6256 69.8783 89.8456 67.2839C97.0656 64.6895 104.909 64.3769 112.312 66.3886C119.716 68.4003 126.322 72.6389 131.236 78.5304C136.15 84.4219 139.135 91.6815 139.786 99.3259C140.437 106.97 138.722 114.63 134.874 121.267C131.027 127.905 125.232 133.199 118.275 136.433C111.318 139.667 103.535 140.685 95.9804 139.348C88.4257 138.012 81.4645 134.385 76.0396 128.96L58.3058 146.694Z"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <g filter="url(#filter0_f_18_242)">
            <circle
              id="ring6"
              cx="102.5"
              cy="102.5"
              r="56.5"
              stroke="#13AD6D"
              stroke-width="12"
            />
          </g>
          <g filter="url(#filter1_f_18_242)">
            <circle
              id="ring6"
              cx="102.5"
              cy="102.5"
              r="33.3333"
              stroke="#FFF621"
              stroke-width="3"
            />
          </g>
          <circle
            id="ring6"
            cx="102.5"
            cy="102.5"
            r="29.1667"
            stroke="#FCF43C"
            stroke-width="3"
          />
          <defs>
            <filter
              id="filter0_f_18_242"
              x="0"
              y="0"
              width="205"
              height="205"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="20"
                result="effect1_foregroundBlur_18_242"
              />
            </filter>
            <filter
              id="filter1_f_18_242"
              x="51.0001"
              y="51"
              width="103"
              height="103"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="8.33333"
                result="effect1_foregroundBlur_18_242"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="stroke1"
          width="105"
          height="105"
          viewBox="0 0 105 105"
          fill="none"
        >
          <circle
            id="stroke1"
            cx="52.5"
            cy="52.5"
            r="39.5"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <g filter="url(#filter0_f_18_216)">
            <circle
              id="stroke1"
              cx="52.5"
              cy="52.5"
              r="39.5"
              stroke="#3CE5FC"
              stroke-width="3"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_18_216"
              x="0.966667"
              y="0.966667"
              width="103.067"
              height="103.067"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="5.26667"
                result="effect1_foregroundBlur_18_216"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="stroke2"
          width="115"
          height="115"
          viewBox="0 0 115 115"
          fill="none"
        >
          <circle
            id="stroke2"
            cx="57.5"
            cy="57.5"
            r="43.5"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <g filter="url(#filter0_f_18_210)">
            <circle
              id="stroke2"
              cx="57.5"
              cy="57.5"
              r="43.5"
              stroke="#3CE5FC"
              stroke-width="3"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_18_210"
              x="0.900001"
              y="0.900001"
              width="113.2"
              height="113.2"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="5.8"
                result="effect1_foregroundBlur_18_210"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="stroke3"
          width="105"
          height="105"
          viewBox="0 0 105 105"
          fill="none"
        >
          <circle
            id="stroke3"
            cx="52.5"
            cy="52.5"
            r="39.5"
            stroke="#3CE5FC"
            stroke-width="3"
          />
          <g filter="url(#filter0_f_18_254)">
            <circle
              id="stroke3"
              cx="52.5"
              cy="52.5"
              r="39.5"
              stroke="#3CE5FC"
              stroke-width="3"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_18_254"
              x="0.966667"
              y="0.966667"
              width="103.067"
              height="103.067"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="5.26667"
                result="effect1_foregroundBlur_18_254"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="circle1"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle2"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle3"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle4"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle5"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle6"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle7"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle8"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle9"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle10"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle11"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle12"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle13"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="circle14"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle id="circle" cx="31" cy="31" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_273)">
            <circle
              id="circle"
              cx="31"
              cy="31"
              r="11"
              fill="#3CE5FC"
              fill-opacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_19_273"
              x="0"
              y="0"
              width="62"
              height="62"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10"
                result="effect1_foregroundBlur_19_273"
              />
            </filter>
          </defs>
        </svg>
  
        <svg
          className="mcircle1"
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
        >
          <circle id="mcircle1" cx="51" cy="51" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_300)">
            <circle
              id="mcircle1"
              cx="51"
              cy="51"
              r="21"
              fill="#3CE5FC"
              fill-opacity="0.7"
            />
          </g>
          <circle id="mcircle1" cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          <g filter="url(#filter1_f_19_300)">
            <circle cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          </g>
          <defs>
            <filter
              id="filter0_f_19_300"
              x="0"
              y="0"
              width="102"
              height="102"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="15"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
            <filter
              id="filter1_f_19_300"
              x="34"
              y="34"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="mcircle2"
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
        >
          <circle id="mcircle1" cx="51" cy="51" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_300)">
            <circle
              id="mcircle1"
              cx="51"
              cy="51"
              r="21"
              fill="#3CE5FC"
              fill-opacity="0.7"
            />
          </g>
          <circle id="mcircle1" cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          <g filter="url(#filter1_f_19_300)">
            <circle cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          </g>
          <defs>
            <filter
              id="filter0_f_19_300"
              x="0"
              y="0"
              width="102"
              height="102"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="15"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
            <filter
              id="filter1_f_19_300"
              x="34"
              y="34"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="mcircle3"
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
        >
          <circle id="mcircle1" cx="51" cy="51" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_300)">
            <circle
              id="mcircle1"
              cx="51"
              cy="51"
              r="21"
              fill="#3CE5FC"
              fill-opacity="0.7"
            />
          </g>
          <circle id="mcircle1" cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          <g filter="url(#filter1_f_19_300)">
            <circle cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          </g>
          <defs>
            <filter
              id="filter0_f_19_300"
              x="0"
              y="0"
              width="102"
              height="102"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="15"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
            <filter
              id="filter1_f_19_300"
              x="34"
              y="34"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="mcircle4"
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
        >
          <circle id="mcircle1" cx="51" cy="51" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_300)">
            <circle
              id="mcircle1"
              cx="51"
              cy="51"
              r="21"
              fill="#3CE5FC"
              fill-opacity="0.7"
            />
          </g>
          <circle id="mcircle1" cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          <g filter="url(#filter1_f_19_300)">
            <circle cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          </g>
          <defs>
            <filter
              id="filter0_f_19_300"
              x="0"
              y="0"
              width="102"
              height="102"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="15"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
            <filter
              id="filter1_f_19_300"
              x="34"
              y="34"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="mcircle5"
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
        >
          <circle id="mcircle1" cx="51" cy="51" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_300)">
            <circle
              id="mcircle1"
              cx="51"
              cy="51"
              r="21"
              fill="#3CE5FC"
              fill-opacity="0.7"
            />
          </g>
          <circle id="mcircle1" cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          <g filter="url(#filter1_f_19_300)">
            <circle cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          </g>
          <defs>
            <filter
              id="filter0_f_19_300"
              x="0"
              y="0"
              width="102"
              height="102"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="15"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
            <filter
              id="filter1_f_19_300"
              x="34"
              y="34"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="mcircle6"
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
        >
          <circle id="mcircle1" cx="51" cy="51" r="6" fill="#37C9E9" />
          <g filter="url(#filter0_f_19_300)">
            <circle
              id="mcircle1"
              cx="51"
              cy="51"
              r="21"
              fill="#3CE5FC"
              fill-opacity="0.7"
            />
          </g>
          <circle id="mcircle1" cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          <g filter="url(#filter1_f_19_300)">
            <circle cx="51" cy="51" r="12.5" stroke="#3CE5FC" />
          </g>
          <defs>
            <filter
              id="filter0_f_19_300"
              x="0"
              y="0"
              width="102"
              height="102"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="15"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
            <filter
              id="filter1_f_19_300"
              x="34"
              y="34"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_19_300"
              />
            </filter>
          </defs>
        </svg>
      </Wrapper>
    );
  }
  
  const dash = keyframes`
    from { stroke-dashoffset: 2000;
    }
    to {
      stroke-dashoffset: 0;
    }
  `;
  
  // const dash2 = keyframes`
  //   0% { stroke-dashoffset: 2000;
  //         opacity: 0;
  //   }
  //   to {
  //     stroke-dashoffset: 0;
  //   }
  // `;
  
  const fadein = keyframes`
    from {opacity: 0;}
    to { opacity: 1;}
  `;
  
  const Wrapper = styled.div`
    position: relative;
    width: 150%;
    height: 150%;
    margin: 0 auto;
  
    background: radial-gradient(
      50% 45.31% at 50% 65.43%,
      #1f1688 0%,
      #070146 100%
    );
  
    #line1,
    #line2,
    #line3,
    #line4,
    #line5,
    #line6,
    #line7,
    #line8,
    #line9,
    #line10,
    #line11,
    #line12,
    #line13,
    #line14,
    #line15,
    #line16,
    #line17,
    #stroke1,
    #stroke2,
    #stroke3 {
      stroke-dasharray: 1000;
      stroke-dashoffset: 400;
      animation: ${dash} 3s linear forwards;
    }
  
    .lines {
      position: absolute;
      width: 1361px;
      height: 922px;
      left: 43px;
      top: 103.5px;
    }
    .mcircle6 {
      position: absolute;
      left: 1293px;
      top: 458px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .mcircle5 {
      position: absolute;
      left: 980.5px;
      top: 325px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .mcircle4 {
      position: absolute;
      left: 692px;
      top: 182px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .mcircle3 {
      position: absolute;
      left: 441px;
      top: 451px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .mcircle2 {
      position: absolute;
      left: 306.5px;
      top: 165px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .mcircle1 {
      position: absolute;
      left: 115px;
      top: 456px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle14 {
      position: absolute;
      left: 1194px;
      top: 170px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle13 {
      position: absolute;
      left: 1156px;
      top: 422px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle12 {
      position: absolute;
      left: 1093px;
      top: 286px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle11 {
      position: absolute;
      left: 1033.5px;
      top: 464px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle10 {
      position: absolute;
      left: 880px;
      top: 116px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle9 {
      position: absolute;
      left: 881px;
      top: 584px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    
    .circle8 {
      position: absolute;
      left: 797.5px;
      top: 268px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle7 {
      position: absolute;
      left: 677.5px;
      top: 430px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle6 {
      position: absolute;
      left: 575.5px;
      top: 94px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle5 {
      position: absolute;
      left: 504.5px;
      top: 202px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle4 {
      position: absolute;
      left: 236.5px;
      top: 68px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle3 {
      position: absolute;
      left: 154.5px;
      top: 206px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .circle2 {
      position: absolute;
      left: 84.5px;
      top: 646px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
  
    .circle1 {
      position: absolute;
      left: 13.5px;
      top: 857px;
      opacity: 0;
      animation: ${fadein} 0.5s 3s ease-in-out forwards;
    }
    .stroke3 {
      position: absolute;
      left: 1170px;
      top: 306px;
    }
    .stroke2 {
      position: absolute;
      left: 1008px;
      top: 733px;
    }
    .stroke1 {
      position: absolute;
      left: 273px;
      top: 518px;
    }
    #ring6{
      stroke-dasharray: 1000;
      stroke-dashoffset: 400;
      animation: ${dash} 3s linear forwards;
    }
    #ring5{
      stroke-dasharray: 1000;
      stroke-dashoffset: 400;
      animation: ${dash} 3s linear forwards;
    }
    #ring4{
      stroke-dasharray: 2000;
      stroke-dashoffset: 1000;
      animation: ${dash} 3s linear forwards;
    }
    #ring3{
      stroke-dasharray: 1000;
      stroke-dashoffset: 400;
      animation: ${dash} 3s linear forwards;
    }
    #ring2{
      stroke-dasharray: 1000;
      stroke-dashoffset: 400;
      animation: ${dash} 3s 1s linear forwards;
    }
    #ring1{
      stroke-dasharray: 1000;
      stroke-dashoffset: 400;
      animation: ${dash} 3s 0.3s linear forwards;
    }
    .ring6 {
      position: absolute;
      left: 1240px;
      top: 570px;
    }
    .ring5 {
      position: absolute;
      left: 785px;
      top: 285px;
    }
    .ring4 {
      position: absolute;
      left: 565px;
      top: 545px;
    }
    .ring3 {
      position: absolute;
      left: 320px;
      top: 605px;
    }
    .ring2 {
      position: absolute;
      left: 60px;
      top: 248px;
    }
    .ring1 {
      position: absolute;
      left: 86px;
      top: 814px;
    }
  `;
  