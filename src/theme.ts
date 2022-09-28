
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
      primaryText: "#FFFFFF",
      seconderyText: "#86888B",
      primarybg: "#171A22",
      bg: "#0E1117",
      seconderybg: '#171A22',
      green: '#3CC592',
      border: '#171A22',
      danger: "#F13950",
      purple:'#157DBD'

    },
    fontSize: {
      xl : "30px",
      ll : "22px",
      l : "20px",
      s : "14px"
    }
    
  };
  