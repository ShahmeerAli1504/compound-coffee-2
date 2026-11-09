import type { StaticImageData } from "next/image";
import compoundCoffeeSubjective from "@/assets/img/compound-coffee-subjective.jpg";
import compoundGraffiti from "@/assets/img/compound-graffiti.jpg";
import eventsFlyer from "@/assets/img/events-flyer.jpg";
import truckBagmanMural from "@/assets/img/truck-bagman-mural.jpg";
import trailerRenoSkyline from "@/assets/img/trailer-reno-skyline.jpg";
import trailerBackDoor from "@/assets/img/trailer-back-door.jpg";
import trailerGraffitiBoard from "@/assets/img/trailer-graffiti-board.jpg";
import trailerServiceNight from "@/assets/img/trailer-service-night.jpg";
import icedLattePour from "@/assets/img/iced-latte-pour.jpg";
import icedLatte from "@/assets/img/iced-latte.jpg";
import menuBoards from "@/assets/img/menu-boards.jpg";
import truckHills from "@/assets/img/truck-hills.jpg";
import truckLine from "@/assets/img/truck-line.jpg";
import truckLot from "@/assets/img/truck-lot.jpg";
import truckNightTall from "@/assets/img/truck-night-tall.jpg";
import truckNight from "@/assets/img/truck-night.jpg";
import truckService from "@/assets/img/truck-service.jpg";
import truckWindow from "@/assets/img/truck-window.jpg";
import truckWinter from "@/assets/img/truck-winter.jpg";

export type Shot = { src: StaticImageData; alt: string; caption: string; wide?: boolean };

/* Order here = order in the home-page "ride" and on /gallery. */
export const shots: Shot[] = [
  { src: trailerServiceNight, alt: "The Compound trailer lit up with service window open at night", caption: "After Hours service 🌙", wide: true },
  { src: compoundCoffeeSubjective, alt: "The Compound mural — Coffee Is Subjective with Bagman spray-painting", caption: "Coffee is subjective ✦", wide: true },
  { src: truckBagmanMural, alt: "Trailer mural of Bagman pouring milk into coffee with Where coffee is subjective", caption: "I ♥ coffee" },
  { src: trailerRenoSkyline, alt: "Reno skyline mural on The Compound trailer at night", caption: "Reno biggest little city", wide: true },
  { src: icedLattePour, alt: "Cold foam pouring into a Compound iced latte", caption: "All topped w/ cold foam" },
  { src: trailerBackDoor, alt: "Trailer back door with Bagman and Coffee is Subjective", caption: "Coffee is subjective ✦" },
  { src: trailerGraffitiBoard, alt: "The Compound graffiti artwork and Bagman character", caption: "Modern art on wheels", wide: true },
  { src: truckLine, alt: "A line of customers waiting at the truck on a sunny day", caption: "The line is the vibe" },
  { src: compoundGraffiti, alt: "Close-up of The Compound graffiti lettering on the truck", caption: "Original artwork", wide: true },
  { src: truckWindow, alt: "Truck service window with paper-bag character art", caption: "Compound St." },
  { src: icedLatte, alt: "Iced latte with The Compound sticker on the cup", caption: "Iced & legendary" },
  { src: truckService, alt: "First responders ordering coffee at the truck", caption: "Fueling first responders" },
  { src: menuBoards, alt: "The Setlist and The Playlist menu boards beside the truck", caption: "The Setlist + The Playlist" },
  { src: truckLot, alt: "Customer ordering at The Compound truck in a parking lot", caption: "Morning stop ☕", wide: true },
  { src: truckWinter, alt: "The truck downtown on a winter morning with customers", caption: "Downtown winter run" },
  { src: truckHills, alt: "The truck parked under blue skies by the hills", caption: "Up in the hills" },
];

/* Extra photos that only show on /gallery */
export const moreShots: Shot[] = [
  { src: truckNight, alt: "The Compound truck at night in front of downtown Reno casinos", caption: "Downtown after dark", wide: true },
  { src: truckNightTall, alt: "The truck lit up at night", caption: "After Hours" },
  { src: eventsFlyer, alt: "The Compound Coffee events flyer", caption: "Pull-up schedule" },
];
