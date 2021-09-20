import { Http } from "./http.service";
import { Movies } from "./movies.service";
import { CurrentUser } from "./currentUser.service";

const http = new Http();
const movies = new Movies({ http });
const currentUser = new CurrentUser({ http });

export { http, movies, currentUser };
