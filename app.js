const baseUrl = 'https://rickandmortyapi.com/api/';
const characterList = document.getElementById('characters-list');

const GetCharactersList = async url =>{
    // fetch(`${baseUrl}${url}`).then(res => console.log(res.json())); //Esto sirve para lo mismo que lo de abajo, pero aquí no se utiliza el async, solo se usa con el await.

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

GetCharactersList('character');