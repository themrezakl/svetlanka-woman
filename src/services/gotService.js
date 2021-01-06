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
    const res = await this.getResource(`/houses/`);
    return res.map(this._transformHouse);
  }

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
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

  changeEmptyData(obj) {
    for (let key in obj) {
      if (obj[key] === '') {
        obj[key] = 'no data';
      } 
    }
    return obj;
  }
  // isSet(data) {
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
    const index = char.url.lastIndexOf("/");
    const charId = char.url.slice(index + 1);
    return {
      id: charId,
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }

  _transformHouse = (house) => {
    this.changeEmptyProp(house);
    return {
      name: house.name,
      region: house.gender,
      words: house.born,
      titles: house.died,
      overlord: house.culture,
      ancestralWeapons: house.ancestralWeapons
    }
  }

  _transformBook = (book) => {
    this.changeEmptyProp(book);
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released
    }
  }
}