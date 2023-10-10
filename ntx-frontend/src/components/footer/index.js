import React from 'react'
const Footer = () => {
  return (
    <>
      <footer class='footer'>
        <div class='footer__address'>
          <h1 class='footer__address__logo'> NTX LIMO</h1>
          <h2>Contact</h2>
          Kathmandu, Nepal
          <br />
          9867088000
        </div>

        <ul class='footer__nav '>
          <li class=' footer__nav__item'>
            <h2 class=' footer__nav__item__title'>Branches</h2>

            <ul class=' footer__nav__item__ul'>
              <li>
                <a href='#'>USA</a>
              </li>

              <li>
                <a href='#'>Canada</a>
              </li>

              <li>
                <a href='#'>China</a>
              </li>
            </ul>
          </li>

          <li class='footer__nav__item '>
            <h2 class='footer__nav__item__title'>Categories</h2>

            <ul class=' footer__nav__item__ul '>
              <li>
                <a href='#'>Corporate Travel </a>
              </li>

              <li>
                <a href='#'> Airport Transportation</a>
              </li>

              <li>
                <a href='#'>Medical Transportation</a>
              </li>
            </ul>
          </li>

          <li class='footer__nav__item'>
            <h2 class=' footer__nav__item__title'>Durations</h2>

            <ul class=' footer__nav__item__ul'>
              <li>
                <a href='#'>Hour</a>
              </li>

              <li>
                <a href='#'>Day</a>
              </li>

              <li>
                <a href='#'>Week</a>
              </li>
            </ul>
          </li>
        </ul>

        <div class=' footer__legal'>
          <div class=' footer__legal__links'>
            &copy; 2023 All rights reserved NTX LIMO
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
