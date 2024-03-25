/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        exsm: '0.6rem',
        exl: "60px",
        exphone:'5em',
        extra:"10em"

      },
      width: {
        '10%': '100%',
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
        '60%': '60%',
        '70%': '70%',
        '80%': '80%',
        '90%': '95%',
        '100%': '100% !important',
        '30px': '30px',
        '50px': '50px',
        '100px': '100px',
        "400px":"400px",
        "600px":"600px"
      },
      maxHeight: {
        "50vh":"70vh"
      },
      minHeight: {
        "50vh":"70vh"
      },
      margin:{
        "53px":"53px",
        "25px":"25px"
      },
      right:{
       "70px":" 70px"
      }

    },
  },
  plugins: [],
}
