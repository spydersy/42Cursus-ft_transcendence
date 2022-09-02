
const BaseColor  = {
  black: "#000000",
  white: "#ffffff",
  primary: "#4569FF",
  danger: "#EE4C50",
  overlay: "#18191aeb",
};
export interface ThemeProps {
  colors  :{
    primaryText: string,
    seconderyText: string,
    primarybg: string,
    seconderybg: string,
    bg: string
    green: string,
    border: string,
    danger: string,
    purple: string,

  },
  fontSize  :{
    // primarybg: string,
    xl: string,
    l: string,
    ll: string,
    s: string
  }

  }
  
  export const theme: ThemeProps = {
    colors: {
      primaryText: "#C8D0D9",
      seconderyText: "#EFF6FC",
      primarybg: "#171A22",
      bg: "#0E1117",
      seconderybg: '#171A22',
      green: '#3CC592',
      border: '#2F373F',
      danger: "#F13950",
      purple:'#590696'

    },
    fontSize: {
      xl : "30px",
      ll : "22px",
      l : "17px",
      s : "12px"
    }
    
  };
  