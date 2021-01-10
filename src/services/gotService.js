export default class GotService {
  constructor() {
    this._apiBase = 'https://anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getAllHouses = async () => {
    const res = await this.getResource(`/houses?page=6&pageSize=10/`);
    return res.map(this._transformHouse);
  }

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
    console.log(house);
    return this._transformHouse(house);
  }

  getAllBooks = async () => {
    const res = await this.getResource(`/books/`);
    return res.map(this._transformBook);
  }

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  }

  changeEmptyData(item) {
    for (let key in item) {
      if (Array.isArray(item[key])) {
        item[key] = item[key].join(", ");
      }
      if (item[key] === '') {
        item[key] = 'no data';
      } 
    }
    return item;
  }

  _extractId = (item) => {
    const index = item.url.lastIndexOf("/");
    const id = item.url.slice(index + 1);
    return id;
  }
  // isSet(data) { //другой вариант 
  //   if (data) {
  //     return data
  //   } else {
  //     return 'no data'
  //   }
  // }

  // _extractId = (item) => {
  //   const idRegExp = /\/([0-9]*)$/;
  //   return item.url.match(idRegExp)[1];
  // }

  // _transformCharacter = (char) => {
  //   return {
  //     id: this._extractId(char),
  //     name: this.isSet(char.name),
  //     gender: this.isSet(char.gender),
  //     born: this.isSet(char.born),
  //     died: this.isSet(char.died),
  //     culture: this.isSet(char.culture)
  //   }
  // }

  _transformCharacter = (char) => {
    this.changeEmptyData(char);
    return {
      id: this._extractId(char),
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }

  _transformHouse = (house) => {
    this.changeEmptyData(house);
    return {
      id: this._extractId(house),
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }

  _transformBook = (book) => {
    this.changeEmptyData(book);
    return {
      id: this._extractId(book),
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released
    }
  }
}