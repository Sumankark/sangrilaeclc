import { model } from "mongoose";
import goalSchema from "./goalSchema.js";
import carouselSchema from "./carouselSchema.js";
import serviceSchema from "./serviceSehema.js";
import volunteeringSchema from "./volunteeringSchema.js";
import aboutSchema from "./aboutSchema.js";
import userSchema from "./userSchema.js";
import gallerySchema from "./gallerySchema.js";

export const Carousel = model("Carousel", carouselSchema);
export const Goal = model("Goal", goalSchema);
export const Service = model("Service", serviceSchema);
export const Volunteering = model("Volunteering", volunteeringSchema);
export const About = model("About", aboutSchema);
export const User = model("User", userSchema);
export const Gallery = model("Gallery", gallerySchema);
