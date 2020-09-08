const baseUrl = 'https://rickandmortyapi.com/api/';
const characterList = document.getElementById('characters-list');
const locationList = document.getElementById('locations-list');
const episodeTable = document.getElementById('episodes-table');

const GetCharactersList = async url =>{
    // fetch(`${baseUrl}${url}`).then(res => console.log(res.json())); //Esto sirve para lo mismo que lo de abajo, pero aquí no se utiliza el async.

    const reponse = await fetch(`${baseUrl}${url}`);//Esto te regresa más directa la información pero son más lineas de código.
    const data = await reponse.json();
    const {results} = data;

    const infoArr = results.map(element => 
    {
        //console.log(element);
        const {image, url} = element;
        return {characterImg: image, characterUrl: url};
        //console.log(image);
    });

    await infoArr.forEach(element => 
    {
        const imgElement = document.createElement('img');
        imgElement.src = element.characterImg;
        imgElement.onclick = ()=> 
        {
            localStorage.setItem('characterUrl', element.characterUrl);
            window.location.href = 'file:///D:/Documentos/programacion-hipermedia/app03/character.htm';
        };
        characterList.appendChild(imgElement);
    });

    //console.log(await imgArr);
    //console.log(await data.results);
}

const GetLocationList = async url =>
{
    const reponse = await fetch(`${baseUrl}${url}`);
    const data = await reponse.json();
    const {results} = data;
    const locationArr = results.map(element => 
        {
            //    console.log(location);
               const {name,type,dimension} = element;
               return{locationName: name, locationType: type, locationDimension: dimension};
        });
    await locationArr.forEach(element => 
        {
            locationList.innerHTML += 
            `<li>
                <div>${element.locationName}</div>
                <ul>
                   <div>Type: ${element.locationType}</div>
                   <div>Dimension: ${element.locationDimension}</div>
                </ul><br>
            </li>`;
        });
}

const GetEpisodesTable = async url =>
{
    const reponse = await fetch(`${baseUrl}${url}`);
    const data = await reponse.json();
    results = data.results;
    const episodesArr = results.map(element => 
        {
               const {episode,air_date,name} = element;
               return{episodeEpisode: episode, episodeAir_Date: air_date, episodeName: name};
        });
    await episodesArr.forEach(element => 
        {
            episodeTable.innerHTML += 
            `<tr>
            <td>${element.episodeEpisode}</td>
            <td>${element.episodeName}</td>
            <td>${element.episodeAir_Date}</td>
            </tr>`;
        });
};
GetCharactersList('character');
GetLocationList('location');
GetEpisodesTable('episode');