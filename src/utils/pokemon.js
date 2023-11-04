// API全体のデータをfetchしている場合

export const getAllPokemon = (url) => {
//  非同期で処理をするので、Promise
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => resolve(data));
  });
};

// 一つ一つのデータを引っ張ってくる場合

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    resolve(data)});
  });
};