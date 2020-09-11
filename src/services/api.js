// custom imports
import { BASEURL } from "./config";

// API routes
const fetchPost = '/search_by_date';

export const API = {
  fetchPost: (tags = 'story', page = 1) => {
    return `${BASEURL}${fetchPost}?tags=${tags}&page=${page}`;
  }
}