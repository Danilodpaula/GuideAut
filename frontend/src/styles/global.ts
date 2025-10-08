import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
  }

  html, body, input, label, h1, button, ::placeholder {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    image-rendering: optimizeQuality; 
    image-rendering: -webkit-optimize-contrast; 
  }

  body {
    background: #F0F2F5;
  }

  img {
    image-rendering: optimizeQuality;
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: bicubic; 
    backface-visibility: hidden;
  }

  svg {
    shape-rendering: geometricPrecision;
    text-rendering: optimizeLegibility;
  }
`;
