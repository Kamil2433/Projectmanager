/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        navbarcolor:'#BADAFF',
        navbarnotification:'#D9D9D9',
        profileusercolor:'#475569',
        sidebarcolor:'#E9F1FA',
        verylightblue:'#38bdf8',
        createsectiongray:'#EBEEF0BF',
      },
      fontFamily:{
        navbarfont:['Port Lligat Sans'],
        everett:['Everett'],
        nunitosans:['Nunito Sans'],
        merriweather:['Merriweather'],
        inter:['Inter'],
        inika:['Inika'],
        poppins:['Poppins'],
        poly:['Poly'],
      }
    },
  },
  plugins: [],
}


