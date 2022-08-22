
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
    danger: string

  },
  fontSize  :{
    // primarybg: string,
    xl: string,
    l: string,
    s: string
  }

  }
  
  export const theme: ThemeProps = {
    colors: {
      primaryText: "#FFFFFF",
      seconderyText: "#434343",
      primarybg: "#157DBD",
      danger: "#F13950"

    },
    fontSize: {
      xl : "30px",
      l : "17px",
      s : "12px"
    }
    
  };
  