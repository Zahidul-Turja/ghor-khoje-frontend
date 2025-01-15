import {
  Inter,
  Josefin_Sans,
  Poppins,
  Pacifico,
  Dancing_Script,
  Great_Vibes,
  Raleway,
  Cormorant_Garamond,
  Cinzel,
  Caesar_Dressing,
  Uncial_Antiqua,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin",
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Harry Potter
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const caesarDressing = Caesar_Dressing({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"], // Only one weight available
});

export const uncialAntiqua = Uncial_Antiqua({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"], // Only one weight available
});

// Recipe
export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"], // Available weights for Dancing Script
});

export const pacifico = Pacifico({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"], // Pacifico only supports 400 weight
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"], // Great Vibes only supports 400 weight
});

export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"], // Available weights for Raleway
});
