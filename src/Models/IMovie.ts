export default interface IMovie{
    id:number;
    vote_average:number;
    popularity:number;
    release_date:string;
    original_title:string;
    title:string;
    vote_count:string;
    overview:string;
    poster_path?:string;
}
