import {API_URL, API_TOKEN} from "@env"

const uri = API_URL + 'forecast?lat=-6.200000&lon=106.816666&appid=' + API_TOKEN

export async function GET_DATA_FORECAST (){
    let response = await fetch(uri);
    let json = await response.json();
    return json.movies;
}
