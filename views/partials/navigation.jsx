import React from 'react'

const styles = {
  'start': {
    stopColor: '#17011e',
    stopOpacity: 1
  },
  'stop': {
    stopColor: '#423158',
    stopOpacity: 1
  }
}

var Navigation = React.createClass({
  render: function() {
    return (
      <nav className="topbar">
        <div className="global-nav">
          <div className="container">

          </div>
          <svg version="1.0" viewBox="0 0 360 406" preserveAspectRatio="xMidYMid meet" className="octopus">
            <metadata>Designed by nb</metadata>
            <defs>
              <linearGradient id="oct-grad" x1="50%" y1="30%" x2="120%" y2="100%">
                <stop offset="0%" style={styles.start}></stop>
                <stop offset="100%" style={styles.stop}></stop>
              </linearGradient>
            </defs>
            <g className="svg-content" fill="url(#oct-grad)">
              <path d="M1770 3724 c-221 -43 -383 -125 -526 -268 -162 -162 -260 -368 -301 -631 -20 -134 -13 -394 17 -560 l21 -120 -33 -25 c-165 -127 -253 -232 -333 -395 -116 -236 -140 -466 -75 -705 41 -147 132 -291 239 -377 68 -55 211 -124 306 -149 101 -27 360 -27 465 0 162 42 260 95 367 202 55 54 73 65 135 84 88 26 213 84 288 132 31 20 110 80 175 133 66 54 138 106 160 116 59 27 124 25 171 -7 44 -30 55 -43 85 -99 l21 -40 -6 54 c-8 75 -49 156 -98 191 -111 81 -260 54 -485 -86 -92 -57 -205 -109 -264 -121 l-47 -10 -6 40 c-9 53 -76 122 -129 132 -45 9 -97 0 -123 -21 -18 -15 -18 -15 3 -9 53 14 127 -52 135 -120 l3 -30 -50 3 c-198 12 -422 135 -550 302 -40 52 -95 149 -95 168 0 5 21 -11 47 -35 102 -96 221 -139 359 -130 147 9 221 55 339 212 45 62 96 122 112 134 99 79 247 65 310 -28 18 -26 23 -48 23 -95 0 -69 -13 -100 -53 -130 -36 -27 -94 -25 -143 3 l-36 22 6 -27 c11 -44 36 -72 83 -95 37 -18 55 -21 106 -15 165 17 275 139 285 316 16 274 -185 469 -483 470 -149 0 -268 -41 -399 -139 -38 -28 -79 -51 -92 -51 -51 0 -83 69 -48 104 17 18 15 17 169 46 365 66 631 218 782 444 148 220 177 550 68 779 -62 132 -191 262 -335 337 -123 64 -239 91 -405 95 -77 2 -151 1 -165 -1z m-765 -2637 c103 -155 274 -261 540 -334 22 -6 5 -9 -67 -11 -280 -8 -465 131 -523 393 -7 35 -3 31 50 -48z"/>
            </g>
          </svg>
        </div>
      </nav>
    )
  }
})

module.exports = Navigation
