export default function showCountries(inputValue, number) {
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&page=${number}&per_page=12&key=24182944-6a44f26d4ebf1d494c89c0c95`)
         .then(response => {
             return response.json();
         })
 };

//  https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&page=${number}&per_page=12&key=24182944-6a44f26d4ebf1d494c89c0c95