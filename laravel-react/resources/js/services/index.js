import { Http } from "./http.service";
import { Movies } from "./movies.service";

const http = new Http();
const movies = new Movies({ http });

export { http, movies };
