import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block;
}
body{
  height: 100%;
  overflow:hidden;
}
#root{
  height: 100%;
   overflow:hidden;
}
html {
  text-size-adjust: 100%;
  box-sizing: border-box;
  font-family: Open Sans , 'HelveticaNeue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  height: 100%;
  overflow:hidden;
}
a {
  text-decoration: none;
  cursor: pointer;
}
button {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  &:disabled{
    cursor: not-allowed;
  }
}
  *, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  
}
`;
